const { listUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/user")
const passport = require("../lib/passport")

const requireAuth = passport.authenticate("jwt", { session: false })

const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    res.status(401).json({ message: "Usuario no administrativo" })
    return
  }

  next()
}

function routes(app) {
  app.get('/users', requireAuth, listUsers)

  app.get('/users/:id', requireAuth, getUser)

  app.post('/users', requireAuth, isAdmin, createUser)

  app.patch('/users/:id', requireAuth, isAdmin, updateUser)

  app.delete('/users/:id', requireAuth, isAdmin, deleteUser)
}

module.exports = { routes }