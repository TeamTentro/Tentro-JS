module.exports = async (client, interaction) => {
    if (interaction.isContextMenu()) {
        switch (interaction.commandName) {
            case "Delete Message": {
                interaction.options.data[0].message.delete()
                interaction.reply({ content: `Message \`${interaction.options.data[0].message.content}\` by user ${interaction.options.data[0].message.author.toString()} was succesfully deleted!`, ephemeral: true })
                break
            }
            case "Generate 8ball": {
                const message = interaction.options.data[0].message
                message.content = `t!8ball ${message.content}`
                client.emit('messageCreate', message)
            }
        }
    }
}