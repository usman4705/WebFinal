const LocalStrategy = require("passport-local").Strategy; //class
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

function passportConfig(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //Check if email exists in db
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User not Registerd" });
        }
        await bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged In Successfully" });
            }
            return done(null, false, { message: "Wrong Username or Password" });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went wrong" });
          });
      }
    )
  );
  // storing user info in session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = passportConfig;
