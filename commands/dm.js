const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { P2, Seal, embedColor } = require('../utils');

module.exports = {
    name: 'dm',
    async execute(msg, args, client) {

        if (!msg.guild) return;
        if (!msg.member.permissions.has(PermissionFlagsBits.ManageGuild) && !msg.member.permissions.has(PermissionFlagsBits.Administrator) && msg.author.id != Seal) {
            return msg.channel.send('❌ You must have the `Manage Server` permission or `Administrator` to use this command.');
        }
        //const args = msg.content.split(' ');
        const userMention = args[0];
        const dmMessage = args.slice(1).join(' ');

        if (!userMention || !dmMessage) {
            return msg.channel.send('Please mention a user and provide a message.');
        }

        const user = msg.mentions.users.first();
        if (!user) {
            return msg.channel.send('Could not find the user. Make sure to mention them properly.');
        }

        try {
            const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle(`__**Message from ${msg.guild.name}:**__`)
                .setURL('https://discord.gg/cBjwFvg6hR')
                .setDescription(dmMessage + `\n\n-# sent by <@${msg.author.id}>`);

            await user.send({ embeds: [embed] });

            msg.channel.send(`Successfully sent a DM to <@${user.id}>.`);
        } catch (error) {
            console.error(error);
            msg.channel.send(`I was unable to send a DM to <@${user.id}>.`);
        }
    }
}; 