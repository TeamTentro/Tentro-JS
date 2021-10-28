const {MessageEmbed} = require('discord.js')
const { setPrefix } = require("../../utils/prefix-utils.js")
const {getPrefix} = require("../../utils/prefix-utils.js");

module.exports = {
    name: "setprefix",
    aliases: ["pr"],
    category: "misc",
    description: "Change the prefix of the bot",
    usage: "",
    permissions: "ADMINISTRATOR",
    exec: async (client, message, args) => {
        let newPrefix = args[0]
        const currentPrefix = await getPrefix(message.guild?.id) || GuildPrefix

        if (!newPrefix) {
            return message.channel.send('Couldn\'t detect a valid prefix!')
        }

        if (newPrefix.toLowerCase() === '-default') newPrefix = 't!'

        if (newPrefix.length > 5) {
            return message.channel.send('Prefix must be 5 or less characters!')
        }

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You dont have the required permissions to make this change!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        if (newPrefix === 't!') {
            await message.guild.me.setNickname(``)
        } else {
            await message.guild.me.setNickname(`[${newPrefix}] Tentro`)
        }

        if (currentPrefix === newPrefix) {
            return message.channel.send('That\'s already the bot\'s prefix!')
        }


        setPrefix(message.guild.id, newPrefix)
        message.reply(`Successfully set the prefix to \`${newPrefix}\``)

    }




}