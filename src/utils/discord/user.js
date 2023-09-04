/**
 *
 * @param {GuildMember} subject
 */
function calculateJoinTime(subject) {
    var today = new Date();
    var Difference_In_Time = subject.joinedAt.getTime() - today.getTime();
    console.log("Gay");
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

module.exports = { calculateJoinTime, getUserRoles, isAdmin };
