require('dotenv').config()

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

//Login
client.login(process.env.DISCORDJS_BOT_TOKEN)