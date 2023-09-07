const { logger } = require("../src/utils/logger");
const express = require("express");
const rootRouter = express.Router();
const passport = require("passport");

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

rootRouter.get("/", checkAuthenticated, (req, res) => {
    res.render("index", {
        users: [
            {
                id: 123456,
                username: "elduko",
                password: "gay",
            },
        ],
    });
});

rootRouter.get("/login", (req, res) => {
    res.render("login");
});

rootRouter.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: false,
    })
);

rootRouter.post("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            logger.error(`Failed to logout user ${req.user.username}`);
        }
    });
    res.redirect("/login");
});

module.exports = rootRouter;
