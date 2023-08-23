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

/**
 *
 * @param {GuildMember} subject
 */
function calculateJoinTime(subject) {
    var today = new Date();
    var Difference_In_Time = subject.joinedAt.getTime() - today.getTime();
    return Math.floor((Difference_In_Time / (1000 * 3600 * 24)) * -1);
}

module.exports = { getRandomInt, isAdmin, getUserRoles, calculateJoinTime };
