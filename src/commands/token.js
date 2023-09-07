// eslint-disable-next-line no-unused-vars
const { Client } = require("discord.js");
const { logger } = require("../utils/logger");
const { isAdmin } = require("../utils/discord/user");
const { addUser } = require("../utils/express/users");
const { generatePassword } = require("../utils/functions");

/**
 *
 * @param {Client} client
 */
function main(client) {
    logger.info("Registered token command");
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "token") {
            const member = interaction.member;
            if (!isAdmin(member)) {
                interaction.reply({
                    content: "Insufficient privileges",
                    ephemeral: true,
                });
                logger.warn(
                    `${member.displayName} just tried to create a web access token`
                );
                return;
            }

            const username = member.displayName;
            const pass = generatePassword(12);
            addUser(username, pass);
            interaction.reply({
                content: `You now have access to the admin web ui and your credentials are\nUsername: ${username}\nPassword: ${pass}`,
                ephemeral: true,
            });
        }
    });
}

module.exports = { main };
