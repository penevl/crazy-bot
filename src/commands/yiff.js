const { logger } = require("../logger");
const axios = require("axios");
const headers = {
    "User-Agent": "elduko-discord-porn-bot discord-username-.elduko",
};

function main(client) {
    logger.info("Registered yiff command");
    client.on("messageCreate", (msg) => {
        if (!msg.author.bot) {
            if (msg.content.startsWith("!porn")) {
                const command = msg.content
                    .toLowerCase()
                    .replace("!porn", "")
                    .split(" ");
                const CATEGORIES = ["gay", "straight", "lesbian"];
                const CATEGORY = command[1];
                const COUNT = command[2];
                logger.info(
                    `${msg.author.username} requested ${COUNT} images of ${CATEGORY} furry porn`
                );

                if (!CATEGORIES.includes(CATEGORY))
                    msg.channel.send(
                        "Wrong category. Available categories are:\n- Straight\n- Gay\n- Lesbian"
                    );

                if (COUNT <= 0 || COUNT > 10 || COUNT == undefined)
                    msg.channel.send(
                        "Wrong image count. You can only request between 1 and 10 images at a time."
                    );

                if (CATEGORIES.includes(CATEGORY) && COUNT > 0 && COUNT <= 10) {
                    for (let i = 0; i < COUNT; i++) {
                        setTimeout(() => {
                            axios
                                .get(
                                    `https://v2.yiff.rest/furry/yiff/${CATEGORY}`,
                                    { headers }
                                )
                                .then((res) => {
                                    msg.author.send(res.data.images[0].url);
                                })
                                .catch((err) => {
                                    logger.info("Rate limited");
                                });
                        }, i * 2000);
                    }
                }
            }
        }
    });
}

module.exports = { main };
