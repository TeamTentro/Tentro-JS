const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'tickets',
	aliases: [],
    category: 'Ticket',
    description: 'Do the tycket',
	usage: 'ass',
	permissions: 'SEND_MESSAGES',

	exec: async (client, message, args) => {

    if (args[0]?.toLowerCase() === 'add') {
         
         const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Successfully added the ticket utilities to this guild.')
          .setDescription('Check them out at ')
          message.channel.send({embeds: [embed]});
          message.guild.channels.create("ass");
          setTicketReact(message.guild.id, channel.id)
    }

    if (args[0]?.toLowerCase() === 'remove') {
        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Successfully removed the ticket utilities from this guild.')
          
          message.channel.send({embeds: [embed]});
    }
    
    if (!args[0]) {
        const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Your mom fat xd xd')
    }

    }
}