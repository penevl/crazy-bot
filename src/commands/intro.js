require("dotenv").config();
const { logger } = require("../utils/logger");
const { isAdmin, getUserRoles } = require("../utils/functions");
const { ChatInputCommandInteraction } = require("discord.js");

function main(client) {
    logger.info("Registered intro command(s)");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "intro") {
            var reversed = false;
            try {
                reversed = interaction.options.get("reverse").value;
            } catch (error) {}
            await interaction.deferReply({ ephemeral: true });
            if (reversed) {
                reverseIntro(interaction);
            } else {
                intro(interaction);
            }
        }
    });
}

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 */
async function intro(interaction) {
    const introRole = process.env.INTRO_ROLE;
    const mentorRole = process.env.MENTOR_ROLE;
    const introUserId = interaction.options.get("user").value;
    const introUser = await interaction.guild.members.fetch(introUserId);
    const mentor = await interaction.guild.members.fetch(interaction.user);

    if (!(getUserRoles(mentor).includes(mentorRole) || isAdmin(mentor))) {
        logger.warn(
            `${mentor.displayName} tried to use the intro command with insufficient privileges`
        );
        interaction.editReply({
            content: `Insufficient privileges to use intro command`,
        });
        return;
    }
    introUser.roles
        .remove(
            introRole,
            `Member was introed by ${interaction.client.user.username}`
        )
        .then(() => {
            interaction.guild.roles.fetch(introRole).then((role) => {
                logger.info(
                    `${mentor.displayName} has introed ${introUser.displayName}`
                );
                interaction.editReply({
                    content: `Successfuly removed role ${role.name} from ${introUser.displayName}`,
                });
            });
        })
        .catch((err) => {
            interaction.guild.roles.fetch(introRole).then((role) => {
                logger.error(
                    `${mentor.displayName} has tried to intro ${introUser.displayName} but the role failed to be removed`
                );
                logger.error(err);
                interaction.editReply({
                    content: `Failed to remove role ${role.name} from ${introUser.displayName}`,
                });
            });
        });
}

/**
 *
 * @param {ChatInputCommandInteraction} interaction
 */
async function reverseIntro(interaction) {
    const introRole = process.env.INTRO_ROLE;
    const introUserId = interaction.options.get("user").value;
    const introUser = await interaction.guild.members.fetch(introUserId);
    const mentor = await interaction.guild.members.fetch(interaction.user);

    if (!isAdmin(mentor)) {
        logger.warn(
            `${mentor.displayName} tried to use the reverse intro command with insufficient privileges`
        );
        interaction.editReply({
            content: `Insufficient privileges to use reverse intro command`,
        });
        return;
    }

    introUser.roles
        .add(
            introRole,
            `Member was reverse introed by ${interaction.client.user.username}`
        )
        .then(() => {
            interaction.guild.roles.fetch(introRole).then((role) => {
                logger.info(
                    `${mentor.displayName} has reverse introed ${introUser.displayName}`
                );
                interaction.editReply({
                    content: `Successfuly gave role ${role.name} to ${introUser.displayName}`,
                });
            });
        })
        .catch((err) => {
            interaction.guild.roles.fetch(introRole).then((role) => {
                logger.error(
                    `${mentor.displayName} has tried to reverse intro ${introUser.displayName} but the role failed to be added`
                );
                logger.error(err);
                interaction.editReply({
                    content: `Failed to give role ${role.name} to ${introUser.displayName}`,
                });
            });
        });
}

module.exports = { main };
