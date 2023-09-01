require("dotenv").config();
const { logger } = require("../utils/logger");
const { isAdmin, getUserRoles } = require("../utils/discord/user");
const { ChatInputCommandInteraction } = require("discord.js");
const { PromoteUser } = require("../utils/discord/PromoteUser");

function main(client) {
    logger.info("Registered promote command(s)");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "promote") {
            await interaction.deferReply({ ephemeral: true });

            const mentorRole = process.env.MENTOR_ROLE;
            const newMemberId = interaction.options.get("user").value;
            const newMember = await interaction.guild.members.fetch(
                newMemberId
            );
            const mentor = await interaction.guild.members.fetch(
                interaction.user
            );

            const promoteUser = new PromoteUser();

            promoteUser.on("promotion", (displayName) => {
                interaction.editReply({
                    content: `Successfuly promoted ${displayName}`,
                });
            });

            promoteUser.on("reverse", (displayName) => {
                interaction.editReply({
                    content: `Successfuly reverse promoted ${displayName}`,
                });
            });

            promoteUser.on("error", (err) => {
                interaction.editReply({
                    content: err.message,
                });
            });

            var reversed = false;
            try {
                reversed = interaction.options.get("reverse").value;
            } catch (error) {}
            if (reversed) {
                if (isAdmin(mentor)) {
                    promoteUser.reverse(newMember);
                } else {
                    logger.warn(
                        `${mentor.displayName} tried to use the reverse promote command with insufficient privileges`
                    );
                    interaction.editReply({
                        content: `Insufficient privileges to use reverse promote command`,
                    });
                }
            } else {
                if (
                    getUserRoles(mentor).includes(mentorRole) ||
                    isAdmin(mentor)
                ) {
                    promoteUser.promote(newMember);
                } else {
                    logger.warn(
                        `${mentor.displayName} tried to use the promote command with insufficient privileges`
                    );
                    interaction.editReply({
                        content: `Insufficient privileges to use promote command`,
                    });
                    return;
                }
            }
        }
    });
}

module.exports = { main };
