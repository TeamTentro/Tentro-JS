const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "kick",
    aliases: ["k"],
    category: "moderation",
    description: "Kicks user from the server.",
    usage: "",
    permissions: "Kick_Members",
    exec: async (client, message, args) => {
        
        const {member, mentions} = message
        const tag = `<@${member.id}>`
        if (!message.member.permissions.has("ADMINISTRATOR")||(!message.member.permissions.has("KICK_MEMBERS"))) return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) // now we can use member id     
        
        if (!target) return message.reply("Please specify a member to be kicked!")

        if (target.permissions.has("ADMINISTRATOR")||(target.permissions.has("KICK_MEMBERS"))) return message.channel.send("You cant ban users with your permissions or higher!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})

        const spectarget = `<@${target.id}>`
// if there is no reason specified
        if (!args[1]) { 
            let targeteduser = message.guild.members.cache.get(target.id)
            targeteduser.kick()
            let banembed = new MessageEmbed()
             .setTitle("Kick")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${spectarget} has been kicked!`)
            message.channel.send({ embeds: [banembed]})
           

        }

        else { // if time is specified
            let specreason = args.slice(1).join(" ")
            let targeteduser = message.guild.members.cache.get(target.id)
            targeteduser.kick({reason: `${specreason}`})
            let banembed = new MessageEmbed()
             .setTitle("Kick")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${spectarget} has been kicked!\nReason: ${specreason}`)
            message.channel.send({ embeds: [banembed]})
            
        }
            
        
        
        
        
       
            
            
        }
            
       
        
}