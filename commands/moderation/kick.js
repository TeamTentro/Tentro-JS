const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "kick",
    aliases: ["yeet"],
    category: "moderation",
    description: "Kicks user from the server.",
    usage: "t!kick <member> [reason]",
    permissions: "Kick_Members",
    exec: async (client, message, args) => {
        
        
        if (!message.member.permissions.has("ADMINISTRATOR") && (!message.member.permissions.has("KICK_MEMBERS"))) {return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        }
        let target = message.mentions.members.first() || await message.guild.members.fetch(args[0]) // now we can use member id     
        
        if (!target) return message.reply("Please specify a member!")

        if (target.permissions.has("ADMINISTRATOR")||(target.permissions.has("KICK_MEMBERS"))) return message.channel.send("You cant ban users with your permissions or higher!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        const spectarget = `<@${target.id}>`
        
        // if there is no reason specified
        if (!args[1]) { 
            let targeteduser = await message.guild.members.fetch(target.id)
            let guildname = message.guild.name
            let kickuser = new MessageEmbed()
             .setTitle(`You have been kicked from ${guildname}`)
             .setColor(0xff0000)
             .setTimestamp()
             targeteduser.send({ embeds: [kickuser]})
            targeteduser.kick()
            let kickembed = new MessageEmbed()
             .setTitle("Ban")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${spectarget} has been kicked!`)
            message.channel.send({ embeds: [kickembed]})


         }

        else { // if time is specified
            const specreason = args.slice(1).join(" ")
            let targeteduser = await message.guild.members.fetch(target.id)
            let guildname = message.guild.name
            let kickuser2 = new MessageEmbed()
             .setTitle(`You have been kicked from ${guildname}`)
             .setColor(0xff0000)
             .setTimestamp()
             .setDescription(`Reason: ${specreason}`)
             targeteduser.send({ embeds: [kickuser2]})

            targeteduser.kick({reason: `${specreason}`})
            let kickembed2 = new MessageEmbed()
             .setTitle("Ban")
             .setColor(0xff0000)
             .setTimestamp()
             .setDescription(`${spectarget} has been kicked!\nReason: ${specreason}`)
             message.channel.send({ embeds: [kickembed2]})

        }
            
        
        
        
        
       
            
            
    } // TESTED AND WORKING
            
       
        
}