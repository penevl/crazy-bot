require("dotenv").config();
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getUserRoles(user) {
    var roles = [];
    user.roles.cache.forEach((role) => {
        roles.push(role.id);
    });
    return roles;
}

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
