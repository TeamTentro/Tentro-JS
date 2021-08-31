const {MessageEmbed} = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: "docs",
    aliases: ["documentation"],
    category: "information",
    description: "read the docs",
    usage: "t!docs",
    permissions: "EVERYONE",
    exec: async (client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
                    new MessageButton()
                            .setEmoji('📄')
                            .setLabel('discord.js docs')
                            .setStyle('LINK')
                            .setURL('https://discord.js.org/#/docs/main/stable')
        );
        const embed = new MessageEmbed()
            .setTitle('discord.js docs')
            .setDescription('Click the button below to access the discord.js docs.')
            .setColor('GREEN')
            
            

        await message.channel.send({ embeds: [embed], components: [row] })

  }
}
