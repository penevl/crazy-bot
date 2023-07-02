require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");

console.log(
  "Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats! The rats made me crazy."
);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (msg.content.toLowerCase() == "crazy") {
      const reply = "Crazy? I was crazy once.";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
    if (msg.content.toLowerCase() == "crazy?") {
      const reply = "I was crazy once.";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
    if (
      msg.content.toLowerCase() == "i was crazy once" ||
      msg.content.toLowerCase() == "i was crazy once." ||
      msg.content.toLowerCase() == "i was crazy once!"
    ) {
      const reply = "They locked me in a room";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
    if (
      msg.content.toLowerCase() == "they locked me in a room" ||
      msg.content.toLowerCase() == "they locked me in a room." ||
      msg.content.toLowerCase() == "they locked me in a room!"
    ) {
      const reply = "A rubber room";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
    if (
      msg.content.toLowerCase() == "a rubber room" ||
      msg.content.toLowerCase() == "a rubber room." ||
      msg.content.toLowerCase() == "a rubber room!"
    ) {
      const reply = "A rubber room with rats";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
    if (
      msg.content.toLowerCase() == "a rubber room with rats" ||
      msg.content.toLowerCase() == "a rubber room with rats." ||
      msg.content.toLowerCase() == "a rubber room with rats!"
    ) {
      const reply = "The rats make me crazy";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
    if (
      msg.content.toLowerCase() == "the rats made me crazy" ||
      msg.content.toLowerCase() == "the rats made me crazy!" ||
      msg.content.toLowerCase() == "the rats made me crazy."
    ) {
      const reply = "Crazy?";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
  }
});

client.login(process.env.TOKEN);
