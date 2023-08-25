const { logger } = require("../utils/logger");

function main(client) {
    logger.info("Registered toyota command");
    client.on("messageCreate", (msg) => {
        if (!msg.author.bot) {
            if (
                msg.content.toLowerCase() == "toyota" &&
                msg.channelId == process.env.TOYOTA_CHANNEL_ID
            ) {
                logger.info(
                    `Replying to ${msg.author.username}'s ${msg} with Toyota`
                );
                msg.channel.send("Toyota");
            }
        }
    });
}

module.exports = { main };
