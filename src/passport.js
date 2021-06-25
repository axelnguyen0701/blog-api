const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("./models/user");
const bcrypt = require("bcryptjs");
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async function (username, password, done) {
      try {
        const user = await User.findOne({ username })
          .select("+password")
          .exec();

        if (!user) {
          return done(null, false, { message: "User not found" }); //User not found
        }

        const res = await bcrypt.compare(password, user.password);
        if (!res) {
          return done(null, false, { message: "Incorrect Password" }); //Incorrect password
        }

        //Remove password
        const return_user = await User.findOne({ username }).exec();
        return done(null, return_user); //Success
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secretcode",
    },
    function (jwtPayload, done) {
      return User.findById(jwtPayload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
