const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")
const bcrypt = require("bcryptjs")
const { User } = require("../models/user")
const z = require("zod")
const { SECRET_KEY } = require("../constants")

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const loginSchema = z.object({
      username: z.string(),
      password: z.string()
    })

    const valid = loginSchema.safeParse({ username, password })

    if (!valid.success) {
      done(null, false, { message: "Parámetros inválidos" })
      return
    }

    const user = await User.findOne({
      where: {
        email: username
      }
    })

    if (!user) {
      done(null, false, { message: "Usuario inválido" })
      return
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      done(null, false, { message: "Contraseña inválida" })
      return
    }

    done(null, user.dataValues)
  }
))

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
}, (payload, done) => {
  done(null, payload)
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id)
  done(null, user.dataValues)
})

module.exports = passport