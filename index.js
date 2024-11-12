const express = require('express')
const sequalize = require("./lib/sequalize")
const passport = require("./lib/passport")
const session = require("express-session")
const { SECRET_KEY } = require("./constants")

const bodyParser = require('body-parser')
const { routes } = require('./routes/users')
const { routes: sessionRoutes } = require('./routes/session')

async function App() {
  const app = express()
  app.use(bodyParser.json())

  await sequalize.sync({ force: false })

  app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  routes(app)
  sessionRoutes(app)

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
      message: "Ooops, algo ha salido terriblemente mal"
    })
  })

  app.listen(3000)
}

App()