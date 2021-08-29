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
            .addField("API Latency", `${message.createdAt - Date.now()}`, true)
            .addField("Bot Latency", `${client.ws.ping}`, true)

        await message.channel.send({embeds: [embed]})
    }
}
