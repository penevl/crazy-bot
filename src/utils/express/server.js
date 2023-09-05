const express = require("express");
const app = express();
const passport = require("passport");
const { initialize } = require("./passport");
const session = require("express-session");
const { logger } = require("../logger");

var users = [
    {
        id: 123456,
        username: "elduko",
        password: "gay",
    },
];

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); // Read form data
app.use(
    session({
        secret: process.env.WEB_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
initialize(
    passport,
    (username) => users.find((user) => user.username === username),
    (id) => users.find((user) => user.id === id)
);

app.get("/", checkAuthenticated, (req, res) => {
    res.render("index", {
        users: users,
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/users",
        failureFlash: false,
    })
);

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    users.push({
        id: Date.now().toString(),
        username: req.body.username,
        password: req.body.password,
    });
    res.redirect("/login");
});

app.post("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            logger.error(`Failed to logout user ${req.user.username}`);
        }
    });
    res.redirect("/login");
});

/**
 *
 * @param {Number} WEB_PORT
 */
function start(WEB_PORT) {
    app.listen(WEB_PORT, () => {
        logger.info(`Web server started on port ${WEB_PORT}`);
    });
}

module.exports = { start };
