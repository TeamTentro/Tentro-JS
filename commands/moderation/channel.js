const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "channel",
    aliases: [""],
    category: "moderation",
    description: "Deletes or creates a channel.",
    usage: "",
    permissions: "Manage Messages",
    exec: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("You dont have the required permissions to use this command!")
        
        if(args[0] === "create") {
            const channel = args.slice(1).join(" ")
            let currentCategoryID = message.channel.parent.id
            if(!channel) return message.channel.send("Please specify a channel name to be created!")
            message.guild.channels.create(`${channel}`, { type: 'text', parent: `${currentCategoryID}` });
            message.channel.send("Successfully created channel ") 
            
        };
            
        if(args[0] === "delete") {
            const channel = message.mentions.channels.first()
            if(!channel) return message.channel.send("Please specify a channel name to be deleted!")
            channel.delete()
            await message.channel.send('Channel has been deleted <a:ticktentro:881535612312756276>')
            
        }
        
    }
}