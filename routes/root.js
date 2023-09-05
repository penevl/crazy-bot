const { logger } = require("../src/utils/logger");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { initialize } = require("../src/utils/express/passport");

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

initialize(
    passport,
    (username) => users.find((user) => user.username === username),
    (id) => users.find((user) => user.id === id)
);

router.get("/", checkAuthenticated, (req, res) => {
    res.render("index", {
        users: users,
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: false,
    })
);

router.post("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            logger.error(`Failed to logout user ${req.user.username}`);
        }
    });
    res.redirect("/login");
});

module.exports = { router };
