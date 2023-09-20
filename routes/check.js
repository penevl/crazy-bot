const express = require("express");
const {
    CheckUserActivity,
} = require("../src/utils/discord/events/CheckUserActivity");
const { logger } = require("../src/utils/logger");
const { getGuildMembers } = require("../src/utils/discord/user");
const router = express.Router();

var usersToKick = [];

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
});

function buildUser(subject, days) {
    return {
        id: subject.id,
        user: subject,
        days: days,
    };
}

function addUserToKick(user) {
    // For some reason an emty array is not equal to [] or null but 0...thank you js
    if (usersToKick == 0) usersToKick.push(user);

    usersToKick.forEach((userObj) => {
        if (userObj.id == user.id) {
            return;
        } else {
            usersToKick.push(user);
        }
    });
}

router.get("/users-to-kick", async (req, res) => {
    const userActivity = new CheckUserActivity();
    userActivity.on("kicked", (subject, daysSinceJoin) => {
        addUserToKick(buildUser(subject, daysSinceJoin));
        // usersToKick.push(buildUser(subject, daysSinceJoin));
    });

    userActivity.on("error", (err) => {
        logger.error("Failed when adding user to web kick list");
        logger.error(err);
    });

    const guildMembers = await getGuildMembers(process.env.GUILD_ID);
    guildMembers.forEach((member) => {
        userActivity.check(member);
    });

    logger.debug(JSON.stringify(usersToKick));
    res.render("kick-table", {
        users: usersToKick,
    });
});

router.get("/page", (req, res) => {
    res.render("auto-check", {
        usersToKick: usersToKick,
    });
});

module.exports = router;
