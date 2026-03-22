module.exports = {
    name: 'ping',
    async execute(msg, args, client) {
        const latency = Date.now() - msg.createdTimestamp;
        return msg.channel.send(`🏓 **${Math.abs(latency)} ms**.`);
    }
}; 