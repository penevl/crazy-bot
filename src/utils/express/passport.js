const LocalStrategy = require("passport-local");

function initialize(passport, getUser, getUserById) {
    const authUser = (username, password, done) => {
        const user = getUser(username);
        if (user == null) {
            return done(null, false);
        }
        if (user.password == password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    };

    passport.use(new LocalStrategy(authUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = { initialize };
