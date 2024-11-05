const { createUser, authenticateUser } = require("../controllers/user");

function routes(app) {
  app.post("/register", createUser)

  app.post("/login", authenticateUser)
}

module.exports = { routes }