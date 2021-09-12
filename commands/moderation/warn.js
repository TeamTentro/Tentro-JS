const {MessageEmbed} = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: "warn",
    aliases: ["b"],
    category: "moderation",
    description: "Warns user.",
    usage: "t!warn <member> [reason]",
    permissions: "Manage Messages",
    exec: async (client, message, args) => {
        try {

            if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
    
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
            if (!args[0]) return message.reply("Please specify a user to warn")
    
            if (user.permissions.has('MANAGE_MESSAGES') && !message.member.permissions.has('ADMINISTRATOR')) return message.reply("You cannot warn users with the same perms");
    
            let reason = args.splice(1).join(' ');
            if (!reason) reason = "No reason specified"
    
            let amount = 1
    
            db.add(`cases_${message.guild.id}`, amount);
    
            let cases = db.fetch(`cases_${message.guild.id}`)
    
            let data = {
                staff: `\n**Case ${cases}**\nModerator: <@${message.author.id}>\nType: Warn\nReason: ${reason}`,
            }
    
            db.push(`logsdb_${message.guild.id}_${user.id}`, data)
    
            let embed = new MessageEmbed()
                .setTitle(`Case Number ${cases}`)
                .setDescription(`${user} has been warned`)
                .setColor("GREEN")
    
            message.channel.send({ embeds: [embed] })
    
    
        } catch (e) { 
            console.log(e)
        }
    }
}
