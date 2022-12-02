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
// const morningMsg = schedule.scheduleJob({ hour: 7, minute: 59 }, () => {
//     client.channels.cache.get(generalChannelId).send('Good Morning! @everyone')
//     client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/YvhU61Lel3LVZTAfGO/giphy-downsized-large.gif')
// })

// Afternoon Message
// const afternoonMsg = schedule.scheduleJob({ hour: 11, minute: 59 }, () => {
//     client.channels.cache.get(generalChannelId).send('Good Afternoon! @everyone, Lunch Time')
//     client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/d2ItDZZumUI6Y/giphy.gif')
// })

// Evening Message
// const eveningMsg = schedule.scheduleJob({ hour: 6, minute: 30 }, () => {
//     client.channels.cache.get(generalChannelId).send('Good Evening! @everyone, how\'s your day? I hope you have a great day!')
//     client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/mWGkvExueCYKX0o4il/giphy.gif')
// })

// Evening Message
// const weekEndMsg = schedule.scheduleJob({ hour: 6, minute: 30, dayOfWeek: 5 }, () => {
//     client.channels.cache.get(generalChannelId).send('Hello! @everyone, Happy Weekend Y\'All!')
//     client.channels.cache.get(generalChannelId).send('https://media.giphy.com/media/cKbLJzS0cOTklEmzto/giphy.gif')
// })

//Monday Feels
// const mondayFeelMsg = schedule.scheduleJob({ hour: 20, minute: 30, dayOfWeek: 0 }, () => {
//     client.channels.cache.get(generalChannelId).send('Shet! Monday na ulet bukas.')
//     client.channels.cache.get(generalChannelId).send('https://scontent.fmnl25-4.fna.fbcdn.net/v/t39.30808-6/298984971_1126961094596583_1121420645209888551_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFzX0PhtM83cXZHKzZqIBjQroXNOTV0YS2uhc05NXRhLfNX5UTKsb87OiaLtQwLEqU1cCKhndSfV5LjXF-gyhp5&_nc_ohc=Um90p5a74fMAX_oBfyz&_nc_ht=scontent.fmnl25-4.fna&oh=00_AT8Uj6OCnTPinhcpRW9OXnGH-Wp2XwoAtPwaYlXrBmhpfA&oe=6304B265')
// })