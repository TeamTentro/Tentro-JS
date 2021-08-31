const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "slowmode",
    aliases: ["sl"],
    category: "moderation",
    description: "Sets slowmode in the current channel.",
    usage: "t!slowmode <duration>",
    permissions: "Manage_Channels",
    exec: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        if (!args[0]) return message.reply("Please specify a number for the slowmode")

// manage messages cause its the perm that makes you immune to slow


        let dur2 = args[0].toString()    
        const duration = dur2.toLowerCase()
        if (duration === 'off') {
            message.channel.setRateLimitPerUser(0)
            message.channel.send("Slowmode is now disabled!")
            return
        }

        if (isNaN(duration)) {
            return message.reply("Please provide a valid number or the word 'off' to turn slowmode off").then(msg => {
                setTimeout(() => msg.delete(), 5000)})
        }
        if (duration > 2880) return message.reply("I can't set the slowmode to that number!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        message.channel.setRateLimitPerUser(duration)
            message.channel.send(`Slowmode is now ${duration}!`)

    }

}