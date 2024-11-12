const { SECRET_KEY } = require("../constants");
const { createUser } = require("../controllers/user");
const passport = require("../lib/passport")
const jwt = require("jsonwebtoken")

function routes(app) {
  app.post("/register", createUser)

  app.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/unauthorized"
  }))

  app.get("/profile", (req, res) => {
    const { password, ...user } = req.user
    const token = jwt.sign({ email: user.email, id: user.id, role: user.role }, SECRET_KEY)
    res.json({ user, token })
  })

  app.get("/unauthorized", (req, res) => {
    res.status(401).send("Usuario no autorizado")
  })
}

module.exports = { routes }