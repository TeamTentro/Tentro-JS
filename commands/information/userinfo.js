const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'whois'],
    category: 'information',
    description: 'Shows the info of the user',
    usage: '',
    permissions: 'EVERYONE',
    exec: async (client, message, args) => {
        let member = await client.getMember(message, args[0])

        if (!args[0] || member == 'NOT_FOUND') member = message.member || await message.guild.members.fetch(message.author.id)
        
        const activity = member.presence?.activities[1]

        const embed = new MessageEmbed()
            .setTitle('User Info')
            .setColor(0xFF0000)
            .addField('Name', member.user.username)
            .addField('ID', member.id)
            .addField('isBot', `${member.user.bot}`)
            .addField('Status', member.presence?.status || 'Offline')
            .addField('Activity', activity ? activity.type + ' ' + activity.name : 'None')
            .addField('Created At', member.user.createdAt.toString())
            .addField('Joined At', member.joinedAt.toString())

        message.channel.send({ embeds: [embed] })
    }
}