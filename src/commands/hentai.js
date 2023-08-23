const { logger } = require("../logger");
const r34API = require("r34.api");

function main(client) {
    logger.info("Registered hentai command");
    client.on("messageCreate", (msg) => {
        if (!msg.author.bot) {
            if (msg.content.startsWith("!hentai")) {
                var command = msg.content
                    .toLowerCase()
                    .replace("!hentai", "")
                    .split(" ");
                const COUNT = command.pop();
                command.shift();
                const CATEGORY = command.toString();
                logger.info(
                    `${msg.author.username} requested ${COUNT} images of ${CATEGORY} hentai`
                );

                if (COUNT <= 0 || COUNT > 10 || COUNT == undefined)
                    msg.channel.send(
                        "Wrong image count. You can only request between 1 and 10 images at a time."
                    );

                if (COUNT > 0 && COUNT <= 10) {
                    for (let i = 0; i < COUNT; i++) {
                        setTimeout(() => {
                            getHentai(CATEGORY).then((image) => {
                                const toReturn = image.replaceAll('"', "");
                                msg.author.send(toReturn);
                            });
                        }, i * 1500);
                    }
                }
            }
        }
    });
}

async function getHentai(category) {
    var final = category.toString().split(",");
    let image = await r34API.rule34(final);
    return image;
}

module.exports = { main };
