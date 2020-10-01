const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

function initialize(passport, getUserByUnivId, getUserById) {
  const authenticateUser = async (id, password, done) => {
    const user = await getUserByUnivId(id);
    if (user.length === 0) {
      return done(null, false, { message: "No User Exists" });
    } else {
      try {
        if (await bcrypt.compare(password, user[0].dataValues.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "univId" }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user[0].dataValues.univId));
  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    return done(null, user);
  });
}

module.exports = initialize;
