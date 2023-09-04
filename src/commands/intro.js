const { logger } = require("../utils/logger");
const { isAdmin, getUserRoles } = require("../utils/discord/user");
const { IntroUser } = require("../utils/discord/IntroUser");

function main(client) {
    logger.info("Registered intro command(s)");
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "intro") {
            await interaction.deferReply({ ephemeral: true });

            const mentorRole = process.env.MENTOR_ROLE;
            const introUserId = interaction.options.get("user").value;
            const introUser = await interaction.guild.members.fetch(
                introUserId
            );
            const mentor = await interaction.guild.members.fetch(
                interaction.user
            );

            const introUserEvent = new IntroUser();

            introUserEvent.on("intro", (displayName, roleName) => {
                interaction.editReply({
                    content: `Successfuly removed role ${roleName} from ${displayName}`,
                });
            });

            introUserEvent.on("reverse", (displayName, roleName) => {
                interaction.editReply({
                    content: `Successfuly added role ${roleName} to ${displayName}`,
                });
            });

            introUserEvent.on("error", (err) => {
                interaction.editReply({
                    content: err.message,
                });
            });

            var reversed = false;
            try {
                reversed = interaction.options.get("reverse").value;
            // eslint-disable-next-line no-empty
            } catch (error) {}
            if (reversed) {
                if (!isAdmin(mentor)) {
                    logger.warn(
                        `${mentor.displayName} tried to use the reverse intro command with insufficient privileges`
                    );
                    interaction.editReply({
                        content: "Insufficient privileges to use reverse intro command",
                    });
                    return;
                }

                introUserEvent.reverse(introUser);
            } else {
                if (!(getUserRoles(mentor).includes(mentorRole) || isAdmin(mentor))) {
                    logger.warn(
                        `${mentor.displayName} tried to use the intro command with insufficient privileges`
                    );
                    interaction.editReply({
                        content: "Insufficient privileges to use intro command",
                    });
                    return;
                }

                introUserEvent.intro(introUser);
            }
        }
    });
}

module.exports = { main };
