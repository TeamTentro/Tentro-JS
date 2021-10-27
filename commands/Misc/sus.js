const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "sus",
    aliases: ["sussy"],
    category: "Misc",
    description: "Use the sus'ometer.",
    usage: "t!sus [mention]",
    permissions: "EVERYONE",
    exec: async (client, message, args) => {

        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0])
        const result = Math.floor(Math.random() * 100)
        
        const susMeter = new MessageEmbed()
            .setColor(0xff0000)
            .setTitle("Sus'ometer")
            .setDescription(`${(!target || !args[0]) ? message.author.username : target.user.username} is ${result}% sus`)
            
        message.channel.send({embeds: [susMeter] })
    }
}
