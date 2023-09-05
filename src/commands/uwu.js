const { logger } = require("../utils/logger");
const owospeak = require("owospeak");

function main(client) {
    logger.info("Registered uwu command");

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === "uwu") {
            const channel = interaction.channel;
            const member = interaction.member;
            const memberPfp = member.displayAvatarURL();
            const memberNickname = member.nickname;
            const webhook = await channel.createWebhook({
                name: memberNickname,
                avatar: memberPfp,
                reason: "Needed a webhook for uwu",
            });

            var uwuProps = {
                stutter: process.env.STUTTER,
                tilde: process.env.TILDE,
            };
            logger.debug(`uwuProps: ${JSON.stringify(uwuProps)}`);
            const message = interaction.options.get("message").value;
            logger.info(`Uwuified ${interaction.user.username}'s ${message}`);
            interaction.reply({
                content: "Message UwU-ified",
            });
            webhook.send(owospeak.convert(message, uwuProps));
            webhook.delete();
        }
    });
}

module.exports = { main };
