const { MessageEmbed } = require('discord.js');
const { settkMessage } = require("../../utils/tk-utils")

module.exports = {
	name: 'tickets',
	aliases: [],
    category: 'Ticket',
    description: 'Do the tycket',
	usage: 'ass',
	permissions: 'DEV',

	exec: async (client, message, args) => {
        
    if (!args[0]) {
          const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Your mom fat xd xd')
          message.channel.send({embeds: [embed]})
    }

    if (args[0]?.toLowerCase() === 'add') {
         
         
          const ticketChannel = await message.guild.channels.create('ticket-channel', {permissionOverwrites: [
            {
                id: message.guild.roles.everyone,
                deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
            }
          ]})
          message.guild.channels.create("Tickets", { type: "GUILD_CATEGORY", position: '1' })
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