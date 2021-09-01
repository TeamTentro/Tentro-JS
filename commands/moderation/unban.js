const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "unban",
    aliases: ["ub"],
    category: "moderation",
    description: "Unbans user from the server.",
    usage: "t!unban <member>",
    permissions: "Administrator",
    exec: async (client, message, args) => {


        try {
            const target = await message.guild.members.unban(args[0])
            message.channel.send(`${target} (${target.username}#${target.discriminator}) has been unbanned!`)
        } catch (err) {
            console.log('Error: ' + err)
            return message.reply("This ban doesn't exist.")
        }


    }



}
