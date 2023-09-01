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
    if (
        roles.includes(process.env.ADMIN_ROLE_ID) ||
        user.id == process.env.OWNER_ID
    ) {
        return true;
    }
}

module.exports = { calculateJoinTime, getUserRoles, isAdmin }