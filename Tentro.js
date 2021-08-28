const config = require('./config.json')
require("colors");
const {Client, Intents, Message, Collection} = require('discord.js');
const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS',
        'GUILD_INTEGRATIONS',
        'GUILD_WEBHOOKS',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_PRESENCES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGE_TYPING',
    ],
    allowedMentions: ["roles", "users"],
    partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION']
});
require('dotenv').config();


/**
 * Simple collection of all commands usage within the command handler please.
 */
client.commands = new Collection()
/**
 * Global variable for the config usage: client.settings.prefix for example
 */
client.settings;
/**
 * all categories (folders) from the commands folder as a string array.
 */
client.categories = fs.readdirSync("./commands/");
/**
 * Commands but... the alternative names?
 * its basically an array of the possible aliases for the command
 */
client.aliases = new Collection();
// Calling the UtilsMain with client so it can extend opon it
require("./utils/UtilsMain")(client);

client.on('ready', () => {
    console.log('Tentro-JS Officially Deployed To The Rescue!')

})

client.login(process.env.TOKEN)
