# wunderlist-backend

Deployed on Heroku with a PosgresSQL database https://wunderlist20.herokuapp.com/

Link to the landing page (React app is connected to login) https://wunderlist20.github.io/landing-avni/index.html

## Description

This project is a RESTful API built using Node and Express. The purpose of this project is to provide a Backend for a Wunderlist 2.0 web application. User registration, login, todo creation, deletion, fetching, or editing, are all handled here. This project was deployed on `Heroku`.

- The server is run using Node.
- Express is a minimalist Node web application framework for building APIs.
- PostgreSQL is the database used for production. SQLite3 was used for development and testing.
- Knex is a SQL query builder for JavaScript.
- Knex Cleaner is a Knex dependency for cleaning up seed data.
- Jsonwebtoken is used for authenticating users.
- Bcrypt is used for hashing passwords.
- Helmet adds a base layer of security by hiding basic info about the API when interacting with it.
- Dotenv allows the server to interact with environment variables.
- Cors is a dependency used to allow Cross Origin Resource Sharing. This allows the Frontend client to interact with the Backend.
- Cross-env allows the developer to set environment variables in a script.
- Jest is the library used for writing tests.
- Supertest is the dependency used for making "requests" in jest tests.

## Dependencies Used

- Node
- Express
- PostgreSQL (Production)
- SQLite3 (Development)
- Knex
- Knex Cleaner
- Bcryptjs
- Jsonwebtoken
- Cors
- Helmet
- Dotenv
- Faker
- Nodemon (Development)
- Cross-Env (Development)
- Jest (Development)
- Supertest (Development)

## Getting Started
Install dependencies
```
yarn install
```
Run database migrations
```
yarn knex migrate:latest
```
Run database seeds
```
yarn knex seed:run
```
Run tests
```
yarn test
```
Run the server
```
yarn server
```

## Restrictions
If you would like to make a request to the todos or users endpoint, a valid JSON web token is required in your request headers.authorization. This token is acquired by successfully registering an account or logging in. Also, for testing to run successfully you will have to remove the authentication piece of middleware from the todos route in the server.js file.

# Endpoints

## Log In and Registration

### Register a new user.

    POST /api/auth/register
    
### Parameters

| Name       | Type   | Description                                              |
| ---------- | ------ | -------------------------------------------------------- |
| username   | String | <p>Users username</p>                                       |
| password   | String | <p>Users password</p>                                    |
| firstName  | String | <p>Users firstName </p>                                    |
| lastName   | String | <p>Users lastName </p>

**POST** `https://wunderlist20.herokuapp.com/api/auth/register` will create a new user and send back a token. Username, password, firstName, lastName are required fields.

## Examples

Register example:

```
axios.post('/api/auth/register', {
    "username": "harry",
	"password": "potter",
	"firstName": "harry",
 	"lastName" : "potter"
});
```

### Success Response

Register Success

```

 {
    "message": "Welcome harry!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoiaGFycnkiLCJpYXQiOjE1NjE1NzIzMTksImV4cCI6MTU2MjE3NzExOX0.VCaGen64x_WEkVueJof8XKZxOImjxK09tNN6tiYSZZw",
    "userID": 33
}
```

### Error Response

Error Example:

```
ERROR 500
{
    "status": 500,
    "message": "Your user could not be created ${error}."
}
```

## Log a user in.

    POST /api/auth/login

### Parameters

| Name     | Type   | Description                |
| -------- | ------ | -------------------------- |
| username | String | <p>Users username</p> |
| password | String | <p>Users password</p>      |



**POST** `https://wunderlist20.herokuapp.com/api/auth/login` will log the user in, and send back a token. Username and password required.


### Examples

Login example:

```
axios.post('/api/auth/login', {
    username:"hermione",
    password: "granger"
});
```

### Success Response

Login Success

```

 {
    "message": "Welcome hermione!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJuYW1lIjoiaGVybWlvbmUiLCJpYXQiOjE1NjE0MTU2OTQsImV4cCI6MTU2MjAyMDQ5NH0.rwTCYJ97VA7IvxT0D2uwY3yHljUr0EPNlKQv-P8HloQ",
    "userID": 33
}
```

### Error Response

Error Example:

```
ERROR 401
{
    "status": 401,
    "message": "Username or password is incorrect"
}
```

## Other Routes:

## Todos 
### (protected route, requires login/token)

**GET** `https://wunderlist20.herokuapp.com/api/todos/` will return an array of todos.

**GET** `https://wunderlist20.herokuapp.com/api/todos/:id` will return an object corresponding to the todo at that ID.

**POST** `https://wunderlist20.herokuapp.com/api/todos/` will add a new todo, and return the created object. title, task and setDate are required fields. user_id, notes, and completed are optional fields.

**DEL** `https://wunderlist20.herokuapp.com/api/todos/:id` will delete the todo at this ID, and return the deleted object.

**PUT** `https://wunderlist20.herokuapp.com/api/todos/:id` will edit the todo at this ID, and return the edited object.

## Tasks 
### (protected route, requires login/token)

**GET** `https://wunderlist20.herokuapp.com/api/tasks/` will return an array of tasks.

**GET** `https://wunderlist20.herokuapp.com/api/tasks/:id` will return an object corresponding to the todo at that ID.

**POST** `https://wunderlist20.herokuapp.com/api/tasks/` will add a new task, and return the created object. title, task and setDate are required fields. user_id, notes, and completed are optional fields.

**DEL** `https://wunderlist20.herokuapp.com/api/tasks/:id` will delete the task at this ID, and return the deleted object.

**PUT** `https://wunderlist20.herokuapp.com/api/tasks/:id` will edit the task at this ID, and return the edited object.

## Users 
### (protected route, requires login/token)

GET  `https://wunderlist20.herokuapp.com/api/users/:id` allows a user to view their specific profile by id

PUT  `https://wunderlist20.herokuapp.com/api/users/:id` allows a user to edit their specific profile

DELETE `https://wunderlist20.herokuapp.com/api/users/:id` allows a user to delete their specific profile


**If you are running the project locally, every endpoint here is the same, but the heroku URL is replaced with `http://localhost:4000/`. For example, `GET` `http://localhost:4000/api/todos` will return an array of todos.**
