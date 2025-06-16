const { Events, PermissionsBitField } = require('discord.js');
const { Seal } = require('../utils');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const accountAgeMs = Date.now() - member.user.createdTimestamp;
        const eightDaysMs = 8 * 24 * 60 * 60 * 1000;
        const logChannel = member.guild.channels.cache.get("915991336577007647");

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
                console.log(`Kicked ${member.user.tag} for being underage.`);
                logChannel.send(`Kicked ${member.user.tag} for being underage.`);
            } catch (err) {
                console.error(`Failed to kick ${member.user.tag}:`, err);
                logChannel.send(`Failed to kick ${member.user.tag}`);
            }
        }
    },
};
