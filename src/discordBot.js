require('dotenv').config()

const schedule = require('node-schedule')
const generateImage = require('./generateImageBg')

const Discord = require('discord.js')
const client = new Discord.Client({ 
    intents: [
        'GUILDS', 
        'GUILD_MESSAGES', 
        'GUILD_MEMBERS'
    ]
})

const generalChannelId = process.env.GEN_CH_ID
const anncouncementChannelId = process.env.ANNOUNCEMENT_CH_ID

//Login
client.login(process.env.DISCORD_BOT_TOKEN)
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`)
    client.user.setActivity('VALORANT', { type: 1 })
})

//Welcome
client.on('guildMemberAdd', async (member) => {
    const img = await generateImage(member)
    
    member.guild.channels.cache.get(anncouncementChannelId).send({
        content: `Hey <@${member.id}>, welcome to the server! Don't be shy. Head to the <#${generalChannelId}> and introduce yourself!`,
        files: [img]
    })

    member.guild.channels.cache.get(generalChannelId).send(`Hello @everyone, please welcome our new member <@${member.id}>`)
})

//Morning Message
const morningMsg = schedule.scheduleJob({ hour: 7, minute: 59 }, () => {
    client.channels.cache.get(generalChannelId).send('Good Morning! @everyone')
    client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/YvhU61Lel3LVZTAfGO/giphy-downsized-large.gif')
})

// Afternoon Message
const afternoonMsg = schedule.scheduleJob({ hour: 11, minute: 59 }, () => {
    client.channels.cache.get(generalChannelId).send('Good Afternoon! @everyone, Lunch Time')
    client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/d2ItDZZumUI6Y/giphy.gif')
})

// Evening Message
const eveningMsg = schedule.scheduleJob({ hour: 6, minute: 30 }, () => {
    client.channels.cache.get(generalChannelId).send('Good Evening! @everyone, how\'s your day? I hope you have a great day!')
    client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/mWGkvExueCYKX0o4il/giphy.gif')
})

// Evening Message
const weekEndMsg = schedule.scheduleJob({ hour: 6, minute: 30 }, () => {
    client.channels.cache.get(generalChannelId).send('Hello! @everyone, Happy Weekend To All!')
    client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/cKbLJzS0cOTklEmzto/giphy.gif')
})