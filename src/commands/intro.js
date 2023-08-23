require("dotenv").config();
const { logger } = require("../logger");
const { isAdmin, getUserRoles } = require("../functions");

function main(client) {
    logger.info("Registered intro command(s)");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "intro") {
            const introRole = process.env.INTRO_ROLE;
            const mentorRole = process.env.MENTOR_ROLE;
            var reversed = false;
            try {
                reversed = interaction.options.get("reverse").value;
            } catch (error) {}
            await interaction.deferReply({ ephemeral: true });
            if (reversed) {
                interaction.guild.members
                    .fetch(interaction.options.get("user").value)
                    .then((introUser) => {
                        interaction.guild.members
                            .fetch(interaction.user)
                            .then((mentor) => {
                                if (isAdmin(mentor)) {
                                    introUser.roles
                                        .add(
                                            introRole,
                                            `Member was reverse introed by ${interaction.client.user.username}`
                                        )
                                        .then(() => {
                                            interaction.guild.roles
                                                .fetch(introRole)
                                                .then((role) => {
                                                    logger.info(
                                                        `${mentor.displayName} has reverse introed ${introUser.displayName}`
                                                    );
                                                    interaction.editReply({
                                                        content: `Successfuly gave role ${role.name} to ${introUser.displayName}`,
                                                    });
                                                });
                                        })
                                        .catch((err) => {
                                            interaction.guild.roles
                                                .fetch(introRole)
                                                .then((role) => {
                                                    logger.error(
                                                        `${mentor.displayName} has tried to reverse intro ${introUser.displayName} but the role failed to be added`
                                                    );
                                                    logger.error(err);
                                                    interaction.editReply({
                                                        content: `Failed to give role ${role.name} to ${introUser.displayName}`,
                                                    });
                                                });
                                        });
                                } else {
                                    logger.warn(
                                        `${mentor.displayName} tried to use the reverse intro command with insufficient privileges`
                                    );
                                    interaction.editReply({
                                        content: `Insufficient privileges to use reverse intro command`,
                                    });
                                }
                            });
                    });
            } else {
                interaction.guild.members
                    .fetch(interaction.options.get("user").value)
                    .then((introUser) => {
                        interaction.guild.members
                            .fetch(interaction.user)
                            .then((mentor) => {
                                if (
                                    getUserRoles(mentor).includes(mentorRole) ||
                                    isAdmin(mentor)
                                ) {
                                    introUser.roles
                                        .remove(
                                            introRole,
                                            `Member was introed by ${interaction.client.user.username}`
                                        )
                                        .then(() => {
                                            interaction.guild.roles
                                                .fetch(introRole)
                                                .then((role) => {
                                                    logger.info(
                                                        `${mentor.displayName} has introed ${introUser.displayName}`
                                                    );
                                                    interaction.editReply({
                                                        content: `Successfuly removed role ${role.name} from ${introUser.displayName}`,
                                                    });
                                                });
                                        })
                                        .catch((err) => {
                                            interaction.guild.roles
                                                .fetch(introRole)
                                                .then((role) => {
                                                    logger.error(
                                                        `${mentor.displayName} has tried to intro ${introUser.displayName} but the role failed to be removed`
                                                    );
                                                    logger.error(err);
                                                    interaction.editReply({
                                                        content: `Failed to remove role ${role.name} from ${introUser.displayName}`,
                                                    });
                                                });
                                        });
                                } else {
                                    logger.warn(
                                        `${mentor.displayName} tried to use the intro command with insufficient privileges`
                                    );
                                    interaction.editReply({
                                        content: `Insufficient privileges to use intro command`,
                                    });
                                }
                            });
                    });
            }
        }
    });
}

module.exports = { main };
