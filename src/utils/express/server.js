const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const { logger } = require("../logger");
const rootRouter = require("../../../routes/root");
const { initialize } = require("./passport");
const { getUsers, addUser } = require("./users");

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

function findUser(username) {
    const users = getUsers();
    return users.find((user) => user.username === username);
}

function findUserById(id) {
    const users = getUsers();
    return users.find((user) => user.id === id);
}

initialize(passport, findUser, findUserById);

app.use("/", rootRouter);

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
