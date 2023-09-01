process.env.LOG_LEVEL = "debug";
const { getConfig, setConfig, loadInitial } = require("./utils/config");
loadInitial();
const {
    Client,
    Events,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { registerCommands } = require("./utils/commandRegister");
const { logger } = require("./utils/logger");
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

client.login(process.env.TOKEN);
