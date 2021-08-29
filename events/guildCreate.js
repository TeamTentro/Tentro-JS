const {MessageEmbed} = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = async (client, guild) => {
        console.log("Joined a new guild: " + guild.name);
        const tentroGuild = client.guilds.cache.get('745925853229350972')
        
        const traffic = new MessageEmbed()
         .setTitle("**Guild Added**")
         .setDescription(`Tentro has been added to ${guild.name} (${guild.id})`)
         .addField("Members: ", guild.memberCount.toString())
         .setImage(guild.iconURL())
         .setColor(0xff0000)
         const invite = (await guild.invites.fetch()).first()
         console.log(invite)
         const row = new MessageActionRow()
	.addComponents(
                new MessageButton()
                        .setLabel('Join Server (WIP)')
                        .setStyle('LINK')
                        .setURL(invite.url || 'https://discord.gg/')
	);
         console.log(invite.url)
         trafChannel = await tentroGuild.channels.fetch('871434839323213844')
         trafChannel.send({ embeds: [traffic], components: [row] })
         
}