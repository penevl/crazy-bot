const { logger } = require("./logger");

require("dotenv").config();

/**Returns a random whole number with a min value of 0 and a max value the provided value
 *
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generatePassword(length) {
    var chars =
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var password = "";
    for (var i = 0; i <= length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    logger.debug(`Returning password ${password}`);
    return password;
}

module.exports = { getRandomInt, generatePassword };
