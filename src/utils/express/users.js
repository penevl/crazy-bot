const { logger } = require("../logger");
const { writeFile } = require("fs");
const users = require("../../../users.json");

/**
 *
 * @returns {[{
 *      id: Number,
 *      name: String,
 *      password: String
 * }]}
 */
function getUsers() {
    logger.debug(JSON.stringify(users));
    return users;
}

/**
 *
 * @param {String} username
 * @param {String} password
 * @returns {Number}
 */
function addUser(username, password) {
    const id = Number(Date.now().toString());
    users.push({
        id: id,
        username: username,
        password: password,
    });
    logger.debug(`Saving users: ${JSON.stringify(users)}`);
    logger.info(`Adding user ${username} to users file.`);
    writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) logger.error(err);
    });
    return id;
}

module.exports = { getUsers, addUser };
