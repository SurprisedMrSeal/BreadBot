const { P2, Seal } = require('../utils');

module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;

        if (msg.author.id === P2 && msg.content.startsWith("Congratulations ") && msg.content.includes("+1 Shiny chain!")) {
            setTimeout(() => {
                msg.react("<:fire:1221070620964556840>")
                    .catch(error => console.error('Error reacting with custom emoji:', error));
            }, 100);
        }

    }
}; 