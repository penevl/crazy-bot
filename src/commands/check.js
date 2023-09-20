require("dotenv").config();
const { logger } = require("../utils/logger");
const { isAdmin } = require("../utils/discord/user");
const { CheckUserActivity } = require("../utils/discord/events/CheckUserActivity");

function main(client) {
    logger.info("Registered check command");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "check") {
            await interaction.reply({content:"Command deprecated", ephemeral: true });
            // If statement needed to shut up eslint
            // eslint-disable-next-line no-constant-condition
            if(true) return;

            const initiator = await interaction.guild.members.fetch(
                interaction.user.id
            );
            const subject = await interaction.guild.members.fetch(
                interaction.options.get("user").value
            );

            if (!isAdmin(initiator)) {
                logger.warn(
                    `${initiator.displayName} tried to use the check command with insufficient priviliges`
                );
                interaction.editReply({
                    content: "Insufficient priviliges",
                });
                return;
            }

            logger.info(`${initiator.displayName} has initiated a check`);
            const checkUserActivity = new CheckUserActivity();
            checkUserActivity.on("imposter", (displayName, daysSinceJoin) => {
                interaction.editReply({
                    content: `${displayName} has been here for ${daysSinceJoin} days so he was given the imposter role`,
                });
            });

            checkUserActivity.on("kicked", (displayName, id, daysSinceJoin) => {
                interaction.editReply({
                    content: `${displayName} with ID of ${id} has been here for ${daysSinceJoin}days so he was kicked`,
                });
            });

            checkUserActivity.on("error", (err) => {
                logger.error(err);
                interaction.editReply({
                    content: `An error occured\n${err}`,
                });
            });

            checkUserActivity.check(subject);
        }
    });
}

module.exports = { main };
