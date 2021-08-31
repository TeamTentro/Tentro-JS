const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "deploy",
    aliases: ["dep"],
    category: "misc",
    description: "Deploys slash and context menu commands",
    usage: "",
    permissions: "EVERYONE",
    exec: async (client, message, args) => {
        const cmdData = [{
            name: "Delete Message",
            type: "MESSAGE"
        }, {
            name: "Generate 8ball",
            type: "MESSAGE"
        }]
        message.guild.commands.set(cmdData)
    }
}
