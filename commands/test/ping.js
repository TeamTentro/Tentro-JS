const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "ping",
    aliases: ["latency"],
    category: "information",
    description: "Check the latency of the bot.",
    usage: "",
    permissions: "EVERYONE",
    exec: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle(':ping_pong: Pong!')
            .setColor('RANDOM')
            .addFields({
                    name: 'Latency:',
                    value: Date.now() - message.createdTimestamp
                },
                {
                    name: 'API Latency:',
                    value: Math.round(client.ws.ping)
                })

        await message.channel.send({embeds: [embed]})
    }
}
