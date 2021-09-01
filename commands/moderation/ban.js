const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "ban",
    aliases: ["b"],
    category: "moderation",
    description: "Bans user from the server.",
    usage: "t!ban <member> [reason]",
    permissions: "Ban_Members",
    exec: async (client, message, args) => {
        
        
        if (!message.member.permissions.has("ADMINISTRATOR") && (!message.member.permissions.has("BAN_MEMBERS"))) {return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        }
        let target = message.mentions.members.first() || await message.guild.members.fetch(args[0]) // now we can use member id     
        
        if (!target) return message.reply("Please specify a member for ban!")

        if (target.permissions.has("ADMINISTRATOR")||(target.permissions.has("BAN_MEMBERS"))) return message.channel.send("You cant ban users with your permissions or higher!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        const spectarget = `<@${target.id}>`
        let specreason = args.slice(1).join(" ")
        // if there is no reason specified
        if (!args[1]) { 
            let targeteduser = await message.guild.members.fetch(target.id)
            let guildname = message.guild.name
            let banuser = new MessageEmbed()
             .setTitle(`You have been banned from ${guildname}`)
             .setColor(0xff0000)
             .setTimestamp()
             targeteduser.send({ embeds: [banuser]})
            targeteduser.ban()
            let banembed = new MessageEmbed()
             .setTitle("Ban")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${spectarget} has been banned!`)
            message.channel.send({ embeds: [banembed]})


         }

        else { // if time is specified
            const specreason = args.slice(1).join(" ")
            let targeteduser = await message.guild.members.fetch(target.id)
            let guildname = message.guild.name
            let banuser = new MessageEmbed()
             .setTitle(`You have been banned from ${guildname}`)
             .setColor(0xff0000)
             .setTimestamp()
             .setDescription(`Reason: ${specreason}`)
             targeteduser.send({ embeds: [banuser]})

            targeteduser.ban({reason: `${specreason}`})
            let banembed = new MessageEmbed()
             .setTitle("Ban")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${spectarget} has been banned!\nReason: ${specreason}`)
            message.channel.send({ embeds: [banembed]})

        }
            
        
        
        
        
       
            
            
    } // TESTED AND WORKING!!
            
       
        
}
