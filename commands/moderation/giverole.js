const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "giverole",
    aliases: ["gr"],
    category: "moderation",
    description: "Gives role to a selected member.",
    usage: "t!giverole <member.mention or member.id> <role.id>",
    permissions: "Ban_Members",
    exec: async (client, message, args) => {
       
        if (!message.member.permissions.has("ADMINISTRATOR")||(!message.member.permissions.has("BAN_MEMBERS"))) return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        if (!args[0]) return message.reply("Please specify a member as the first argument!")
        if (!args[1]) return message.reply("Please specify role id or role mention as second argument")

        let target = message.mentions.members.first() || await message.guild.members.fetch(args[0])
        if(!target) return message.reply("Please specify a member")
        if (target.permissions.has("ADMINISTRATOR")||(target.permissions.has("BAN_MEMBERS"))) return message.channel.send("You cant give roles to users with your permissions or higher!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        
        const role = message.mentions.roles.first() || await message.guild.roles.fetch(args[1])   
        if(!role) return message.reply("Couldn't find the selected role!")
        const rolembed = new MessageEmbed()
            .setTitle('Successfully added role!')
            .setDescription(`Added ${role} to ${target.user.username}`)
            .setColor(0xff0000)
            .setTimestamp()
            message.channel.send({ embeds: [rolembed]})
        await target.roles.add(role)     // EVERYTHING IS WORKING HERE!!!!!!!!!!!!!
    }
}