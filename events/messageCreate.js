const {fetchGuild} = require("../database/Mongo");
const GuildSchema = require("../database/Schema/Guild")
const { getPrefix } = require("../utils/prefix-utils.js")



const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = async (client, message) => {
     const config = require('../utils/config.js')(client)
     const prefix = await getPrefix(message.guild.id) || require("../utils/Config.js")

    
        if (message.author.bot ||
            !message.guild) return;

        client.settings = await GuildSchema.findOneAndUpdate(
            { id: message.guild.id },
            {},
            {
                    upsert: true,
                    setDefaultsOnInsert: true,
                    new: true,
            }
        )
            .populate("addons");
        message.settings = client.settings;

        const level = client.getPermLevel(message, message.member);

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.settings.prefix)})\\s*`); // from rom, Allowing either an mention or the prefix to respond to.
        if (!prefixRegex.test(message.content)) return;


        const [, matchedPrefix] = message.content.match(prefixRegex);

        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;



        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        if (command) {
            if (command.category?.toLowerCase() === 'dev' && !config.developers.check(message.author)) return
                try {
                    // if (command.permissions) {
                    //     // if(![undefined, null].includes(client.permissionsLevel)){
                    //     //     if(await client.globals.permissions.checkUser(message.member, command.permissionsLevel, command.permissions))
                    //     //         command.exec(client, message, args);
                    //     // }
                    //     switch (command.permissions) {
                    //         // case "AUTHOR":
                    //         //     if (message.author.id === "403668506287144981" || message.author.id === "188988455554908160"){
                    //         //         command.exec(client, message, args);
                    //         //     } else {
                    //         //         await message.reply(`Sorry, you don't have the permission \`\`\`${command.permissions}\`\`\` (Only the bot Author can use these commands!)`);
                    //         //     }
                    //         //     break;
                    //         case "EVERYONE":
                    //             command.exec(client, message, args);
                    //             break;
                    //         // default:
                    //         //     if (message.member.permissions.has(command.permissions)) {
                    //         //         command.exec(client, message, args);
                    //         //     } else {
                    //         //         await message.reply(`Sorry, you don't have the permission \`\`\`${command.permissions}\`\`\``);
                    //         //     }
                    //         //     break;
                    //     }
                    // } else {
                        if (level < client.levelCache[command.permissionLevel]) return message.reply(`Fucker you failed because you're missing ${client.config.permLevels.filter((l) => l.level === client.levelCache[command.permissionLevel])[0].name}`);
                        command.exec(client, message, args);
                    // }
                } catch (e) {
                    console.log(e);
                }
            }
};


