// eslint-disable-next-line no-unused-vars
const { GuildMember } = require("discord.js");
const { client } = require("./client");

/**
 *
 * @param {GuildMember} subject
 */
function calculateJoinTime(subject) {
    var today = new Date();
    var Difference_In_Time = subject.joinedAt.getTime() - today.getTime();
    return Math.floor((Difference_In_Time / (1000 * 3600 * 24)) * -1);
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
    var toReturn = false;
    process.env.ADMIN_ROLES.split(",").forEach((adminRole) => {
        if (roles.includes(adminRole) || user.id == process.env.OWNER_ID) {
            toReturn = true;
        }
    });
    return toReturn;
}

/**
 *
 * @param {Number} guildId
 * @returns {GuildMember[]}
 */
async function getGuildMembers(guildId) {
    const guild = await client.guilds.fetch(guildId);
    const guildMembers = await guild.members.fetch();
    return guildMembers;
}

/**
 *
 * @param {Number} memberId
 * @param {Number} guildId
 * @returns {GuildMember}
 */
async function getGuildMember(memberId, guildId) {
    const guild = await client.guilds.fetch(guildId);
    const guildMember = await guild.members.fetch(memberId);
    return guildMember;
}

/**
 *
 * @param {Number} roleId
 * @returns {GuildMember[]}
 */
async function getUsersWithRole(roleId) {
    let toReturn = [];
    const members = await getGuildMembers(process.env.GUILD_ID);
    members.forEach((member) => {
        const memberRoles = getUserRoles(member);
        if (memberRoles.includes(roleId)) toReturn.push(member);
    });
    return toReturn;
}

module.exports = {
    calculateJoinTime,
    getUserRoles,
    isAdmin,
    getGuildMembers,
    getUsersWithRole,
    getGuildMember,
};
