const {MessageEmbed} = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: "docs",
    aliases: ["documentation"],
    category: "information",
    description: "READ THE DOCS READ THE DOCS",
    usage: "t!docs",
    permissions: "EVERYONE",
    exec: async (client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
                    new MessageButton()
                            .setLabel('📄 Discord.js docs')
                            .setStyle('LINK')
                            .setURL('https://discord.js.org/#/docs/main/stable')
        );
        const embed = new MessageEmbed()
            .setTitle('Discords.js docs')
            .setDescription('Click the button below to access the discord.js docs.')
            .setColor('RANDOM')
            
            

        await message.channel.send({ embeds: [embed], components: [row] })

  }
}
