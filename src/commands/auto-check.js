require("dotenv").config();
const { logger } = require("../logger");
const { isAdmin, getUserRoles } = require("../functions");

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
            const imposterRole = process.env.IMPOSTER_ROLE;
            const newcomerRole = process.env.NEWCOMER_ROLE;

            if (isAdmin(initiator)) {
                logger.info(
                    `${initiator.displayName} has initiated an auto check`
                );
                guildMembers.forEach(async (subject) => {
                    logger.debug(`Checking ${subject.displayName}`);
                    if (getUserRoles(subject).includes(newcomerRole)) {
                        var today = new Date();
                        var Difference_In_Time =
                            subject.joinedAt.getTime() - today.getTime();
                        var Difference_In_Days = Math.floor(
                            (Difference_In_Time / (1000 * 3600 * 24)) * -1
                        );

                        if (Difference_In_Days > 15) {
                            if (Difference_In_Days > 30) {
                                if (subject.kickable) {
                                    if (!subject.user.bot) {
                                        subject.kick();
                                        logger.info(
                                            `${subject.displayName} with ID of ${subject.id} has been here for ${Difference_In_Days}days so he was kicked`
                                        );
                                        interaction.channel.send({
                                            content: `${subject.displayName} with ID of ${subject.id} has been here for ${Difference_In_Days}days so he was kicked`,
                                        });
                                    }
                                } else {
                                    logger.error(
                                        `It appears that for some reason ${subject.displayName} is un-kickable by the bot`
                                    );
                                    interaction.channel.send({
                                        content: `It appears that for some reason ${subject.displayName} is un-kickable by the bot`,
                                    });
                                }
                            } else {
                                if (!subject.user.bot) {
                                    subject.roles.add(imposterRole);
                                    logger.info(
                                        `${subject.displayName} has been here for ${Difference_In_Days}days so he was given the imposter role`
                                    );
                                    interaction.channel.send({
                                        content: `${subject.displayName} has been here for ${Difference_In_Days}days so he was given the imposter role`,
                                    });
                                }
                            }
                        }
                    }
                });
                interaction.editReply({
                    content: "Operation completed successfuly(hopefully)",
                });
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
