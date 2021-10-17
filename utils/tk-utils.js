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

