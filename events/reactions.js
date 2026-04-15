module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild || msg.guild.id !== '798460929155137538') return;

        // bread
        if (msg.content.toLowerCase().includes("bread")) {
            msg.react("🍞");
        }

        // plus chain
        const { P2 } = require('../utils');
        if (msg.author.id === P2 && msg.content.startsWith("Congratulations ") && msg.content.includes("+1 Shiny chain!")) {
            setTimeout(() => {
                msg.react("<:fire:1221070620964556840>")
                    .catch(error => console.error('Error reacting with custom emoji:', error));
            }, 50);
        }

        // thanks
        const thanksRegex = /\b(ty|thanks?|thx|thnx|tysm|thank)\b/;
        if (thanksRegex.test(msg.content.toLowerCase()) && !msg.author.bot) {
            setTimeout(() => {
                msg.react("<:heartbread:1189105762182627490>")
                    .catch(error => console.error('Error reacting with emoji:', error));
            }, 50);
        }
    }
};