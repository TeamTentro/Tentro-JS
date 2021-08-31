const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "slowmode",
    aliases: ["sl", "slow"],
    category: "moderation",
    description: "Changes the slowmode in the current channel, or shows the current slowmode if no arguments are provided.",
    usage: "t!slowmode [duration | off | max]",
    permissions: "MANAGE_MESSAGES",
    exec: async (client, message, args) => {
        function parseSlowmode(slowmode) {
            const hours = Math.trunc(slowmode/3600)
            const minutes = Math.trunc(slowmode/60)
            const seconds = slowmode % 60
            return slowmode > 0 
                ? `${hours > 0 ? hours > 1 ? `${hours} hours` : `${hours} hour` : ``}` +
                  `${hours > 0 && minutes > 0 ? `, ` : ``}` +
                  `${minutes > 0 ? minutes > 1 ? `${minutes} minutes` : `${minutes} minute` : ``}` +
                  `${minutes > 0 && seconds > 0 ? `, ` : ``}` +
                  `${seconds > 0 ? seconds > 1 ? `${seconds} seconds` : `${seconds} second` : ``}`
                : `disabled`
        }


        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }

        switch (args[0]) {
            case "off": {
                message.channel.setRateLimitPerUser(0)
                message.channel.send("Slowmode in this channel is now disabled!")
                break
            }


            case "max": {
                message.channel.setRateLimitPerUser(21600)
                message.channel.send("Slowmode in this channel is now 6 hours!")
                break
            }

            case undefined: {
                const slowmode = parseSlowmode(message.channel.rateLimitPerUser)
                message.channel.send(`The slowmode in this channel is currently ${slowmode}`)
                break
            } 

            default: {
                const duration = parseInt(args[0], 10)
                if (isNaN(duration) || duration < 0 || duration > 21600) {
                    message.channel.send("Invalid duration! Please enter a valid duration between 0 and 21600 (6 hours), or the keywords \`off\` or \`max\`").then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })
                    break
                }

                message.channel.setRateLimitPerUser(duration).then(channel => {
                    const slowmode = parseSlowmode(channel.rateLimitPerUser)
                    channel.send(`Slowmode in this channel is now ${slowmode}!`)
                })
                break
            }
        }
    }
}