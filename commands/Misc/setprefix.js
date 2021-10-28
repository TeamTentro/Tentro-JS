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
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply("You dont have the required permissions to make this change!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        if (!args[0]) return message.reply("Couldn't register valid characters.")



        setPrefix(message.guild.id, (args[0]))
        message.reply("Successfully changed prefix!")

    }




}