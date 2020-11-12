## Quick start

1.  Make sure that you have Node.js v10.19.0 and npm v6 or above installed.
2.  Clone this repo using `git clone git@github.com:huynhquangviet1996it/est-rouge-nodejs-test.git <YOUR_PROJECT_NAME>`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `docker-compose up -d` to up container mongoDB.
5.  Run `npm run install` in order to install dependencies.<br />
    _At this point you can run `npm run start` to see the example app at `http://localhost:3000`._

## Running Locally

```bash
npm run dev
```

## Running Test

```bash
npm run test
```

## Open nyc test coverage reports

```bash
npm run converage
```

## Fix eslint errors

```bash
npm run lint:fix
```

## Documentation

### Resource components and identifiers
| resource                    | description                       |
|:----------------------------|:----------------------------------|
| `POST /api/auth/login`               | Api for login, return user info and token if login success. |
| `POST /api/event`      | Api for create event, returns message create event success with event info |
| `PUT /api/event/{event_id}` | Api for update event, returns message update success |
| `PATCH /api/event/{event_id}` | Api for edit event, returns message edit success |
| `DELETE /api/event/{event_id}` | Api for delete event, returns message delete success |
| `GET /api/event` | Api for get list event, returns list event |

Note that `create, update, edit, delete` request should have authentication info. you can add it to request header: `Authorization: "Bearer {token}"`, with token in result of api `POST /api/auth/login`.

### Body login
| field | description | fix data      |
|:------|-------------|---------------|
| email | email login | user@user.com |
| password | password login | uspass123 |

- Example 
```json
{
  "email": "user@user.com",
  "password": "uspass123"
}
```

### `POST /api/event` Field Data

These field data are available on the `POST /api/event` route:

| Field query parameter | Description |
|-----------------------|-------------|
| `event_name` | Name of event |
| `start_date` | The date start of event |
| `due_date` | The date due of event |
| `description` | Description of event |

- Example. 
```json
{
  "event_name": "event_test",
  "start_date": "2020-11-12T06:46:48.352Z",
  "due_date": "2020-11-19T06:46:48.352Z",
  "description": "this is a sample description event"
}
```

### `GET /api/event` Field Queries

These field queries are available on the `GET /api/event` route:

| Field query parameter | Description |
|-----------------------|-------------|
| `query.filter` | Main info filter `event` here |
| `query.filter.where` | Query `event` with condition in here |
| `query.filter.field` | Query `event` select field |
| `query.filter.limit` | Query limits the number of records returned to the specified number (or less). |
| `query.filter.skip` | Query omits the specified number of returned records. |
| `query.filter.order` | Query specifies how to sort the results: ascending (asc) or descending (desc) based on the specified property. |
- Example.
```json5
{
  "filter": {
    "where": {
      "due_date": {
        "$gt": "2020-11-11T17:00:00.000Z" // get event with due_date great than date 2020-11-12
      } 
    },
    "limit": 10,
    "skip": 10,
    "sort": {
      "start_date": "asc" // order by start_date
    },
    "field": {
      "_id": false // not select field _id
    }
  }
}
```



