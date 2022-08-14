require('dotenv').config()

const generateImage = require('./generateImageBg')

const Discord = require('discord.js')
const client = new Discord.Client({ 
    intents: [
        'GUILDS', 
        'GUILD_MESSAGES', 
        'GUILD_MEMBERS'
    ]
})

//Login
const token = "OTI4OTYyMDYyNTEwNjA4NDA0.GYCAx_.8P6oqd5SOo2zCxKsDgCt7OsFHSZWc5cKQHFD1M"
client.login(token) 

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`)
})

//Welcome
client.on('guildMemberAdd', async (member) => {
    const anncouncementChannelId = process.env.ANNOUNCEMENT_CH_ID
    const generalChannelId = process.env.GENERAL_CH_ID
    const img = await generateImage(member)
    
    member.guild.channels.cache.get(anncouncementChannelId).send({
        content: `Hey <@${member.id}>, welcome to the server! Don't be shy. Head to the <#${generalChannelId}> and introduce yourself!`,
        files: [img]
    })

    member.guild.channels.cache.get(generalChannelId).send(`Hello @everyone, please welcome our new member <@${member.id}>`)
})