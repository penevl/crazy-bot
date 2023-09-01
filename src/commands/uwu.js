const { logger } = require("../utils/logger");
const owospeak = require("owospeak");

function main(client) {
    logger.info("Registered uwu command");
    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === "uwu") {
            var uwuProps = { stutter: process.env.STUTTER, tilde: true };
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
