const { logger } = require("../logger");
const owospeak = require("owospeak");
const { uwuProps } = require("./uwu-props");

function main(client) {
    logger.info("Registered uwu command");
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === "uwu") {
            const message = interaction.options.get("message").value;
            logger.info(`Uwuified ${interaction.user.username}'s ${message}`);
            interaction.reply({
                content: "Message UwU-ified",
                ephemeral: true,
            });
            interaction.channel.send(owospeak.convert(message, uwuProps));
        }
    });
}

module.exports = { main };
