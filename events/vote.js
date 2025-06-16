const { EmbedBuilder } = require('discord.js');
const { Pname, embedColor, Seal } = require('../utils');

module.exports = {
    name: 'messageCreate',
    async execute(msg, client) {
        if (!msg.guild) return;

        if ((msg.content.startsWith("**✨Shiny Hunt Pings:** ") || msg.content.startsWith("**✨ Shiny Hunt Pings:** ")) &&
            msg.author.id === Pname && ["1134437058866327573", "1134439206702284801", "1175112915242713138", "915991336577007647", "787880836225040427"].includes(msg.channel.id)
            && msg.mentions.users.size) {
            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle('Vote for Access!')
                .setURL('https://discords.com/servers/breadland/upvote')
                .setDescription('(You can also donate 10k pokecoins to any admin for permanent access.)')
                .setFooter({ text: 'Someone stole your hunt? Just say "steal" or "report" and follow the instructions.'});

            msg.channel.send({embeds: [embed] })
                .catch(error => console.error('Error sending embed:', error));
        }

    }
}; 