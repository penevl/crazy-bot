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
    process.env.ADMIN_ROLES.forEach((adminRole) => {
        if (roles.includes(adminRole) || user.id == process.env.OWNER_ID) {
            return true;
        }
    });
}

module.exports = { calculateJoinTime, getUserRoles, isAdmin };
