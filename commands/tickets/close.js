const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'close',
	aliases: [],
    category: 'Ticket',
    description: 'Closes a ticket.',
	usage: 'close',
	permissions: 'SEND_MESSAGES',
	exec: async (client, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			const ticket_member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.permissions.has('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				message.channel.messages.fetch().then(async (messages) => {
					const output = messages.map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).reverse().join('\n');

					let sbin;
					try {
						sbin = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Chat transcript for ${message.channel.name}`,
							description: ' ',
						});
					} catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}
					

                    const embed = new MessageEmbed()
                        .setDescription(`[\`📄 View\`](${sbin.url})`)
                        .setColor('GREEN');
                    ticket_member.user.send({ content: `Here is a transcript of your ticket, please click the link below to vew the transcript`, embeds: [embed] }); 
				}).then(() => {
					try {
						message.channel.permissionOverwrites.edit(ticket_member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send({ content: `Successfully closed ${message.channel}` });
						}).catch((
							err => message.reply(`there was an error closing the ticket: ${err}`)
						))
					}
					catch(e) {
						console.log(e);
						return message.channel.send('An error occurred, please try again!');
					}
				});
			}
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you\'re closing a ticket.');
		}
	},
};