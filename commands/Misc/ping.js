const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "ping",
    aliases: ["latency"],
    category: "information",
    description: "Check the latency of the bot.",
    usage: "",
    permissions: "EVERYONE",
    exec: async (client, message, args) => {
        message.channel.send('Pinging...')
        .then(m => {
            const latency = m.createdTimestamp - message.createdTimestamp
            const apiLatency = Math.round(client.ws.ping)
            
       
            const embed = new MessageEmbed()
                .setTitle('Pong!')
                
                .addField('Latency', `\`${latency}\`ms`)
                .addField('API Latency', `\`${apiLatency}\`ms`)
                .setColor('RANDOM')
            
            m.edit({content: null, embeds: [embed]})
       })
    }  

}

