
const {Message, Snowflake} = require("discord.js");
const userSchema = require("./Schema/User.js");
const guildSchema = require("./Schema/Guild.js");
const memberSchema = require("./Schema/Member.js");
const logSchema = require("./Schema/Log.js");
const Prefix = require("./Schema/Prefix.js");

/**
 * Creates / Finds a user by their snowflake in the user database.
 * @param {Snowflake} userID
 * @returns {Promise<*|Document<any, any, unknown>>}
 */
module.exports.fetchUser = async function(userID){

    let userDB = await userSchema.findOne({ id: userID });
    if(userDB){
        return userDB;
    }else{
        userDB = new userSchema({
            id: userID,
            registeredAt: Date.now()
        })
        await userDB.save().catch(err => console.log(err));
        return userDB;
    }
};
 //fuck ass
/** FUCK THIS  THEME HONESTLy
 * Creates / Find a guild by the guild snowflake in the guild database
 * @param {Snowflake} guildID
 * @returns {Promise<*|Document<any, any, unknown>>}
 */
module.exports.fetchGuild = async function(guildID){

    let guildDB = await guildSchema.findOne({ id: guildID });

    if(guildDB){
        return guildDB;
    }else{
        guildDB = new guildSchema({
            id: guildID,
            registeredAt: Date.now()
        })
        await guildDB.save().catch(err => console.log(err));
        return guildDB;
    }
};

/**
 * Creates / Finds a member in the member database by their snowflake
 * @param {Snowflake} userID
 * @param {Snowflake} guildID
 * @returns {Promise<*|Document<any, any, unknown>>} Returned member entry
 */
module.exports.fetchMember = async function(userID, guildID){

    let memberDB = await memberSchema.findOne({ id: userID, guildID: guildID });
    if(memberDB){
        return memberDB;
    }else{
        memberDB = new memberSchema({
            id: userID,
            guildID: guildID,
            registeredAt: Date.now()
        })
        await memberDB.save().catch(err => console.log(err));
        return memberDB;
    }
};

/**
 * Creates / Finds logs in the Log database
 * These logs contain command usage data
 * @param {Message} message
 * @param {data: {command: Command}} data
 * @returns {Promise<Document>} Log Document
 */
module.exports.createLog = async function(message, data){

    let logDB = new logSchema({
        commandName: data.command.name,
        author: { username: message.author.username, discriminator: message.author.discriminator, id: message.author.id },
        guild: { name: message.guild ? message.guild.name : "dm", id: message.guild ? message.guild.id : "dm", channel: message.channel ? message.channel.id : "unknown" },
        date: Date.now()
    });
    await logDB.save().catch(err => console.log(err));


};
