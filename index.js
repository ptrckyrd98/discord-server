require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

//Initiate Server
app.listen(port, () => {
  console.log("Welcome to BaconPatty Discord Bot API");
  console.log(`Server is started in port ${port}`);
});

//Default Path
app.get("/", (req, res) => {
  res.send(200, { msg: "Welcome to BaconPatty Discord Bot API" });
});

//Routes
require("./src/discordBot");
require("./src/btcPrice");
require("./src/ethPrice");
require("./src/ronPrice");
require("./src/pixelsPrice");
