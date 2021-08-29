const Discord = require('discord.js')
const config = require('./config.json')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const command = require('./commands')
require('dotenv').config();
const { prefix } = require('./config.json')
const fs = require('fs');

client.on('ready', () => {
    console.log('Tentro-JS Officially Deployed To The Rescue!')

    command(client, ['ping', 'test'], message => {
        const embed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle('Pong!')
        .setDescription(`🏓My ping is ${Math.round(client.ws.ping)}ms!`);
        message.channel.send( {embeds: [embed] });
    })
    command(client, 'server', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has ${guild.memberCount} members`)
        })
        
    })
    command(client, 'guilds', message => {
        const guilds = client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n')
        const embed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle('Server list')
        .setDescription(guilds) 
        message.channel.send({embeds: [embed]})
    })
    

    command(client, 'status', message => {
        const content = message.content.replace('!status ', '')
        client.user.setPresence({
            activity: {
                name: {content},
                type: 0
            },  
        })
    })
        
})


client.login(process.env.TOKEN)