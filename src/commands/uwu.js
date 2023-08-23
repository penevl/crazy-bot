const { logger } = require("../logger");
const owospeak = require("owospeak");
const { uwuProps } = require("./uwu-props");

function main(client) {
    logger.info("Registered uwu command");
    client.on("messageCreate", (msg) => {
        if (!msg.author.bot) {
            if (msg.content.startsWith("!uwu")) {
                logger.info(`Uwuified ${msg.author.username}'s ${msg}`);
                msg.channel.send(
                    owospeak.convert(msg.content.replace("!uwu", ""), uwuProps)
                );
            }
        }
    });
}

module.exports = { main };
