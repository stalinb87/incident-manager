[![Build Status](https://travis-ci.org/stalinb87/incident-manager.svg?branch=master)](https://travis-ci.org/stalinb87/incident-manager)

# Incidents Web Service

Allow to track incidents that occurred in city’s localities in the last 30 days.

## API

### Incidents

`GET /incidents`
retrieve a list of incidents, is posible to paginate this endpoint, see the pagination section

`POST /incidents`

```javascript
{
    kind: String, // kind could be [ROBBERY, MURDER, TRAFFIC_ACCIDENT, SHOOTING, ASSAULT]
    location: String // the id of the location, see localities for more details
}
```

`POST /incidents/:incidentId/archive`
archive an incident

### Localities

`GET /localities`
retrieve a list of localities, is posible to paginate this endpoint, see the pagination section

`GET /localities/:localityId`
retrieve a single locality

### Pagination

You could paginate the /localities and /incidents end point with the following query string
`/endpoint?page=2&limit=10&sort=name&sortOrder=desc`

where

`page`: the page you one to go

`limit`: the max amount of element in a page

`sort`: the field that you one sort by

`sortOrder`: the sort order, could be asc or desc default to asc
