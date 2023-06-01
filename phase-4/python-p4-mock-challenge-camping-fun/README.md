# Flask Mock Challenge - Camping Fun

Congratulations! You have been hired by Access Camp and for your first job, you
have been tasked with building out a website to log campers with their
activities.

In this repo, there is a Flask application with some features built out. There
is also a fully built React frontend application, so you can test if your API is
working.

Your job is to build out the Flask API to add the functionality described in the
deliverables below.

***

## Setup

To download the dependencies for the frontend and backend, run:

```console
$ pipenv install; pipenv shell
$ npm install --prefix client
```

There is some starter code in the `seed.py` file so that once you've
generated the models, you'll be able to create data to test your application.

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
navigating to the `server/` directory and running:

```console
$ python app.py
```

You can run your React app in a separate window on [`localhost:4000`](
http://localhost:4000) by running the following from the `code-challenge/`
directory:

```console
$ npm start --prefix client
```

You are not being assessed on React, and you don't have to update any of the React
code; the frontend code is available just so that you can test out the behavior
of your API in a realistic setting.

There are also tests included which you can run using `pytest` to check your work.

Depending on your preference, you can either check your progress by:

- Running `pytest` and seeing if your code passes the tests
- Running the React application in the browser and interacting with the API via
  the frontend
- Running the Flask server and using Postman to make requests

***

## Models

You need to create the following relationships:

- A `Camper` has many `Signups`, and has many `Activity`s through `Signup`s
- An `Activity` has many `Signups`, and has many has many `Camper`s through `Signup`s
- A `Signup` belongs to a `Camper` and belongs to a `Activity`

Start by creating the models and migrations for the following database tables:

![domain diagram](https://curriculum-content.s3.amazonaws.com/phase-4/mock-challenge-camping-fun/diagram.png)

Add any code needed in the model files to establish the relationships.

Then, run the migrations and seed file:

```console
$ flask db revision --autogenerate -m'create tables'
$ flask db upgrade head
$ python seed.py
```

> If you aren't able to get the provided seed file working, you are welcome to
> generate your own seed data to test the application.

***

## Validations

Add validations to the `Camper` model:

- must have a `name`
- must have an `age` between 8 and 18

Add validations to the `Signup` model:

- must have a `time` between 0 and 23 (referring to the hour of day for the
  activity)

***

## Routes

Set up the following routes. Make sure to return JSON data in the format
specified along with the appropriate HTTP verb.

### GET /campers

Return JSON data in the format below. **Note**: you should return a JSON
response in this format, without any additional nested data related to each
camper.

```json
[
  {
    "id": 1,
    "name": "Caitlin",
    "age": 8
  },
  {
    "id": 2,
    "name": "Lizzie",
    "age": 9
  }
]
```

### GET /campers/<int:id>

If the `Camper` exists, return JSON data in the format below. **Note**: you will
need to serialize the data for this response differently than for the
`GET /campers` route. Make sure to include an array of activities for each
camper.

```json
{
  "id": 1,
  "name": "Caitlin",
  "age": 8,
  "activities": [
    {
      "id": 1,
      "name": "Archery",
      "difficulty": 2
    },
    {
      "id": 2,
      "name": "Swimming",
      "difficulty": 3
    }
  ]
}
```

If the `Camper` does not exist, return the following JSON data, along with
the appropriate HTTP status code:

```json
{
  "error": "404: Camper not found"
}
```

### POST /campers

This route should create a new `Camper`. It should accept an object with the
following properties in the body of the request:

```json
{
  "name": "Zoe",
  "age": 11
}
```

If the `Camper` is created successfully, send back a response with the new
`Camper`:

```json
{
  "id": 2,
  "name": "Zoe",
  "age": 11
}
```

If the `Camper` is **not** created successfully, return the following JSON data,
along with the appropriate HTTP status code:

```json
{
  "error": "400: Validation error"
}
```

### GET /activities

Return JSON data in the format below:

```json
[
  {
    "id": 1,
    "name": "Archery",
    "difficulty": 2
  },
  {
    "id": 2,
    "name": "Swimming",
    "difficulty": 3
  }
]
```

### DELETE /activities/<int:id>

If the `Activity` exists, it should be removed from the database, along with
any `Signup`s that are associated with it (a `Signup` belongs
to an `Activity`, so you need to delete the `Signup`s before the
`Activity` can be deleted).

After deleting the `Activity`, return an _empty_ response body, along with the
appropriate HTTP status code.

If the `Activity` does not exist, return the following JSON data, along with
the appropriate HTTP status code:

```json
{
  "error": "404: Activity not found"
}
```

### POST /signups

This route should create a new `Signup` that is associated with an
existing `Camper` and `Activity`. It should accept an object with the following
properties in the body of the request:

```json
{
  "time": 9,
  "camper_id": 1,
  "activity_id": 3
}
```

If the `Signup` is created successfully, send back a response with the data
related to the `Activity`:

```json
{
  "id": 1,
  "name": "Archery",
  "difficulty": 2
}
```

If the `Signup` is **not** created successfully, return the following JSON data,
along with the appropriate HTTP status code:

```json
{
  "error": "400: Validation error"
}
```
