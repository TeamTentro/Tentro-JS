const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');
const { clean } = require('../../utils/HelperTools');

module.exports = {
	name: "eval",
    aliases: ["ev"],
    category: "dev",
    description: "Evaluate arbitrary code.",
    usage: "",
    permissions: "Bot dev",
	exec: async (client, message, args) => {
		const embed = new MessageEmbed()
			.addField('Input', '```js\n' + args.join(' ') + '```');


		const code = args.join(' ');
		if (!code) {
			return message.channel.send(
				':x: Please provide valid code to evaluate.',
			);
		}

		const words = ['secret', 'token', 'process.env', 'config.json', 'fs', 'ip', 'f'];
		for(const word of words) {
			if (code.replace('\\', '').toLowerCase().includes(word)) {
				embed.setTitle('Error!');
				embed.addField('Output', '```Nice try dumbfuck! What you gonna do with it?```').setColor('GREEN');
				return message.channel.send({ embeds: [embed] });
			}
		}

		try {
			const evaled = eval(code);
			const output = clean(evaled);
			if (output.length >= 1024) {
				let response;
				try {
					response = await sourcebin.create([
						{
							name: ' ',
							content: output,
							languageId: 'text',
						},
					], {
						title: 'Eval results',
						description: ' ',
					});
				}
				catch(e) {
					return message.reply('An error occurred, please try again!');
				}

				embed.addField('Output', `${response.url}`).setColor('GREEN');
			}
			else {
				embed.addField('Output', `\`\`\`js\n${output}\`\`\``).setColor('GREEN');
			}

			embed.setTitle('Success!');
			return message.channel.send({ embeds: [embed] });

		}
		catch (error) {
			const err = clean(error);
			if (err.length >= 1024) {
				let response;
				try {
					response = await sourcebin.create([
						{
							name: ' ',
							content: err,
							languageId: 'text',
						},
					], {
						title: 'Eval results',
						description: ' ',
					});
				}
				catch(e) {
					return message.channel.send('An error occurred, please try again!');
				}

				embed.addField('Output', `${response.url}`).setColor('RED');
			}
			else {
				embed.addField('Output', `\`\`\`js\n${err}\`\`\``).setColor('RED');
			}

			embed.setTitle('Error!');
			return message.channel.send({ embeds: [embed] });
		}
	},
};