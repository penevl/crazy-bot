require("dotenv").config();
const { logger } = require("../logger");
const { isAdmin, getUserRoles } = require("../index");

function main(client) {
    logger.info("Registered check command");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "check") {
            await interaction.deferReply({ ephemeral: true });
            const initiator = await interaction.guild.members.fetch(
                interaction.user.id
            );
            const subject = await interaction.guild.members.fetch(
                interaction.options.get("user").value
            );
            const imposterRole = process.env.IMPOSTER_ROLE;

            if (isAdmin(initiator)) {
                var today = new Date();
                var Difference_In_Time =
                    subject.joinedAt.getTime() - today.getTime();
                var Difference_In_Days = Math.floor(
                    (Difference_In_Time / (1000 * 3600 * 24)) * -1
                );

                if (Difference_In_Days > 15) {
                    if (Difference_In_Days > 30) {
                        if (subject.kickable) {
                            subject.kick();
                            interaction.editReply({
                                content: `${subject.displayName} has been here for ${Difference_In_Days} so he was kicked`,
                            });
                        } else {
                            interaction.editReply({
                                content: `It appears that for some reason ${subject.displayName} is un-kickable by the bot`,
                            });
                        }
                    } else {
                        subject.roles.add(imposterRole);
                        interaction.editReply({
                            content: `${subject.displayName} has been here for ${Difference_In_Days} so he was given the imposter role`,
                        });
                    }
                } else {
                    interaction.editReply({
                        content: `${subject.displayName} has been here for less then 15 days so no action was taken`,
                    });
                }
            } else {
                logger.warn(
                    `${initiator.displayName} tried to use the check command with insufficient priviliges`
                );
                interaction.editReply({
                    content: "Insufficient priviliges",
                });
            }
        }
    });
}

module.exports = { main };
