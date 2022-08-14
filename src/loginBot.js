require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({ 
    intents: [
        'GUILDS', 
        'GUILD_MESSAGES', 
        'GUILD_MEMBERS'
    ]
})

//Login
client.login(process.env.DISCORDJS_BOT_TOKEN)

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`)
})