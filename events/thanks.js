module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;
        if (msg.guild.id !== '798460929155137538') return;

        const thanksRegex = /\b(ty|thanks?|thx|thnx|tysm|thank)\b/;
        if (thanksRegex.test(msg.content.toLowerCase()) && !msg.author.bot) {

            setTimeout(() => {
                msg.react("<:heartbread:1189105762182627490>")
                    .catch(error => console.error('Error reacting with emoji:', error));
            }, 100);
        }

    }
}; 