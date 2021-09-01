const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "unban",
    aliases: ["ub"],
    category: "moderation",
    description: "Unbans user from the server.",
    usage: "t!unban <member>",
    permissions: "Ban_Members",
    exec: async (client, message, args) => {
        
        
        if (!message.member.permissions.has("ADMINISTRATOR") && (!message.member.permissions.has("BAN_MEMBERS"))) {return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        }
        await client.users.fetch(args[0]) // now we can use member id     
        
        if (!args[0]) return message.reply("Please specify a member!")

        const spectarget = `<@${target}>`
        try {
            message.guild.members.unban(target)
            message.channel.send(`${spectarget} has been unbanned!`)
        } catch (err) {
            console.log('Error: ' + err) 
            return message.reply("There was a problem with the command!")
        }
        
        
        
        
       
            
            
    } 
            
       
        
}