const {MessageEmbed} = require('discord.js')
const discord = require('discord.js');
const { set } = require('lodash');
module.exports = {
    name: "guilds",
    aliases: ["gd"],
    category: "information",
    description: "Check the guilds the bot is currently in.",
    usage: "",
    permissions: "EVERYONE",
    exec: async (client, message) => {
       

        const embed = new MessageEmbed()
        .setColor(0xff0000)
        .setTitle(`These are the servers the bot is currently in (${client.guilds.cache.size}) !`)
        .setDescription(client.guilds.cache.map(guild => `${guild.name} - ID: (${guild.id})`).join('\n')
        
        )
        message.channel.send( {embeds: [embed] });

        
    
        
    }
}


