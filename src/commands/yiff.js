const { logger } = require("../utils/logger");
const axios = require("axios");
const headers = {
    "User-Agent": "elduko-discord-porn-bot discord-username-.elduko",
};

function main(client) {
    logger.info("Registered yiff command");
    client.on("interactionCreate", (interaction) => {
        if (interaction.commandName === "yiff") {
            const categories = ["gay", "straight", "lesbian"];
            const category = interaction.options
                .get("category")
                .value.toLowerCase();
            const count = interaction.options.get("count").value;
            logger.info(
                `${interaction.user.username} requested ${count} images of ${category} furry porn`
            );

            if (!categories.includes(category)) {
                interaction.reply({
                    content:
                        "Wrong category. Available categories are:\n- Straight\n- Gay\n- Lesbian",
                    ephemeral: true,
                });
                return;
            }

            if (count <= 0 || count > 10 || count == undefined) {
                interaction.reply({
                    content:
                        "Wrong image count. You can only request between 1 and 10 images at a time.",
                    ephemeral: true,
                });
                return;
            }

            interaction.reply(
                `Sending ${count} images of ${category} furry porn`
            );
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    axios
                        .get(`https://v2.yiff.rest/furry/yiff/${category}`, {
                            headers,
                        })
                        .then((res) => {
                            interaction.user.send(res.data.images[0].url);
                        })
                        .catch((err) => {
                            logger.error("Rate limited");
                        });
                }, i * 2000);
            }
        }
    });
}

module.exports = { main };
