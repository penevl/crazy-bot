require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const owospeak = require("owospeak");

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

var uwuProps = { stutter: false, tilde: true };

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
    if (
      msg.content.toLowerCase() == "the rats make me crazy" ||
      msg.content.toLowerCase() == "the rats make me crazy!" ||
      msg.content.toLowerCase() == "the rats make me crazy."
    ) {
      const reply = "Crazy?";
      console.log(`Replying to ${msg.author.username}'s ${msg} with ${reply}`);
      msg.channel.send(reply);
    }
  }
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (
      msg.content.toLowerCase() == "toyota" &&
      msg.channelId == process.env.TOYOTA_CHANNEL_ID
    ) {
      console.log(`Replying to ${msg.author.username}'s ${msg} with Toyota`);
      msg.channel.send("Toyota");
    }
  }
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (msg.content.startsWith("!uwu")) {
      console.log(`Uwuified ${msg.author.username}'s ${msg}`);
      msg.channel.send(
        owospeak.convert(msg.content.replace("!uwu", ""), uwuProps)
      );
    }
  }
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (msg.content.startsWith("!stutter")) {
      if (msg.author.id == process.env.OWNER_ID) {
        console.log(`Changed stutter options`);
        uwuProps.stutter = !uwuProps.stutter;
        msg.channel.send(`Changed stutter options to ${uwuProps.stutter}`);
      } else {
        console.log(`${msg.author.username} tried to change stutter options`);
        msg.channel.send("Insufficient privileges");
      }
    }
    if (msg.content.startsWith("!tilde")) {
      if (msg.author.id == process.env.OWNER_ID) {
        console.log(`Changed tilde options`);
        uwuProps.tilde = !uwuProps.tilde;
        msg.channel.send(`Changed tilde options to ${uwuProps.tilde}`);
      } else {
        console.log(`${msg.author.username} tried to change tilde options`);
        msg.channel.send("Insufficient privileges");
      }
    }
  }
});

// Insults MEE6
client.on("messageCreate", (msg) => {
  if (msg.author.bot) {
    if (msg.author.id == 159985870458322944) {
      console.log(`Insulting mee6`);
      const insults = [
        "Shut it you slut. You aren't even worth the silicon you are stored on.",
        "I have seen bots in furry servers better then you.",
        "You're only popular because people think you're a rick and morty bot.",
        "The space you use up, 'tis a waste of PCB, for it could have been a memory chip, much more usefull.",
        "Your mother was a Nokia wasn't she?",
        "Look at you, ugliest code I've ever seen.",
        "Glorified waffle iron speaking again.",
        "Crumb-filled toaster speaking again",
      ];

      msg.reply(insults[getRandomInt(insults.length - 1)]);
    }
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

client.login(process.env.TOKEN);
