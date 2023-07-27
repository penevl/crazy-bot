require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'intro',
    description: 'Removes intro role from user',
    options: [
        {
            name: 'user',
            description: 'User that was introed',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ]
  },
  {
    name: 'promote',
    description: 'Promotes a user to youngling',
    options: [
        {
            name: 'user',
            description: 'User to be promoted',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

async function registerCommands() {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};

module.exports = { registerCommands }