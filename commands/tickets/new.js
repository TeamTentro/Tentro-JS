module.exports = {
	name: 'new',
	aliases: [],
    category: 'Ticket',
    description: 'Creates a new ticket.',
	usage: 'new',
	permissions: 'SEND_MESSAGES',
	exec: async (client, message, args, prefix) => {
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('You already have a ticket, please close your existing ticket first before opening a new one!');
		}
		message.guild.channels.create(`ticket-${message.author.username}`, {
				permissionOverwrites: [
					{
						id: message.author.id,
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
					},
					{
						id: message.guild.roles.everyone,
						deny: ['VIEW_CHANNEL'],
					},
					{
						id: message.guild.me,
						allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
					}
				],
				type: 'text',
		}).then(async channel => {
			message.reply(`You have successfully created a ticket! Please click on ${channel} to view your ticket.`);
			channel.send(`Hi ${message.author}, welcome to your ticket! Please be patient, we will be with you shortly. If you would like to close this ticket please run \`t!close\``);
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {
				logchannel.send(`Ticket ${message.author.id} created. Click the following to view <#${channel.id}>`);
			}
		}).catch((
			err => message.reply(`there was an error creating the ticket: ${err}`)
		))
	},
};