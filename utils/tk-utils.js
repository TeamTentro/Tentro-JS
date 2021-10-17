const Schema = require("../database/Schema/Guild");

module.exports.settkMessage = (guildId, MessageId) => {
    Schema.findOne({id: guildId }, async (err, data) => {
        if (data) {
            data.tkMessage = MessageId
            data.save()
        } else {
            data = new Schema({ id: guildId, tkMessage: MessageId})
    
           data.save()
        }
    })}

module.exports.settkCategory = (guildId, CategoryId) => {
    Schema.findOne({id: guildId }, async (err, data) => {
        if (data) {
            data.tkCategory = CategoryId
            data.save()
        } else {
            data = new Schema({ id: guildId, tkCategory: CategoryId})
    
           data.save()
        }
    })}

module.exports.settkChannel = (guildId, ChannelId) => {
    Schema.findOne({id: guildId }, async (err, data) => {
        if (data) {
            data.tkChannel = ChannelId
            data.save()
        } else {
            data = new Schema({ id: guildId, tkChannel: ChannelId})
    
           data.save()
        }
    })}


