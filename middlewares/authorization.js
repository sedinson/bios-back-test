const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwtPayload, done) => {
  done(null, jwtPayload)
}))