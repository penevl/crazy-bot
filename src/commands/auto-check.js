require("dotenv").config();
const { logger } = require("../utils/logger");
const { isAdmin } = require("../utils/discord/user");
const { CheckUserActivity } = require("../utils/discord/events/CheckUserActivity");

function main(client) {
    logger.info("Registered auto-check command");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === "check-auto") {
            await interaction.deferReply({ ephemeral: true });
            const initiator = await interaction.guild.members.fetch(
                interaction.user.id
            );
            const guildMembers = await interaction.guild.members.fetch();

            if (!isAdmin(initiator)) {
                logger.warn(
                    `${initiator.displayName} tried to use the check command with insufficient priviliges`
                );
                interaction.editReply({
                    content: "Insufficient priviliges",
                });
                return;
            }

            logger.info(`${initiator.displayName} has initiated an auto check`);
            const checkUserActivity = new CheckUserActivity();
            checkUserActivity.on("imposter", (displayName, daysSinceJoin) => {
                interaction.channel.send({
                    content: `${displayName} has been here for ${daysSinceJoin} days so he was given the imposter role`,
                });
            });

            checkUserActivity.on("kicked", (displayName, id, daysSinceJoin) => {
                interaction.channel.send({
                    content: `${displayName} with ID of ${id} has been here for ${daysSinceJoin}days so he was kicked`,
                });
            });

            checkUserActivity.on("error", (err) => {
                logger.error(err);
                interaction.channel.send({
                    content: `An error occured\n${err}`,
                });
            });
            guildMembers.forEach((subject) => {
                checkUserActivity.check(subject);
            });
            interaction.editReply({
                content: "Operation completed successfuly(hopefully)",
            });
        }
    });
}

module.exports = { main };
