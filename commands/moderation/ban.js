const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "ban",
    aliases: ["b"],
    category: "moderation",
    description: "Bans user from the server.",
    usage: "",
    permissions: "Ban_Members",
    exec: async (client, message, args) => {
        
        const {member, mentions} = message
        const tag = `<@${member.id}>`
        if (!message.member.permissions.has("ADMINISTRATOR")||(!message.member.permissions.has("BAN_MEMBERS"))) return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) // now we can use member id     
        
        if (!target) return message.reply("Please specify a member for ban!")

        if (target.permissions.has("ADMINISTRATOR")||(target.permissions.has("BAN_MEMBERS"))) return message.channel.send("You cant ban users with your permissions or higher!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        const spectarget = `<@${target.id}>`
// if there is no reason specified
        if (!args[1]) { 
            let targeteduser = message.guild.members.cache.get(target.id)
            targeteduser.ban()
            let banembed = new MessageEmbed()
             .setTitle("Ban")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${spectarget} has been banned!`)
            message.channel.send({ embeds: [banembed]})


        }

        else { // if time is specified
            let specreason = args.slice(1).join(" ")
            let targeteduser = message.guild.members.cache.get(target.id)
            targeteduser.ban({reason: `${specreason}`})
            let banembed = new MessageEmbed()
             .setTitle("Ban")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${spectarget} has been banned!\nReason: ${specreason}`)
            message.channel.send({ embeds: [banembed]})

        }
            
        
        
        
        
       
            
            
        }
            
       
        
}
