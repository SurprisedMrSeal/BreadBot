const { P2, Seal } = require('../utils');

module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;

        if (msg.author.id === P2 && msg.content.startsWith("Congratulations ") && msg.content.includes("These colors seem unusual")) {
            setTimeout(() => {
                msg.react("<:sfbread:1221079656334102639>")
                    .catch(error => console.error('Error reacting with custom emoji:', error));

                setTimeout(() => {
                    msg.react("<:sparkles:1221070627738488902>")
                        .catch(error => console.error('Error reacting with custom emoji:', error));

                    setTimeout(() => {
                        msg.react("<:tada:1221070624533905418>")
                            .then(() => {
                                msg.pin()
                                    .catch(error => console.error('Error pinning message:', error));
                            })
                            .catch(error => console.error('Error reacting with celebration emoji:', error));
                    }, 100);
                }, 100);
            }, 100);
        }
    }
}; 