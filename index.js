require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT

//Initiate Server
app.listen(port, () => {
    console.log('Welcome to BaconPatty Discord Bot API')
    console.log(`Server is started in port ${port}`)
});

//Default Path
app.get('/', (req, res) => {
    res.send('Welcome to BaconPatty Discord Bot API')
    
})

//Routes
require('./src/routes/discordBotRoutes')