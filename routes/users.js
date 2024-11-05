const { listUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/user")

function routes(app) {
  app.get('/users', listUsers)

  app.get('/users/:id', getUser)

  app.post('/users', createUser)

  app.patch('/users/:id', updateUser)

  app.delete('/users/:id', deleteUser)
}

module.exports = { routes }