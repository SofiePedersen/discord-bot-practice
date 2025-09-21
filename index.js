// Import required modules 
const { Client, GatewayIntentBits } = require('discord.js'); 
require('dotenv').config(); 

// Create a new Discord client with message intent 
const client = new Client({

}); 

// Bot is ready 
client.once('ready', () => { 
  console.log(`🤖 Logged in as ${client.user.tag}`); 
}); 

// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN); 