module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;
        if (msg.author.id === "908384747393286174" && msg.embeds.length > 0) {
            const embed = msg.embeds[0];

            if (embed.title && ((embed.title.includes('Rare Catch Detected') && embed.description.includes('caught a level')) || (embed.title.includes('GMAX Catch Detected') && embed.description.includes('caught a level')) || (embed.title.includes('Shiny Catch Detected') && embed.description.includes('caught a level')) || embed.title.includes('No starboard channel set') || embed.title.includes('Customize Starboard Embed!') || embed.title.includes('Hunt Completed'))) {
                msg.delete()
                    .catch(console.error);
            }
        }
    }
};