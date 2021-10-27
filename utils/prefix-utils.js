// watch and learn
//we watch fad

//done
const Schema = require('../database/Schema/Guild')

let prefixCache = {} // temp cache so we dont have to enter the db everytime we want the prefix

module.exports.setPrefix = (guildId, newPrefix) => {
    Schema.findOne({ id: guildId }, (err, data) => {
        if (err) throw err

        if (data) {
            data.prefix = newPrefix

            data.save()
        } else {
            data = new Schema({
                id: guildId,
                prefix: newPrefix
            })

            data.save() // now wait ok
        }

        prefixCache[guildId] = newPrefix
    })
}

module.exports.getPrefix = async (guildId) => {
    let cachedPrefix = prefixCache[guildId]

    if (cachedPrefix) return cachedPrefix

    let result = await Schema.findOne({ id: guildId })

    prefixCache[guildId] = result?.prefix

    return result?.prefix
}

// now its done POG // then whenever you want to set it, do setPrefix(guildid) and let prefix = getPrefix(guildId) to get it
// aight gtg now since webstorm consume ram. npnp //okie, thankie 