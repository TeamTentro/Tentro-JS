const {MessageEmbed} = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: "github",
    aliases: ['gh'],
    category: "information",
    description: "Check out the bot\'s github repository!",
    usage: "",
    perrmissions: "EVERYONE",
    
    exec: async (client, message) => {
      
       const row = new MessageActionRow()
       .addComponents(
          
           new MessageButton()
                   
                   .setLabel('GitHub')
                   .setStyle('LINK')
                   .setURL('https://discord.js.org/#/docs/main/stable/general/welcome')

       )
       const embed = new MessageEmbed()
         .setTitle('Tentro\'s github repository')
         .setDescription('Check out Tentro\'s github repo by clicking on the button bellow')
         .setColor('RANDOM')

        message.channel.send({ embeds: [embed], components: [row] })


    }


}