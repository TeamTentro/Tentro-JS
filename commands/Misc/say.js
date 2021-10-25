module.exports = {
    name: "say",
    aliases: ["talk"],
    category: "misc",
    description: "say something as the bot",
    usage: "",
    permissions: "EVERYONE",
    exec: async (client, message, args) => {
        message.delete()
        message.channel.send(`${args.join(" ")}`)
    }  

}