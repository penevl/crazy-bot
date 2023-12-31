/* eslint-disable linebreak-style */
process.env.LOG_LEVEL = "debug";
const { loadInitial } = require("./utils/config");
loadInitial();
const { client } = require("./utils/discord/client");
const { Events } = require("discord.js");
const { registerCommands } = require("./utils/discord/commandRegister");
const { logger } = require("./utils/logger");
const path = require("path");
const fs = require("fs");
const { start } = require("./utils/express/server");

registerCommands();
start(process.env.WEB_PORT);

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
