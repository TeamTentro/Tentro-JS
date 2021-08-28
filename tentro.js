const Discord = require('discord.js')
const config = require('./config.json')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const command = require('./commandhandler')
require('dotenv').config();

client.on('ready', () => {
    console.log('Tentro-JS Officially Deployed To The Rescue!')

    command(client, ['ping', 'test'], message => {
        message.channel.send('pong')
    })
    command(client, 'server', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has ${guild.memberCount} members`)
        })
        
    })
    command(client, 'guilds', message => {
        client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n')
        const embed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle(client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n')
        
        )
        message.channel.send( {embeds: [embed] });
        

    })
})

client.login(process.env.TOKEN)