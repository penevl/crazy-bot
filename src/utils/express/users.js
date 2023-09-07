const { logger } = require("../logger");

/**
 *
 * @returns {[{
 *      id: Number,
 *      name: String,
 *      password: String
 * }]}
 */
function getUsers() {
    const WEB_USERS = process.env.WEB_USERS;
    logger.debug(`WEB_USERS: ${JSON.stringify(WEB_USERS)}`);
    const users = JSON.parse(WEB_USERS);
    logger.debug(`users return: ${JSON.stringify(users)}`);
    return users;
}

module.exports = { getUsers };
