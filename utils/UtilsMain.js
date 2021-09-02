const {Client, Message, GuildMember, Snowflake} = require("discord.js");
const moment = require("moment");
/**
 * Big boi collection of all commands used within the client globally, Usage: client.loadCommands(...)
 * @param {Client} client
 */
module.exports = (client) => {

    /**
     * A fancy log function stolen from the man himself... 3vil.
     * @param {string} type
     * @param {string} msg
     * @param {string} title
     */
    client.log = (type, msg, title) => {
        if (!title) title = "Log";
        else title = title.magenta.bold
        if (!type) type = 'Null'
        if (['err', 'error'].includes(type.toLowerCase())) type = type.bgRed.white.bold

        console.log(`[${moment().format('D/M/Y HH:mm:ss.SSS').bold.blue}] [${type.green}] [${title.yellow}] ${msg}`);
    };


    /**
     * A function usefull for getting a guild member by either the:
     * 1. ID (Snowflake)
     * 2. Mention
     * 3. Name
     * @param {Message} message - Message to get information from.
     * @param {String} toFind - Anything, ID, Username or Mention
     * @returns {GuildMember | string} - Member or error containing that no member was found.
     */
    client.getMember = async function (message, toFind = '') {

        toFind = toFind.toLowerCase();
        let target;

        if (!target && toFind) {
            target = await (await message.guild.members.fetch()).filter((member, id) => {
                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
            }).first();
        }

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if(!target)
            try { target = await message.guild.members.fetch(toFind) } catch (e) {};


        if (!target)
            target = "NOT_FOUND";

        return target;
    };

    /**
     * Get a member from a nickname id or mention. (FUCK YEAH PREMIUM!)
     * @param {Message} message - Message object to get information from.
     * @param {string[]} args - String array of the args
     * @param {number} argsIndex - From where to pick the message to check in the args.
     * @returns {Promise<*>} - The user OR an error.
     */
    client.memberSearch = async function (message, args, argsIndex) {
        let user = await client.getMember(message, args[argsIndex])
        console.log(user);
        if (user === "NOT_FOUND") {
            await message.reply("This user was not found.");
        } else {
            console.log(user);
            return user;
        }
    };

    let lastCategoryLoaded;
    /**
     * Function to load commands per command used within the HandlerCollection to load each command individually
     * @param {string} category
     * @param {string} commandName
     * @param {boolean} dontLog
     * @returns {{err: string}|{res: boolean}}
     */
    client.loadCommand = (category, commandName, dontLog) => {
        try {
            const props = require(`${process.cwd()}/commands/${category}/${commandName}`);
            if (lastCategoryLoaded !== category) {
                client.log("Load", `Starting to load all commands from the category ${category}`);
                lastCategoryLoaded = category;
            }
            if (!dontLog) {
                client.log("Load", `  ${"=>".blue} ${"Loading Command:".white} ${props.name.green}.`);
            }
            if (props.init) {
                props.init(client);
            }
            if (category) props.category = category
            client.commands.set(props.name, props);
            props.aliases.forEach(alias => {
                client.aliases.set(alias, props.name);
            });
            return {
                res: true
            };
        } catch (e) {
            console.log(e)
            return {
                err: `Unable to load command ${commandName} in ${category}: ${e}`
            };
        }
    };

    /**
     * unloading a command individually
     * @param {string} commandName
     * @returns {Promise<{res: (string|*)[]}|{err: string}>}
     */
    client.unloadCommand = async (commandName) => {
        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
        if (!command) return {
            err: `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`
        };
        if (command.shutdown) {
            await command.shutdown(client);
        }
        command.aliases.forEach(alias => {
            client.aliases.delete(alias);
        });
        client.commands.delete(command.name);
        delete require.cache[require.resolve(`${process.cwd()}/commands/${command.category}/${command.name}.js`)];
        return {
            res: [command.category, command.name]
        };
    };

    /**
     * Get the perm level for the user
     * @param {Message} message
     * @param {GuildMember} member
     * @returns {number}
     */
    client.getPermLevel = (message, member) => {
        let permlvl = 0;

        if (!member && !message) return 0;


        const permOrder = client.config.permLevels
            .slice(0)
            .sort((p, c) => (p.level < c.level ? 1 : -1));

        while (permOrder.length > 0) {
            const currentLevel = permOrder.shift();

            if (currentLevel === undefined) break;

            if (currentLevel.check(message, member)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    };
}
