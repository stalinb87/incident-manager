const should = require('should');
const app = require('../app/index');
const request = require('supertest')(app);
const Incident = require('../app/incidents/incidents.model');
const Locality = require('../app/localities/localities.model');
const IncidentType = require('../app/incidents/incident.types');
const errorTypes = require('../libs/error.handler/error.types');
const errors = require('../libs/error.handler/errors');
const seed = require('./seed');
const paginate = require('../libs/pagination');
const moment = require('moment');

describe('Tickets', () => {
  before(() => seed());
  after(() => {
    const promises = [];
    promises.push(Locality.remove({}));
    promises.push(Incident.remove({}));
    Promise.all(promises).then(() => process.exit());
  });
  describe('Incidents', () => {
    it('Should allow to create new incidents with kind and locality', async () => {
      const locality = await Locality.findOne().exec();
      const incident = {
        kind: IncidentType.SHOOTING,
        location: locality,
      };
      return request
        .post('/incidents')
        .send(incident)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const { kind, location } = response.body;
          kind.should.be.equal(IncidentType.SHOOTING);
          location.should.be.equal(locality._id.toString());
        });
    });

    it('Should allow to retrieve a list of incidents', () =>
      request
        .get('/incidents')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const incidents = response.body;
          // 7 created by seed plus the previous test
          incidents.length.should.be.equal(8);
        }));
    it('Should not retrieve the an archive incident', () =>
      request
        .get('/incidents')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const incidents = response.body;
          const hasArchive = incidents.some(incident => incident.isArchive);
          hasArchive.should.be.equal(false);
        }));

    it('Should allow to archive incidents', async () => {
      const incident = await Incident.findOne().exec();
      incident.isArchive.should.be.equal(false);
      return request
        .post(`/incidents/${incident._id}/archive`)
        .expect(204)
        .then(() => Incident.findOne({ _id: incident._id }).exec())
        .then((archiveIncident) => {
          should.exist(archiveIncident);
          archiveIncident.isArchive.should.be.equal(true);
        });
    });
    it('Should get only incidents ocurred in the last 30 days', async () => {
      const location = await Locality.findOne().exec();
      const oldIncident = await Incident.create({
        kind: IncidentType.TRAFFIC_ACCIDENT,
        location,
        happendAt: moment()
          .subtract(31, 'days')
          .toDate(),
      });
      return request.get('/incidents').then((response) => {
        const incidents = response.body;
        const foundOldIncident = incidents.some(incident => incident._id.toString() === oldIncident._id.toString());
        foundOldIncident.should.be.equal(false);
      });
    });
    it('Should throw an error when archive an unexisting archive', async () => {
      const incident = await Incident.findOne({ isArchive: true }).exec();
      incident.isArchive.should.be.equal(true);
      return request
        .post(`/incidents/${incident._id}/archive`)
        .expect(400)
        .then((response) => {
          const error = response.body;
          error.message.should.be.equal(errors.INCIDENT_NOT_EXIST_OR_ALREADY_ARCHIVE.message);
        });
    });
  });
  describe('Localities', () => {
    it('Should allow to retrieve a list of localities', () =>
      request
        .get('/localities')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const localities = response.body;
          // the same of the seed
          localities.should.have.length(7);
        }));
    it('Should allow to get a single locality', async () => {
      const locality = await Locality.findOne().exec();
      return request
        .get(`/localities/${locality._id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          const { name, _id } = response.body;
          name.should.be.equal(locality.name);
          _id.should.be.equal(locality._id.toString());
        });
    });
  });
  describe('Error Handler', () => {
    it('Should have the same amount of keys on error and error types', () => {
      Object.keys(errors).should.have.length(Object.keys(errorTypes).length);
    });
  });
  describe('Pagination', () => {
    it('Should convert to page query string to proper object for mongoose', () => {
      const { limit, skip, sort } = paginate.pagination({
        page: 1,
        sort: 'name',
        sortOrder: 'desc',
        limit: 10,
      });
      limit.should.be.equal(10);
      skip.should.be.equal(0);
      sort.should.have.property('name', -1);
    });
  });
});
