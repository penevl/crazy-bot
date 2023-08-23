const { logger } = require("../logger");
const { isAdmin } = require("../functions");

var uwuProps = { stutter: true, tilde: true };
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
                interaction.reply("Insufficient privileges");
                return;
            }
            logger.info(`Changed stutter options`);
            uwuProps.stutter = interaction.options.get("value").value;
            interaction.reply({
                content: `Changed stutter options to ${uwuProps.stutter}`,
                ephemeral: true,
            });
        }
        if (interaction.commandName === "tilde") {
            if (!isAdmin(author)) {
                logger.warn(
                    `${interaction.user.username} tried to change tilde options`
                );
                interaction.reply("Insufficient privileges");
            }
            logger.info(`Changed tilde options`);
            uwuProps.tilde = interaction.options.get("value").value;
            interaction.reply(`Changed tilde options to ${uwuProps.tilde}`);
        }
    });
}

module.exports = { main, uwuProps };
