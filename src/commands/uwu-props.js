const { logger } = require("../utils/logger");
const { isAdmin } = require("../utils/functions");
const { getConfig, setConfig } = require("../utils/config");

function main(client) {
    logger.info("Registered uwu-props command");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const author = await interaction.guild.members.fetch(
            interaction.user.id
        );

        if (interaction.commandName === "stutter") {
            if (!isAdmin(author)) {
                logger.warn(
                    `${interaction.user.username} tried to change stutter options`
                );
                interaction.reply({
                    content: "Insufficient privileges",
                    ephemeral: true,
                });
                return;
            }
            logger.info(`Changed stutter options`);
            // uwuProps.stutter = interaction.options.get("value").value;
            const stutterValue = await interaction.options.get("value").value;
            setConfig("LOG_LEVEL", stutterValue.toString());
            interaction.reply({
                content: `Changed stutter options to ${process.env.STUTTER}`,
                ephemeral: true,
            });
        }
        if (interaction.commandName === "tilde") {
            if (!isAdmin(author)) {
                logger.warn(
                    `${interaction.user.username} tried to change tilde options`
                );
                interaction.reply({
                    content: "Insufficient privileges",
                    ephemeral: true,
                });
            }
            logger.info(`Changed tilde options`);
            uwuProps.tilde = interaction.options.get("value").value;
            interaction.reply({
                content: `Changed tilde options to ${uwuProps.tilde}`,
                ephemeral: true,
            });
        }
    });
}

module.exports = { main };
