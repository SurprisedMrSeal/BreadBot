const { PermissionFlagsBits } = require('discord.js');
const { P2, Seal } = require('../utils');

module.exports = {
    name: 'unlock',
    aliases: ['ul', 'u'],
    async execute(msg, args, client) {

        if (!msg.guild) return;
        if (!msg.member.permissions.has(PermissionFlagsBits.ManageGuild) && !msg.member.permissions.has(PermissionFlagsBits.Administrator) && msg.author.id != Seal) {
            return msg.channel.send('❌ You must have the `Manage Server` permission or `Administrator` to use this command.');
        }
        try {
            const channel = msg.channel;
            const targetMember = await msg.guild.members.fetch(P2);
            const overwrite = channel.permissionOverwrites.cache.get(targetMember.id);
            if (!overwrite || !overwrite.deny.has(PermissionFlagsBits.ViewChannel)) {
                return msg.channel.send('This channel is already unlocked.');
            }
            await channel.permissionOverwrites.edit(targetMember.id, { ViewChannel: true, SendMessages: true });

            await msg.channel.send(`This channel has been unlocked.`);
        } catch (error) {
            console.error('Error in unlock command:', error);
            return msg.channel.send('Hmm, something prevented me from unlocking this channel.')
                .catch(error => console.error('Error sending unlock error message:', error));
        }
    }
}; 