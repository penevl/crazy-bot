require("dotenv").config();
const { logger } = require("../utils/logger");
const {
    isAdmin,
    getUserRoles,
    calculateJoinTime,
} = require("../utils/discord/user");

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
            const newcomerRole = process.env.NEWCOMER_ROLE;

            if (!isAdmin(initiator)) {
                logger.warn(
                    `${initiator.displayName} tried to use the check command with insufficient priviliges`
                );
                interaction.editReply({
                    content: "Insufficient priviliges",
                });
                return;
            }

            if (getUserRoles(subject).includes(newcomerRole)) {
                daysSinceJoin = calculateJoinTime(subject);

                if (daysSinceJoin >= 15 && daysSinceJoin < 30) {
                    if (!subject.user.bot) {
                        subject.roles.add(imposterRole);
                        logger.info(
                            `${subject.displayName} has been here for ${daysSinceJoin}days so he was given the imposter role`
                        );
                        interaction.channel.send({
                            content: `${subject.displayName} has been here for ${daysSinceJoin}days so he was given the imposter role`,
                        });
                    }
                }

                if (daysSinceJoin >= 30) {
                    if (!subject.user.bot) {
                        if (subject.kickable) {
                            subject.kick();
                            logger.info(
                                `${subject.displayName} with ID of ${subject.id} has been here for ${daysSinceJoin}days so he was kicked`
                            );
                            interaction.channel.send({
                                content: `${subject.displayName} with ID of ${subject.id} has been here for ${daysSinceJoin}days so he was kicked`,
                            });
                        } else {
                            logger.error(
                                `It appears that for some reason ${subject.displayName} is un-kickable by the bot`
                            );
                            interaction.channel.send({
                                content: `It appears that for some reason ${subject.displayName} is un-kickable by the bot`,
                            });
                        }
                    }
                }
            }
        }
    });
}

module.exports = { main };
