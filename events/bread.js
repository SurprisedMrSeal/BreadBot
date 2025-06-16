module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;

        if (msg.content.toLowerCase().includes("bread")) {
            setTimeout(function () {
                msg.react("🍞")
            }, 100)
        }

    }
}; 