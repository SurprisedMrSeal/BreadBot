const { Pname, P2a, P2a_P, embedColor, Seal } = require('../utils');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) {
            if (
                (message.author.id === P2a || message.author.id === P2a_P) &&
                message.content.trim() === "Shiny Hunt Timer has ended! You can catch the pokémon now!"
            ) {
                try { await message.delete(); } catch { }
                return;
            }

            if (
                message.author.id === Pname &&
                message.embeds.length > 0 &&
                message.embeds[0].description?.includes("Post Tag Timer") &&
                !message.content.includes("Shiny Hunt Pings:")
            ) {
                try { await message.delete(); } catch { }
                return;
            }

        }
    }
};