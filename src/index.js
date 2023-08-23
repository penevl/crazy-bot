require("dotenv").config();
const {
    Client,
    Events,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { registerCommands } = require("./commandRegister");
const { logger } = require("./logger");
const path = require("path");
const fs = require("fs");

registerCommands();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once(Events.ClientReady, (c) => {
    logger.info(`Logged in as ${c.user.username}`);
    const directoryPath = path.join(__dirname, "commands");
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            logger.error("Unable to reach commands folder");
            logger.error(err);
            process.exit(-1);
        }

        files.forEach(function (file) {
            if (file.endsWith(".js")) {
                logger.debug(`file: ${file}`);
                require(`./commands/${file}`).main(client);
            }
        });
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getUserRoles(user) {
    var roles = [];
    user.roles.cache.forEach((role) => {
        roles.push(role.id);
    });
    return roles;
}

function isAdmin(user) {
    const roles = getUserRoles(user);
    if (
        roles.includes(process.env.ADMIN_ROLE_ID) ||
        user.id == process.env.OWNER_ID
    ) {
        return true;
    }
}

module.exports = { getRandomInt, isAdmin, getUserRoles };
client.login(process.env.TOKEN);
