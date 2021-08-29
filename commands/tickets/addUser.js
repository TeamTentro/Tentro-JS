module.exports = {
	name: 'adduser',
	aliases: ['au'],
    category: 'Ticket',
    description: 'Adds a user to the ticket.',
	usage: 'adduser',
	permissions: 'ADMINISTRATOR',
	exec: async (client, message, args, prefix) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Hmm, I couldn't find that user! Double check their ID/Mention!`);
			}
			try{
				message.channel.permissionOverwrites.edit(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
					message.channel.send(`Successfully added ${member} to ${message.channel}`);
				}).catch((
					err => message.reply(`there was an error adding the user to the ticket: ${err}`)
				))
			}
			catch(e) {
				return message.channel.send('An error occurred, please try again!');
			}
		}
	},
};