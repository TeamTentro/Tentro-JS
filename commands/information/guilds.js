const {MessageEmbed} = require('discord.js')
const discord = require('discord.js')
module.exports = {
    name: "guilds",
    aliases: ["gd"],
    category: "information",
    description: "Check the guilds the bot is currently in.",
    usage: "",
    permissions: "EVERYONE",
    exec: async (client, message) => {
       
        client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n')
        const embed = new MessageEmbed()
        .setColor(0xff0000)
        .setTitle(client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n')
        
        )
        message.channel.send( {embeds: [embed] });
            
        
        
    }
}


