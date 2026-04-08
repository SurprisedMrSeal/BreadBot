const { EmbedBuilder } = require('discord.js');
const { P2, Pname, P2a, P2a_P, embedColor, Seal } = require('../utils');

const chan_arr = [
    "1149815313827901520", "854984157838573579", "854984157838573583", "854984157838573584",
    "884466734050984016"
];

const Cd = new Map();
const CHANNEL_COOLDOWN_MS = 15000;
const shTimer = 120000;
const activeTimers = new Map();

const shinyHuntPingsSectionRegex = /(?:\*\*✨?\s*Shiny Hunt Pings:\*\*|Shiny hunt pings:)([\s\S]*?)(?=\*\*|Collection|Type|Quest|$)/i;

module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;
        if (msg.channelId === '854986991720071178') return;

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
        const cooldownUntil = Cd.get(msg.channel.id) || 0;
        if (now < cooldownUntil) {
            return;
        }

        Cd.set(msg.channel.id, now + CHANNEL_COOLDOWN_MS);
        setTimeout(() => Cd.delete(msg.channel.id), CHANNEL_COOLDOWN_MS);

        const currentTime = Math.floor(Date.now() / 1000);
        const FFAin = currentTime + (shTimer / 1000);

        let sentMsg;
        try {
            const fetchedMsg = await msg.channel.messages.fetch(msg.id).catch(() => null);
            if (!fetchedMsg) {
                console.error(`Could not fetch message ${msg.id} before replying.`);
                return;
            }

            sentMsg = await fetchedMsg.reply(`⏳ Shinyhunt Timer ends <t:${FFAin}:R>.`);
        } catch (err) {
            if (err.code === 50035) {
                console.error(`Reply failed (unknown message reference) for ${msg.id}, falling back to channel.send()`);
                sentMsg = await msg.channel.send(`⏳ Shinyhunt Timer ends <t:${FFAin}:R>.`);
            } else {
                console.error('Error sending SH timer:', err);
                return;
            }
        }

        if (!sentMsg) return;

        // Create an object to track this channel's timer state
        const timerState = { cancelled: false };
        activeTimers.set(msg.id, timerState);

        // Listen for spawn message from P2 to cancel timer
        const collector = msg.channel.createMessageCollector({
            filter: m =>
                m.author.id === P2 &&
                m.embeds.length > 0 &&
                m.embeds[0].title &&
                /wild pokémon has appeared!/i.test(m.embeds[0].title),
            time: shTimer
        });

        collector.on('collect', async () => {
            timerState.cancelled = true;
            collector.stop();
            try {
                await sentMsg.edit("⏳ Shinyhunt Timer Cancelled.\n-# A new pokémon has spawned.");
            } catch (err) {
                console.error("Error editing message to cancel:", err);
            }
        });

        setTimeout(async () => {
            if (timerState.cancelled) return; // Skip end message + deletion if cancelled

            try {
                await msg.reply("⌛ Shinyhunt Timer has ended. You can catch the pokémon now!");
                await sentMsg.delete();
            } catch (err) {
                console.error("Error deleting and/or sending follow-up:", err);
            }
        }, shTimer - 1200);
    }
};