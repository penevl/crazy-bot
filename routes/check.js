const express = require("express");
const { logger } = require("../src/utils/logger");
const { getUsersWithRole } = require("../src/utils/discord/user");
const {
    CheckUserActivity,
} = require("../src/utils/discord/events/CheckUserActivity");
const router = express.Router();

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
});

/** As much as I want to have this function to user.js that creates a circular dependency which crashes node
 *
 * @param {String} checkType
 * @returns {{
 *       id: Number,
 *       user: GuildMember,
 *       days: Number,
 *   }[]}
 */
async function checkUsers(checkType) {
    let toReturn = [];
    const userCheck = new CheckUserActivity();
    const membersToCheck = await getUsersWithRole(process.env.NEWCOMER_ROLE);
    userCheck.on(checkType, (subject, daysSinceJoin) => {
        toReturn.push({
            id: subject.id,
            user: subject,
            days: daysSinceJoin,
        });
    });

    userCheck.on("error", (err) => {
        logger.error(err);
    });
    membersToCheck.forEach((member) => {
        userCheck.check(member);
    });
    return toReturn;
}

router.get("/users-to-kick", async (req, res) => {
    const users = await checkUsers("kicked");

    logger.debug(JSON.stringify(users));
    res.render("kick-table", {
        users: users,
    });
});

router.get("/users-to-sussify", async (req, res) => {
    const users = await checkUsers("imposter");

    logger.debug(JSON.stringify(users));
    res.render("imposter-table", {
        users: users,
    });
});

router.get("/page", (req, res) => {
    res.render("auto-check");
});

module.exports = router;
