const {MessageEmbed} = require('discord.js')
module.exports = {
    name: "8ball",
    aliases: [""],
    category: "Misc",
    description: "Ask any question to the bot!.",
    usage: "t!8ball <question>",
    permissions: "EVERYONE",
    exec: async (client, message, question) => {
        const responses = ["Definitely.", "It is certain", "Does 2 + 2 equal to 4?", "I don't think so chief.",
        "Perhaps.",
        "Maybe, ehhh don't take my word for it.",
        "Ask again.",
        "How do you not know this.", "I don't know, I'm just a Discord Bot.",
        "No clue bro.",
        "Uhhh not sure about the answer to that one.", "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.", "My sources say yes."]
        if (!question[1]) return message.reply("Please ask a question")
        let result = Math.floor((Math.random() * responses.length))
        let askedq = question.slice(0).join(" ")
        
        const ballembed = new MessageEmbed()
        .setAuthor(message.author.tag)
        .setColor(0xff0000)
        .addField("Question: ", `${askedq}`)
        .addField("Response: ", `${responses[result]}`)
        message.channel.send({ embeds: [ballembed] })


        
    }
}