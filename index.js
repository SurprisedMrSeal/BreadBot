const { Client, Partials, GatewayIntentBits, ActivityType, Collection, PermissionFlagsBits } = require('discord.js');
const { P2, embedColor, prefix } = require('./utils');
require('dotenv').config();
const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.commands = new Collection();
const slashCommands = [];
const commands = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.name) {
        client.commands.set(command.name, command);
        if (command.aliases) command.aliases.forEach(alias => client.commands.set(alias, command));
    }
    if (command.data) slashCommands.push(command.data.toJSON());
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// startup
client.on('ready', () => {
    client.user.setPresence({
        activities: [{ name: `Bread`, type: ActivityType.Playing }],
        status: 'idle'
    });

    BotID = client.user.id
    BotRegexp = new RegExp(`<@!?${BotID}>`);

    console.log(`${client.user.tag} is online and ready!`);
});

async function handlePrefixCommand(msg) {
    if (msg.author.bot || !msg.guild) return;

    try {
        const content = msg.content.trim();
        let usedPrefix = null;

        if (prefix && content.startsWith(prefix)) {
            usedPrefix = prefix;
        }

        if (!usedPrefix) {
            const mentionMatch = content.match(/^<@!?(\d+)>/);
            if (mentionMatch && mentionMatch[1] === client.user.id) {
                usedPrefix = mentionMatch[0];
            }
        }

        if (!usedPrefix) return;

        const args = content.slice(usedPrefix.length).trim().split(/\s+/);
        const cmd = args.shift()?.toLowerCase();
        if (!cmd) return;
        const command = client.commands.get(cmd);
        if (command && command.execute) {
            if (!msg.channel.permissionsFor(client.user).has(PermissionFlagsBits.SendMessages) ||
                !msg.channel.permissionsFor(client.user).has(PermissionFlagsBits.ViewChannel)) {
                msg.react('🤐');
                msg.author.send('⚠️ I need the `Send Messages` and `View Channel` permissions to run this command! 🤐')
                    .catch(() => { });
                return;
            }

            await command.execute(msg, args, client);
        }
    } catch (error) {
        console.error('Error handling prefix command:', error);
        if (msg.channel.permissionsFor(client.user).has(PermissionFlagsBits.SendMessages)) {
            msg.reply('⚠️ Hmm, something prevented me from executing this command, try again later.').catch(console.error);
        }
    }
}

const recentMessages = new Map();

client.on('messageCreate', async msg => {
    if (msg.author.bot || !msg.guild) return;

    recentMessages.set(msg.id, Date.now());
    setTimeout(() => recentMessages.delete(msg.id), 5000);

    await handlePrefixCommand(msg);
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
    if (!newMsg.guild || newMsg.author?.bot) return;
    if (oldMsg.content === newMsg.content) return;
    if (!recentMessages.has(newMsg.id)) return;

    await handlePrefixCommand(newMsg);
});

client.login(process.env.token);