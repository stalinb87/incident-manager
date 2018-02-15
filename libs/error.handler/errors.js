module.exports = {
  LOCALITY_NOT_FOUND: {
    message: 'This locality could not be found',
    status: 404,
  },
  INCIDENT_NOT_EXIST_OR_ALREADY_ARCHIVE: {
    message: 'This incident is already archive or not exist',
    status: 400,
  },
  NOT_FOUND: { message: 'The endpoint not exist', status: 404 },
  SERVER_ERROR: { message: 'This is awkward but we are having trouble', status: 500 },
};
