const { GuildMember } = require("discord.js");

require("dotenv").config();

/**Returns a random whole number with a min value of 0 and a max value the provided value
 *
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 *
 * @param {GuildMember} user
 * @returns {string[]}
 */
function getUserRoles(user) {
    var roles = [];
    user.roles.cache.forEach((role) => {
        roles.push(role.id);
    });
    return roles;
}

/**
 *
 * @param {GuildMember} user
 * @returns {boolean}
 */
function isAdmin(user) {
    const roles = getUserRoles(user);
    if (
        roles.includes(process.env.ADMIN_ROLE_ID) ||
        user.id == process.env.OWNER_ID
    ) {
        return true;
    }
}

module.exports = { getRandomInt, isAdmin, getUserRoles };
