const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'support',
    aliases: ['server', 'ss'],
    category: 'information',
    usage: '',
    permissions: 'EVERYONE',
    exec: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle('Support Server')
            .setDescription('Want to give ideas or contribute for tentro? Need a helping hand? Join our [Official Support Server](https://discord.gg/bQqWb3Yhgj)!') 
            .setColor(0xFF0000)
        
        message.channel.send({embeds: [embed]})
    }
}