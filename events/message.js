module.exports = async (client, message) => {
    if (message.content.toLowerCase().includes("milk")) message.reply({content: "no.", ephemeral: true})
}
