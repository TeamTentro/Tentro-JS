const { MessageEmbed} = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');
const GuildSchema = require("../database/Schema/Guild");
module.exports = async (client, reaction,  user) => {
    const guildData = await GuildSchema.findOne({ id: reaction.message.guild.id})
    if (user.bot) return

    
    
    if (reaction.message.id !== guildData?.tkMessage) return
    reaction.users.remove(user)
    const userticket = await reaction.message.guild.channels.create(`ticket-${user.id}`, {permissionOverwrites: [
        {
            id: user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        },
        {
            id: reaction.message.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
        },
        {
            id: reaction.message.guild.me.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
        }
    ]})
    const row = new MessageActionRow()
        .addComponents(
           
            new MessageButton()
                    .setCustomId('claim')
                    .setLabel('📄 Claim')
                    .setStyle('SUCCESS'),
                    
            new MessageButton()
                    .setCustomId('delete')
                    .setLabel('🗑️ Delete')
                    .setStyle('DANGER'),
                    
            new MessageButton()
                    .setCustomId('lock')
                    .setLabel('🔒 Lock')
                    .setStyle('SECONDARY')
                    

        );
        const embed = new MessageEmbed()
            .setTitle('Ticket utils (staff only)')
            .addFields(
                { name: '📄 Claim the Ticket!', value: 'Claim the ticket so that the other supporters know that it is already being processed.' },
                { name: '🗑️ Delete the ticket!', value: 'Delete the current ticket.'},
                { name: '🔒 Lock the Ticket!', value: 'Lock the ticket from the person who has opened it.'},
            )
            .setColor('RANDOM')
            
            

        

        client.on('interactionCreate', async (interaction) => {
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (interaction.channel.name.startsWith('ticket-')) { 
                console.log(member.permissions)
                if (!member.permissions.has('BAN_MEMBERS')) return interaction.reply('u stink')
                  if (!interaction.isButton()) return
                  switch (interaction.customId) {
                      case "claim":
                          userticket.setName(`claimed-${user.id}`)
                          return interaction.reply("El ticket has been claimed")
                  }
            } else if (interaction.channel.name.startsWith('claimed-')) {
                if (!member.permissions.has('BAN_MEMBERS')) return interaction.reply('u stink')
                  if (!interaction.isButton()) return
                  switch (interaction.customId) {
                      case "claim":
                          return interaction.reply("This ticket is already claimed!")
                  }
             
            }
        })


        client.on('interactionCreate', async (interaction) => {
            const member = await interaction.guild.members.fetch(interaction.user.id)
            if (interaction.channel.name.startsWith('ticket-')) { 
                console.log(member.permissions)
                if (!member.permissions.has('BAN_MEMBERS')) return interaction.reply('u stink')
                  if (!interaction.isButton()) return
                  switch (interaction.customId) {
                      case "delete":
                        interaction.reply('Le channel will be deleted eu 5 secundas')
                        setTimeout(async() => { await interaction.channel.delete() }, 5000) 
                        return
                  }
            } else if (interaction.channel.name.startsWith('claimed-')) {
                if (!member.permissions.has('BAN_MEMBERS')) return interaction.reply('u stink')
                  if (!interaction.isButton()) return
                  switch (interaction.customId) {
                      case "delete":
                          interaction.reply('Le channel will be deleted eu 5 secundas')
                          setTimeout(async() => { await interaction.channel.delete() }, 5000) 
                          return
                  }
            }
        })
        client.on('interactionCreate', (interaction) => {
            
              if (!interaction.isButton()) return
              switch (interaction.customId) {
                  case "lock":
                      interaction.reply("Locked da ticket")
            }
        })
        
        await userticket.send(`Hey there ${user}, the staff team will be with you shortly. Please provide a reason for your ticket`)
        await userticket.send({ embeds: [embed], components: [row] })
    
}