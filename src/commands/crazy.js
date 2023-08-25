const { logger } = require("../utils/logger");

function main(client) {
    logger.info("Registered crazy command");
    client.on("messageCreate", (msg) => {
        if (!msg.author.bot) {
            if (
                msg.content.toLowerCase() != "crazy?" &&
                msg.content.toLowerCase().includes("crazy")
            ) {
                const reply = "Crazy? I was crazy once.";
                logger.info(
                    `Replying to ${msg.author.username}'s ${msg} with ${reply}`
                );
                msg.channel.send(reply);
            }
            if (msg.content.toLowerCase() == "crazy?") {
                const reply = "I was crazy once.";
                logger.info(
                    `Replying to ${msg.author.username}'s ${msg} with ${reply}`
                );
                msg.channel.send(reply);
            }
            if (
                msg.content.toLowerCase() == "i was crazy once" ||
                msg.content.toLowerCase() == "i was crazy once." ||
                msg.content.toLowerCase() == "i was crazy once!"
            ) {
                const reply = "They locked me in a room";
                logger.info(
                    `Replying to ${msg.author.username}'s ${msg} with ${reply}`
                );
                msg.channel.send(reply);
            }
            if (
                msg.content.toLowerCase() == "they locked me in a room" ||
                msg.content.toLowerCase() == "they locked me in a room." ||
                msg.content.toLowerCase() == "they locked me in a room!"
            ) {
                const reply = "A rubber room";
                logger.info(
                    `Replying to ${msg.author.username}'s ${msg} with ${reply}`
                );
                msg.channel.send(reply);
            }
            if (
                msg.content.toLowerCase() == "a rubber room" ||
                msg.content.toLowerCase() == "a rubber room." ||
                msg.content.toLowerCase() == "a rubber room!"
            ) {
                const reply = "A rubber room with rats";
                logger.info(
                    `Replying to ${msg.author.username}'s ${msg} with ${reply}`
                );
                msg.channel.send(reply);
            }
            if (
                msg.content.toLowerCase() == "a rubber room with rats" ||
                msg.content.toLowerCase() == "a rubber room with rats." ||
                msg.content.toLowerCase() == "a rubber room with rats!"
            ) {
                const reply = "The rats make me crazy";
                logger.info(
                    `Replying to ${msg.author.username}'s ${msg} with ${reply}`
                );
                msg.channel.send(reply);
            }
        }
    });
}

module.exports = { main };
