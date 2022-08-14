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

//Welcome
client.on('guildMemberAdd', (member) => {
    const anncouncementChannelId = process.env.ANNOUNCEMENT_CH_ID
    const generalChannelId = process.env.GENERAL_CH_ID
    member.guild.channels.cache.get(anncouncementChannelId).send(`Hey <@${member.id}>, welcome to the server! Don't be shy. Head to the <#${generalChannelId}> and introduce yourself!`)
})