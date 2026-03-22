const { EmbedBuilder } = require('discord.js');
const { Pname, P2a, P2a_P, embedColor, Seal } = require('../utils');

const chan_arr = [
    "1134437058866327573", "1134439206702284801", "1175112915242713138", // voter channel
    "915991336577007647", // logs
    "787880836225040427"  // testing channel
];

const voteCd = new Map();
const CHANNEL_COOLDOWN_MS = 10000;

const shinyHuntPingsSectionRegex = /(?:\*\*✨?\s*Shiny Hunt Pings:\*\*|Shiny hunt pings:)([\s\S]*?)(?=\*\*|Collection|Type|Quest|$)/i;

module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;

        const match = msg.content.match(shinyHuntPingsSectionRegex);
        if (
            !match ||
            !(msg.author.id === Pname || msg.author.id === P2a || msg.author.id === P2a_P) ||
            !chan_arr.includes(msg.channel.id)
        ) {
            return;
        }

        const pingsSection = match[1] || "";
        const sectionMentions = [...pingsSection.matchAll(/<@!?(\d+)>/g)].map(m => m[1]);

        if (sectionMentions.length === 0) {
            return;
        }

        const now = Date.now();
        const cooldownUntil = voteCd.get(msg.channel.id) || 0;
        if (now < cooldownUntil) {
            return;
        }

        voteCd.set(msg.channel.id, now + CHANNEL_COOLDOWN_MS);
        setTimeout(() => voteCd.delete(msg.channel.id), CHANNEL_COOLDOWN_MS);

        const embed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle('Vote for Access!')
            .setURL('https://discords.com/servers/breadland/upvote')
            .setDescription('(You can also [donate](https://discord.com/channels/798460929155137538/1306535193569660948/1306539229244821515) 50k pokecoins to any admin for permanent access.)\n\n-# Use </report:839848847752953873>,  <#1150059225129701416>, OR https://discord.com/channels/798460929155137538/1306535193569660948/1306539229244821515 to report SH steals.');
            //.setFooter({ text: '' })

        setTimeout(async () => {
            try {
                await msg.channel.send({ embeds: [embed] });
            } catch (error) {
                console.error('Error sending embed:', error);
            }
        }, 3000);

    }
};
