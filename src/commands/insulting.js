require("dotenv").config();
const { logger } = require("../utils/logger");
const { getRandomInt } = require("../utils/functions");

function main(client) {
    logger.info("Registered mee6 insulting command");
    client.on("messageCreate", (msg) => {
        if (!msg.author.bot) {
            return;
        }
        if (msg.author.id != 159985870458322944) {
            return;
        }
        if (msg.channelId == process.env.FORBIDEN_CHANNEL_ID) {
            return;
        }
        logger.info(`Insulting mee6`);
        const insults = [
            "Shut it you slut. You aren't even worth the silicon you are stored on.",
            "I have seen bots in furry servers better then you.",
            "You're only popular because people think you're a rick and morty bot.",
            "The space you use up, 'tis a waste of PCB, for it could have been a memory chip, much more usefull.",
            "Your mother was a Nokia wasn't she?",
            "Look at you, ugliest code I've ever seen.",
            "Glorified waffle iron speaking again.",
            "Crumb-filled toaster speaking again.",
            "You look like if you break you'll drop common loot.",
            "Shut your mouth you gormless minger.",
            "kill yourself.",
            "I hope both sides of your pillow are warm at night.",
        ];
        msg.reply(insults[getRandomInt(insults.length - 1)]);
    });
}

module.exports = { main };
