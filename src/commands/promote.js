require("dotenv").config();
const { logger } = require("../logger");
const { isAdmin, getUserRoles } = require("../functions");
const { ChatInputCommandInteraction } = require("discord.js");

function main(client) {
    logger.info("Registered promote command(s)");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "promote") {
            var reversed = false;
            try {
                reversed = interaction.options.get("reverse").value;
            } catch (error) {}
            await interaction.deferReply({ ephemeral: true });
            if (reversed) {
                reversePromote(interaction);
            } else {
                promote(interaction);
            }
        }
    });
}

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 */
async function promote(interaction) {
    const newcomerRole = process.env.NEWCOMER_ROLE;
    const promotionRole = process.env.PROMOTION_ROLE;
    const imposterRole = process.env.IMPOSTER_ROLE;
    const mentorRole = process.env.MENTOR_ROLE;
    const newMemberId = interaction.options.get("user").value;
    const newMember = await interaction.guild.members.fetch(newMemberId);
    const mentor = await interaction.guild.members.fetch(interaction.user);

    if (getUserRoles(mentor).includes(mentorRole) || isAdmin(mentor)) {
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
}

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 */
async function reversePromote(interaction) {
    const newcomerRole = process.env.NEWCOMER_ROLE;
    const promotionRole = process.env.PROMOTION_ROLE;
    const newMemberId = interaction.options.get("user").value;
    const newMember = await interaction.guild.members.fetch(newMemberId);
    const mentor = await interaction.guild.members.fetch(interaction.user);

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
}
module.exports = { main };
