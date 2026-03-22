const { PermissionFlagsBits } = require('discord.js');
const { P2, Seal } = require('../utils');

module.exports = {
    name: 'lock',
    aliases: ['l'],
    async execute(msg, args, client) {

        if (!msg.guild) return;
        if (!msg.member.permissions.has(PermissionFlagsBits.ManageGuild) && !msg.member.permissions.has(PermissionFlagsBits.Administrator) && msg.author.id != Seal) {
            return msg.channel.send('❌ You must have the `Manage Server` permission or `Administrator` to use this command.');
        }
        try {
            const channel = msg.channel;
            const targetMember = await msg.guild.members.fetch(P2);
            const userPermissions = channel.permissionOverwrites.cache.get(targetMember.id);

            if (userPermissions && userPermissions.deny.has(PermissionFlagsBits.ViewChannel)) {
                return msg.channel.send('This channel is already locked.');
            }
            if (userPermissions) {
                await channel.permissionOverwrites.edit(targetMember, { ViewChannel: false, SendMessages: false });
            } else {
                await channel.permissionOverwrites.create(targetMember, { ViewChannel: false, SendMessages: false });
            }

            await msg.channel.send(`This channel has been locked. Ask an admin to unlock.`);
        } catch (error) {
            console.error('Error in lock command:', error);
            return msg.channel.send('Hmm, something prevented me from locking this channel.')
                .catch(error => console.error('Error sending lock error message:', error));
        }
    }
}; 