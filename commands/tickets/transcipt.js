const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'transcript',
	aliases: [],
    category: 'Ticket',
    description: 'Transcribes a ticket.',
	usage: 'transcript',
	permissions: 'SEND_MESSAGES',
	exec: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.permissions.has('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
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
							title: `Chat transcript for ${channel.name}`,
							description: ' ',
						});
					} catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}

					const embed = new MessageEmbed()
						.setDescription(`**Here's your freshly baked transcript for ${channel.name}!\n[\📄 View\](${sbin.url})**`)
						.setColor('GREEN');
					message.reply({ content: 'The transcript is complete. Please click the link below to view the transcript', embeds: [embed] });
				});
			} else {
				message.reply('you do not have the required permissions to execute this command! (You do not own this ticket and are not an admin, due to security reasons, only the 2 aforementioned people can transcribe a ticket.)')
			}
		}
		else {
			return message.reply(
				'you cannot use this command here. Please use this command in a open ticket.',
			);
		}
	},
};