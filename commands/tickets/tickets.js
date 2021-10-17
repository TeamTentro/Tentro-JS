const { MessageEmbed } = require('discord.js');
const { settkMessage, settkCategory } = require("../../utils/tk-utils")

module.exports = {
	name: 'tickets',
	aliases: ['tk'],
    category: 'Ticket',
    description: 'Do the tycket',
	usage: 'ass',
	permissions: 'DEV',

	exec: async (client, message, args) => {
        
    if (!args[0]) {
          const embed = new MessageEmbed()
             .setTitle('Tentro Ticket System')
             .setDescription('Welcome to tentro\'s brand new ticket system! Bellow you will get more info on the commands.')
             .addFields
             (
                 { name: 'All commands start with t!ticket', value: '\u200B' },
                 { name: 'add', value:'Adds the ticket system to the guild.'},
                 { name: 'remove', value:'Removes the ticket system from the guild.'},
                 { name: 'logs set', value:'Sets a channel where tickets are logged.'},

             )
             .setFooter(`${message.guild.name}`)
             .setColor('RANDOM')
          message.channel.send({embeds: [embed]})
    }

    if (args[0]?.toLowerCase() === 'add') {
         
         
          const ticketChannel = await message.guild.channels.create('ticket-channel', {permissionOverwrites: [
            {
                id: message.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
            }
          ]})
          const tkCategory = await message.guild.channels.create("Tickets", { type: "GUILD_CATEGORY", permissionOverwrites: [
              {
                id: message.guild.roles.everyone,
                deny: ['VIEW_CHANNEL']
              },

              {
                id: message.guild.me.id,
                allow: ['VIEW_CHANNEL']
              }
          ]})
             settkCategory(message.guild.id, tkCategory.id)
          const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Successfully added the ticket utilities to this guild.')
            .setDescription(`check them out at ${ticketChannel.toString()}`)
             message.channel.send({embeds: [embed]});

          const inChannelEmbed = new MessageEmbed()
            .setTitle(`Tickets for ${message.guild.name}`)

          const MessageAA = await ticketChannel.send({embeds: [inChannelEmbed]});
              MessageAA.react('🎫')
              settkMessage(message.guild.id, MessageAA.id)
          
         
          
    }

    if (args[0]?.toLowerCase() === 'remove') {
        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Successfully removed the ticket utilities from this guild.')
          
          message.channel.send({embeds: [embed]});
    }
    
    

    }
}