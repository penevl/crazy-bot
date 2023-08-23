require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const { logger } = require("./logger");

const commands = [
    {
        name: "intro",
        description: "Removes intro role from user",
        options: [
            {
                name: "user",
                description: "User that was introed",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reverse",
                description: "Requires admin",
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
        ],
    },
    {
        name: "promote",
        description: "Promotes a user to youngling",
        options: [
            {
                name: "user",
                description: "User to be promoted",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: "reverse",
                description: "Requires admin",
                type: ApplicationCommandOptionType.Boolean,
                required: false,
            },
        ],
    },
    {
        name: "check",
        description: "Check to see if the user is sus",
        options: [
            {
                name: "user",
                description: "User to be promoted",
                type: ApplicationCommandOptionType.User,
                required: true,
            },
        ],
    },
    {
        name: "check-auto",
        description: "Check every single user to see if they are sus",
    },
    {
        name: "hentai",
        description: "Sends you hentai",
        options: [
            {
                name: "category",
                description: "Categories you want. Seperated by coma",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: "count",
                description: "Number of images you want. Between 1 and 10",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: "stutter",
        description: "Turn UwU stutter on or off",
        options: [
            {
                name: "value",
                description: "Stutter value",
                type: ApplicationCommandOptionType.Boolean,
                required: true,
            },
        ],
    },
    {
        name: "tilde",
        description: "Turn UwU tilde on or off",
        options: [
            {
                name: "value",
                description: "Tilde value",
                type: ApplicationCommandOptionType.Boolean,
                required: true,
            },
        ],
    },
    {
        name: "uwu",
        description: "UwU-ify a message",
        options: [
            {
                name: "message",
                description: "Message to be UwU-ified",
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function registerCommands() {
    try {
        logger.info("Registering slash commands");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        logger.info("Slash commands were registered successfully!");
    } catch (error) {
        logger.error(`There was an error with registering slash commands`);
        logger.error(error);
    }
}

module.exports = { registerCommands };
