# CodersCamp - Week4 - A Node.js backend
A simple Node.js backend, for working with users and todos. Features also a small js front-end app.

## Endpoints:
#### /api/users
  * POST **/** - create a new user
  * GET **/:id** - get a user by ID
  * PUT **/** - edit the user
  * DELETE **/** - delete the user
 
#### /api/todos
  * POST **/** - create a new todo and assign it to currently logged user
  * GET **/** - get all todos assigned to currently logged user
  * GET **/:id** - get specific todo
  * PUT **/:id** - edit specific todo
  * DELETE **/:id** - delete specific todo
  
#### /api/auth
  * POST **/** - authenticate user through provided data
  * GET **/** - authenticate user through JWT key stored in a cookie
  
#### /api/logout
  * GET **/** - server-side way to logout the user
  
## How to run:
Set the evironment variable **MONGODB_URI** to a valid MongoDB connection URI.

Run ```node index.js``` or ```npm run start```

## Screenshots
![login page](https://i.imgur.com/ylrT6t9.png)
![tasks list](https://i.imgur.com/H9442C5.png)
