const { Events, PermissionsBitField } = require('discord.js');
const { Seal } = require('../utils');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        if (msg.guild.id !== '798460929155137538') return;

        const accountAgeMs = Date.now() - member.user.createdTimestamp;
        const eightDaysMs = 8 * 24 * 60 * 60 * 1000;
        const logChannel = member.guild.channels.cache.get("1493419674791186483");

        if (accountAgeMs < eightDaysMs) {
            try {
                await member.send(
                    `Hi ${member.user.username}, your account is not old enough to join **${member.guild.name}**.
                    \n\nDM <@${Seal}> if you would like to dispute or think this is incorrect!`
                );
            } catch (err) {
                console.warn(`Couldn't DM ${member.user.tag}.`);
            }

            try {
                await member.kick('Account age is less than 8 days');
                console.log(`Kicked ${member.user.tag}, account not old enough.`);
                logChannel.send(`Kicked ${member.user.tag}, account not old enough.`);
            } catch (err) {
                console.error(`Failed to kick ${member.user.tag}:`, err);
                logChannel.send(`Failed to kick ${member.user.tag}`);
            }
        }
    },
};
