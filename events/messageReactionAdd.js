const GuildSchema = require("../database/Schema/Guild");
module.exports = async (client, reaction,  user) => {
    const guildData = await GuildSchema.findOne({ id: reaction.message.guild.id})
    
    console.log(guildData?.tkMessage)
    
    if (reaction.message.id !== guildData?.tkMessage) return
    
    await reaction.message.guild.channels.create(`ticket-${user.id}`)
   
    
}