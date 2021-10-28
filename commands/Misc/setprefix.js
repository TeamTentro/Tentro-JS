const {MessageEmbed} = require('discord.js')
const { setPrefix } = require("../../utils/prefix-utils.js")

module.exports = {
    name: "setprefix",
    aliases: ["pr"],
    category: "misc",
    description: "Change the prefix of the bot",
    usage: "",
    permissions: "ADMINISTRATOR",
    exec: async (client, message, args) => {
        let newPrefix = args[0]

        if (newPrefix.toLowerCase() === '-default') newPrefix = 't!'

        if (!newPrefix || newPrefix.length > 5) {
            return message.channel.send('Prefix must be under 5 characters!')
        }
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You dont have the required permissions to make this change!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        if (!newPrefix) return message.reply("Couldn't register valid characters.")

        if (newPrefix === 't!') {
            await message.guild.me.setNickname(``)
        } else {
            await message.guild.me.setNickname(`[${newPrefix}] Tentro`)
        }



        setPrefix(message.guild.id, newPrefix)
        message.reply(`Successfully set the prefix to \`${newPrefix}\``)

    }




}