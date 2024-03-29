const mongoose = require("mongoose");
const {Snowflake} = require("discord.js");

module.exports = mongoose.model("Guild", new mongoose.Schema({

    id: { type: String }, // ID of the guild
    registeredAt: { type: Number, default: Date.now() },
    prefix: { type: String, default: "t!" }, // watch and learn ok we are watching fad doing magic
    tkChannel: String, //ok go ahead fa
    tkMessage: String, 
    tkCategory: String,
    tkLogChannel: String,
    addons: { type: Object, default: { // Extra features data
            welcome: {
                enabled: false, // Welcome features are enabled
                channel: null, // ID for the channel to send messages to
                message: null, // Custom message
                image: false, // Check if image is e
                goodbye: {
                    enabled: false, // Goodbye features are enabled
                    channel: null, // ID for channel to send messages to
                    message: null, // Custom message
                    image: false, // Check if image is enabled
                    embed: false // Check if embed is enabled
                },
                roles: {
                    helper: Snowflake,
                    moderator: Snowflake,
                    administrator: Snowflake
                },

            }
        }
    }
}));