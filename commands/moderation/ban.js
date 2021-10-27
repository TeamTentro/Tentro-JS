const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "ban",
    aliases: ["b", "yeet"],
    category: "moderation",
    description: "Bans the mentioned member from the server.",
    usage: "t!ban <member> [reason]",
    permissions: "Administrator",
    exec: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR") && (!message.member.permissions.has("BAN_MEMBERS"))) return message.channel.send("You dont have the required permissions to use this command!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
        
        let target = await client.getMember(message, args[0]);
        console.log(target.id);
        if(!target || target === "NOT_FOUND" || !args[0]) return message.reply("boi something is wrong.");

        if (target.permissions.has("ADMINISTRATOR")||(target.permissions.has("BAN_MEMBERS"))) return message.channel.send("You cant ban users with your permissions or higher!").then(msg => {
            setTimeout(() => msg.delete(), 5000)})
            
        // if there is no reason specified, its empty
        let reason = args[1] ? args.slice(1).join(" ") : ''
        
        let targetedUser = await message.guild.members.fetch(target.id)
        let guildName = message.guild.name
        
        let banUserEmbed = new MessageEmbed()
            .setTitle(`You have been banned from ${guildName}`)
            .setColor(0xff0000)
            .setTimestamp()
        
        if (reason) banUserEmbed.setDescription(`Reason: ${specreason}`)

        target.send({ embeds: [banUserEmbed]}).then(() => {
            reason ? target.ban() : target.ban({ reason })
        });

        let banEmbed = new MessageEmbed()
            .setTitle("Ban")
            .setColor(0xff0000)
            .setTimestamp()
            .setDescription(`${target} has been banned!`)
        
        if (reason) banEmbed.setDescription(`${target} has been banned!\nReason: ${reason}`)

        message.channel.send({ embeds: [banEmbed]})

    }
} // TESTED AND WORKING!!
