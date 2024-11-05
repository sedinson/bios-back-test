const express = require('express')
const sequalize = require("./lib/sequalize")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const bodyParser = require('body-parser')
const { routes } = require('./routes/users')
const { routes: sessionRoutes } = require('./routes/session')

async function App() {
  const app = express()
  app.use(bodyParser.json())

  await sequalize.sync({ force: false })

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