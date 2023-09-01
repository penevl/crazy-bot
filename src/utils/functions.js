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

module.exports = { getRandomInt };
