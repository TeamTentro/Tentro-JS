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
            .addField('Status', `${getStatusEmoji(member)} | ${member.presence?.status || 'Offline'}`)
            .addField('Activity', activity ? activity.type + ' ' + activity.name : 'None')
            .addField('Created At', new Date(member.user.createdTimestamp).toUTCString())
            .addField('Joined At', new Date(member.joinedTimestamp).toUTCString())

        message.channel.send({ embeds: [embed] })
    }
}

function getStatusEmoji(member) {
    const onlineEmoji = '<:online:890248532173393940>'
    const idleEmoji = '<:idle:890248898868826143>'
    const dndEmoji = '<:DND:890248671193600020>'
    const offlineEmoji = '<:offline:890248794506154046>'
    
    if (!member.presence) return offlineEmoji

    switch (member.presence.status) {
        case 'online':
            return onlineEmoji

        case 'idle':
            return idleEmoji

        case 'dnd':
            return dndEmoji

        default:
            return offlineEmoji
    }
}