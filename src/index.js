require("dotenv").config();
const {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");
const owospeak = require("owospeak");
const axios = require("axios");
const r34API = require("r34.api");
const {registerCommands} = require('./commandRegister')

console.log(
  "Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats! The rats made me crazy."
);

registerCommands()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

var uwuProps = { stutter: false, tilde: true };
const headers = {
  "User-Agent": "elduko-discord-porn-bot discord-username-.elduko",
};

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (
      msg.content.toLowerCase() != "crazy?" &&
      msg.content.toLowerCase().includes("crazy")
    ) {
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
      if (isAdmin(msg.author)) {
        console.log(`Changed stutter options`);
        uwuProps.stutter = !uwuProps.stutter;
        msg.channel.send(`Changed stutter options to ${uwuProps.stutter}`);
      } else {
        console.log(`${msg.author.username} tried to change stutter options`);
        msg.channel.send("Insufficient privileges");
      }
    }
    if (msg.content.startsWith("!tilde")) {
      if (isAdmin(msg.author)) {
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
      if (msg.channelId != process.env.FORBIDEN_CHANNEL_ID) {
        console.log(`Insulting mee6`);
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
      }
    }
  }
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (msg.content.startsWith("!porn")) {
      const command = msg.content.toLowerCase().replace("!porn", "").split(" ");
      const CATEGORIES = ["gay", "straight", "lesbian"];
      const CATEGORY = command[1];
      const COUNT = command[2];
      console.log(
        `${msg.author.username} requested ${COUNT} images of ${CATEGORY} furry porn`
      );

      if (!CATEGORIES.includes(CATEGORY))
        msg.channel.send(
          "Wrong category. Available categories are:\n- Straight\n- Gay\n- Lesbian"
        );

      if (COUNT <= 0 || COUNT > 10 || COUNT == undefined)
        msg.channel.send(
          "Wrong image count. You can only request between 1 and 10 images at a time."
        );

      if (CATEGORIES.includes(CATEGORY) && COUNT > 0 && COUNT <= 10) {
        for (let i = 0; i < COUNT; i++) {
          setTimeout(() => {
            axios
              .get(`https://v2.yiff.rest/furry/yiff/${CATEGORY}`, { headers })
              .then((res) => {
                msg.author.send(res.data.images[0].url);
              })
              .catch((err) => {
                console.log("Rate limited");
              });
          }, i * 2000);
        }
      }
    }
  }
});

client.on("messageCreate", (msg) => {
  if (!msg.author.bot) {
    if (msg.content.startsWith("!hentai")) {
      var command = msg.content
        .toLowerCase()
        .replace("!hentai", "")
        .split(" ");
      const COUNT = command.pop();
      command.shift()
      const CATEGORY = command.toString();
      console.log(
        `${msg.author.username} requested ${COUNT} images of ${CATEGORY} hentai`
      );

      if (COUNT <= 0 || COUNT > 10 || COUNT == undefined)
        msg.channel.send(
          "Wrong image count. You can only request between 1 and 10 images at a time."
        );

      if (COUNT > 0 && COUNT <= 10) {
        for (let i = 0; i < COUNT; i++) {
          setTimeout(() => {
            getHentai(CATEGORY).then((image) => {
              const toReturn = image.replaceAll('"', "");
              msg.author.send(toReturn);
            });
          }, i * 1500);
        }
      }
    }
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'intro') {
    const introRole = process.env.INTRO_ROLE
    const mentorRole = process.env.MENTOR_ROLE
    interaction.guild.members.fetch(interaction.options.get('user').value).then(introUser => {
      interaction.guild.members.fetch(interaction.user).then(mentor => {
        if(getUserRoles(mentor).includes(mentorRole) || isAdmin(mentor)){
          introUser.roles.remove(introRole, `Member was introed by ${interaction.client.user.username}`).then(() => {
            interaction.guild.roles.fetch(introRole).then(role => {
              console.log(`${mentor.nickname} has introed ${introUser.nickname}`)
              interaction.reply({ 
                content: `Successfuly removed role ${role.name} from ${introUser.displayName}`, 
                ephemeral: true 
              })
            })
          }).catch(() => {
            interaction.guild.roles.fetch(introRole).then(role => {
              console.log(`${mentor.nickname} has tried to intro ${introUser.nickname} but the role failed to be removed`)
              interaction.reply({ 
                content: `Failed to remove role ${role.name} from ${introUser.displayName}`, 
                ephemeral: true 
              })
            })
          })
        }else{
          console.log(`${mentor.nickname} tried to use the intro command with insufficient privileges`)
          interaction.reply({ 
            content: `Insufficient privileges to use intro command`, 
            ephemeral: false 
          })
        }
      })
    });
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'promote') {
    const newcomerRole = process.env.NEWCOMER_ROLE
    const promotionRole = process.env.PROMOTION_ROLE
    const imposterRole = process.env.IMPOSTER_ROLE
    const mentorRole = process.env.MENTOR_ROLE
    interaction.guild.members.fetch(interaction.options.get('user').value).then(newMember => {
      interaction.guild.members.fetch(interaction.user).then(mentor => {
        if(getUserRoles(mentor).includes(mentorRole) || isAdmin(mentor)){
          newMember.roles.remove([newcomerRole, imposterRole], `Member was promoted by ${interaction.client.user.username}`).then(() => {
            newMember.roles.add(promotionRole, `Member was promoted by ${interaction.client.user.username}`).then(() => {
              console.log(`${mentor.nickname} has promoted ${newMember.displayName}`)
              interaction.reply({ 
                content: `Successfuly promoted ${newMember.displayName}`, 
                ephemeral: true 
              })
            }).catch((err) => {
              console.log(`${mentor.nickname} has tried to promote ${newMember.nickname} but the bot failed to add the promotion role`)
              console.error(err)
              interaction.reply({ 
                content: `Tried to promote ${newMember.nickname} but the bot failed to add the promotion role`, 
                ephemeral: true 
              })
            })
          }).catch((err) => {
              console.log(`${mentor.nickname} has tried to promote ${newMember.nickname} but the newcomer role(s) failed to be removed`)
              console.error(err)
              interaction.reply({ 
                content: `Tried to promote ${newMember.nickname} but the newcomer role(s) failed to be removed`, 
                ephemeral: true 
              })
          })
        }else{
          console.log(`${mentor.nickname} tried to use the promote command with insufficient privileges`)
          interaction.reply({ 
            content: `Insufficient privileges to use promote command`, 
            ephemeral: false 
          })
        }
      })
    });
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getUserRoles(user){
  var roles = []
  user.roles.cache.forEach(role => {
    roles.push(role.id)
  })
  return roles
}

function isAdmin(user){
  const roles = getUserRoles(user)
  if(roles.includes(process.env.ADMIN_ROLE_ID) || user.id == process.env.OWNER_ID){
    return true;
  }
}

async function getHentai(category) {
  var final = category.toString().split(',')
  let image = await r34API.rule34(final);
  return image;
}

client.login(process.env.TOKEN);
