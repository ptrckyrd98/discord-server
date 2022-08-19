const axios = require('axios')
const Discord = require('discord.js')
const client = new Discord.Client({ 
    intents: [
        'GUILDS', 
        'GUILD_MESSAGES', 
        'GUILD_MEMBERS'
    ]
})

function getPrices() {


	// API for price data.
	axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${process.env.PREFERRED_CURRENCY}&ids=${process.env.SLP_ID}`).then(res => {
		// If we got a valid response
		if(res.data && res.data[0].current_price && res.data[0].price_change_percentage_24h) {
			let currentPrice = res.data[0].current_price || 0 // Default to zero
			let priceChange = res.data[0].price_change_percentage_24h || 0 // Default to zero
			let symbol = res.data[0].symbol || '?' 
			client.user.setActivity(`${priceChange.toFixed(2)}% | ${symbol.toUpperCase()}`, { type: 3 })

			client.guilds.cache.find(guild => guild.id === process.env.SERVER_ID).me.setNickname(`SLP ${process.env.CURRENCY_SYMBOL}${(currentPrice).toLocaleString().replace(/,/g,process.env.THOUSAND_SEPARATOR)}`)
			console.log('Updated price to', currentPrice)
		}
		else
			console.log('Could not load player count data for', process.env.SLP_ID)

	}).catch(err => console.log('Error at api.coingecko.com data:', err))
}

// Runs when client connects to Discord.
client.on('ready', () => {
	console.log(`${client.user.tag} has logged in.`)

	getPrices() // Ping server once on startup
	// Ping the server and set the new status message every x minutes. (Minimum of 1 minute)
	setInterval(getPrices, Math.max(1, process.env.MC_PING_FREQUENCY || 1) * 60 * 1000)
})

// Login to Discord
client.login(process.env.SLP_BOT_TOKEN)