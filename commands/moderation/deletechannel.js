const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "deletechannel",
    aliases: ["dc"],
    category: "moderation",
    description: "Delete a selected channel.",
    usage: "",
    permissions: "ADMINISTRATOR",
    exec: async (client, message, args) => {
        const channel = message.mentions.channels.first()
        channel.delete()
        await message.channel.send('Channel has been deleted <:tick:881522045744185364>')
        
    }
}