require("dotenv").config();
const { logger } = require("../logger");
const { isAdmin, getUserRoles } = require("../functions");

function main(client) {
    logger.info("Registered promote command(s)");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "promote") {
            const newcomerRole = process.env.NEWCOMER_ROLE;
            const promotionRole = process.env.PROMOTION_ROLE;
            const imposterRole = process.env.IMPOSTER_ROLE;
            const mentorRole = process.env.MENTOR_ROLE;
            var reversed = false;
            try {
                reversed = interaction.options.get("reverse").value;
            } catch (error) {}
            await interaction.deferReply({ ephemeral: true });
            if (reversed) {
                interaction.guild.members
                    .fetch(interaction.options.get("user").value)
                    .then((newMember) => {
                        interaction.guild.members
                            .fetch(interaction.user)
                            .then((mentor) => {
                                if (isAdmin(mentor)) {
                                    newMember.roles
                                        .remove(
                                            [promotionRole],
                                            `Member was promoted by ${interaction.client.user.username}`
                                        )
                                        .then(() => {
                                            newMember.roles
                                                .add(
                                                    newcomerRole,
                                                    `Member was reverse promoted by ${interaction.client.user.username}`
                                                )
                                                .then(() => {
                                                    logger.info(
                                                        `${mentor.displayName} has reverse promoted ${newMember.displayName}`
                                                    );
                                                    interaction.editReply({
                                                        content: `Successfuly reverse promoted ${newMember.displayName}`,
                                                    });
                                                })
                                                .catch((err) => {
                                                    logger.error(
                                                        `${mentor.displayName} has tried to reverse promote ${newMember.displayName} but the bot failed to add the promotion role`
                                                    );
                                                    logger.error(err);
                                                    interaction.editReply({
                                                        content: `Tried to reverse promote ${newMember.displayName} but the bot failed`,
                                                    });
                                                });
                                        })
                                        .catch((err) => {
                                            logger.error(
                                                `${mentor.displayName} has tried to reverse promote ${newMember.displayName} but failed`
                                            );
                                            logger.error(err);
                                            interaction.editReply({
                                                content: `Tried to reverse promote ${newMember.displayName} but failed`,
                                            });
                                        });
                                } else {
                                    logger.warn(
                                        `${mentor.displayName} tried to use the reverse promote command with insufficient privileges`
                                    );
                                    interaction.editReply({
                                        content: `Insufficient privileges to use reverse promote command`,
                                    });
                                }
                            });
                    });
            } else {
                interaction.guild.members
                    .fetch(interaction.options.get("user").value)
                    .then((newMember) => {
                        interaction.guild.members
                            .fetch(interaction.user)
                            .then((mentor) => {
                                if (
                                    getUserRoles(mentor).includes(mentorRole) ||
                                    isAdmin(mentor)
                                ) {
                                    newMember.roles
                                        .remove(
                                            [newcomerRole, imposterRole],
                                            `Member was promoted by ${interaction.client.user.username}`
                                        )
                                        .then(() => {
                                            newMember.roles
                                                .add(
                                                    promotionRole,
                                                    `Member was promoted by ${interaction.client.user.username}`
                                                )
                                                .then(() => {
                                                    logger.info(
                                                        `${mentor.displayName} has promoted ${newMember.displayName}`
                                                    );
                                                    interaction.editReply({
                                                        content: `Successfuly promoted ${newMember.displayName}`,
                                                    });
                                                })
                                                .catch((err) => {
                                                    logger.error(
                                                        `${mentor.displayName} has tried to promote ${newMember.displayName} but the bot failed to add the promotion role`
                                                    );
                                                    logger.error(err);
                                                    interaction.editReply({
                                                        content: `Tried to promote ${newMember.displayName} but the bot failed to add the promotion role`,
                                                    });
                                                });
                                        })
                                        .catch((err) => {
                                            logger.error(
                                                `${mentor.displayName} has tried to promote ${newMember.displayName} but the newcomer role(s) failed to be removed`
                                            );
                                            logger.error(err);
                                            interaction.editReply({
                                                content: `Tried to promote ${newMember.displayName} but the newcomer role(s) failed to be removed`,
                                            });
                                        });
                                } else {
                                    logger.warn(
                                        `${mentor.displayName} tried to use the promote command with insufficient privileges`
                                    );
                                    interaction.editReply({
                                        content: `Insufficient privileges to use promote command`,
                                    });
                                }
                            });
                    });
            }
        }
    });
}

module.exports = { main };
