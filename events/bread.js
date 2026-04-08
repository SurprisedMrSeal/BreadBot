module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;
        if (msg.guild.id !== '798460929155137538') return;

        if (msg.content.toLowerCase().includes("bread")) {
            msg.react("🍞")
        }

    }
}; 