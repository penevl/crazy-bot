const { ChatInputCommandInteraction } = require("discord.js");
const { logger } = require("../utils/logger");
const r34API = require("r34.api");

function main(client) {
    logger.info("Registered hentai command");

    client.on("interactionCreate", (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === "hentai") {
            const count = interaction.options.get("count").value;
            const category = interaction.options.get("category").value;
            logger.info(
                `${interaction.user.username} requested ${count} images of ${category} hentai`
            );

            if (count <= 0 || count > 10 || count == undefined) {
                interaction.editReply(
                    "Wrong image count. You can only request between 1 and 10 images at a time."
                );
                return;
            }

            interaction.reply(
                `Sending in ${count} images of ${category} hentai`
            );
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    getHentai(category).then((image) => {
                        const toReturn = image.replaceAll('"', "");
                        interaction.user.send(toReturn);
                    });
                }, i * 1500);
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
