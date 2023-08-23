const { logger } = require("../logger");
const { isAdmin } = require("../functions");

var uwuProps = { stutter: false, tilde: true };
function main(client) {
    logger.info("Registered uwu-props command");
    client.on("messageCreate", async (msg) => {
        const author = await msg.guild.members.fetch(msg.author.id);
        if (!author.bot) {
            if (msg.content.startsWith("!stutter")) {
                if (isAdmin(author)) {
                    logger.info(`Changed stutter options`);
                    uwuProps.stutter = !uwuProps.stutter;
                    msg.channel.send(
                        `Changed stutter options to ${uwuProps.stutter}`
                    );
                } else {
                    logger.warn(
                        `${msg.author.username} tried to change stutter options`
                    );
                    msg.channel.send("Insufficient privileges");
                }
            }
            if (msg.content.startsWith("!tilde")) {
                if (isAdmin(author)) {
                    logger.info(`Changed tilde options`);
                    uwuProps.tilde = !uwuProps.tilde;
                    msg.channel.send(
                        `Changed tilde options to ${uwuProps.tilde}`
                    );
                } else {
                    logger.warn(
                        `${msg.author.username} tried to change tilde options`
                    );
                    msg.channel.send("Insufficient privileges");
                }
            }
        }
    });
}

module.exports = { main, uwuProps };
