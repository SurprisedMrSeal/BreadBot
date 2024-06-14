const { Client, Intents, MessageEmbed } = require('discord.js');
const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT,
    ],
});

//status
client.on('ready', () => {
    client.user.setPresence({
        activity: { name: `Bread`, type: 'PLAYING' },
        status: 'idle'
    });

    BotID = client.user.id
    BotRegexp = new RegExp(`<@!?${BotID}>`);

    console.log(`${client.user.tag} is online and ready!`);
});

client.on('message', msg => {
// +1 Shiny Chain
    if (msg.author.id === '716390085896962058' && msg.content.startsWith("Congratulations ") && msg.content.includes("+1 Shiny chain!")) {
      setTimeout(() => {
        msg.react(config.chain)
        .catch(error => console.error('Error reacting with custom emoji:', error));
    }, 100);
  }
// colors seem unusual
    if (msg.author.id === '716390085896962058' && msg.content.startsWith("Congratulations ") && msg.content.includes("These colors seem unusual")) {
      setTimeout(() => {
        msg.react(config.shiny1)
          .catch(error => console.error('Error reacting with emoji:', error));
        
        setTimeout(() => {
          msg.react(config.shiny2)
            .catch(error => console.error('Error reacting with emoji:', error));
          
          setTimeout(() => {
            msg.react(config.shiny3)
              .then(() => {
                msg.pin()
                  .catch(error => console.error('Error pinning message:', error));
              })
              .catch(error => console.error('Error reacting with emoji:', error));
          }, 100);
        }, 100);
      }, 100);
    }
});
  
//ty
client.on('message', msg => {
    if (msg.author.bot) return;
    const content = msg.content.toLowerCase();
    const thanksRegex = /\b(ty|thanks?|thx|thnx|tysm|thank)\b/;

    if (!thanksRegex.test(content)) return;

    setTimeout(() => {
        msg.react("<:heartbread:1189105762182627490>")
            .catch(error => console.error('Error reacting with emoji:', error));
    }, 100);
});


// ping
client.on('message', msg => {
  if (msg.author.bot) return;
  const firstArg = msg.content.split(' ')[0];
  if (!BotRegexp.test(firstArg) && !msg.content.startsWith(prefix)) return;
  const pingUsed = BotRegexp.test(firstArg)
  let args = msg.content.toLowerCase().slice(pingUsed ? firstArg.length : prefix.length).trim().split(" ");
  let cmd = args.shift();
  if (cmd == "ping") {
    const ping = msg.createdTimestamp - Date.now();
        return msg.channel.send(`🏓 **${Math.abs(ping)} ms**.`);
  }
});

client.login(token);