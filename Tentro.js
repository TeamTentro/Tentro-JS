const config = require('./config.json')
require("colors");
require('dotenv').config();
const fs = require("fs");
const mongoose = require('mongoose');
const {Client, Intents, Message, Collection} = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    allowedMentions: ["roles", "users"],
    partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION']
});

/**
 * Simple collection of all commands usage within the command handler please.
 */
client.commands = new Collection()

/**
 * Global variable for the config usage: client.settings.prefix for example
 */
client.settings;

/**
 * Global variable for the database usage: client.db for example
 */
client.db = require('./database/Mongo.js');

/**
 * Global variable for the client owners/developers.
 */
 client.owners = config.owners;

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
require("./utils/HandlerCollection")(client);

 // Connect to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    client.log('Load', 'Connected to MongoDB.')
}).catch((err) => {
    console.log('ERROR','Unable to connect to MongoDB Database.\nError: ' + err)
})

client.on('ready', () => {
    
    client.log('Ready', 'Tentro is online and active.!')
    client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });

})

client.login(process.env.TOKEN);