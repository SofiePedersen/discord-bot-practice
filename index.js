// Import required modules 
const { Client, GatewayIntentBits } = require('discord.js'); 
require('dotenv').config(); 

// Create a new Discord client with message intent 
const client = new Client({
  	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],  
}); 

// Bot is ready 
client.once('ready', async () => { 
	try {
		console.log(`🤖 Logged in as ${client.user.tag}`); // Optional logging

		// Replace with your actual channel ID
		const channelId = process.env.DISCORD_CHANNEL_ID;

		// Fetch the channel
		const channel = await client.channels.fetch(channelId);

		// Send a message
		if (channel && channel.isTextBased()) {
			channel.send(`@everyone ny praktikmulighed fundet! \n [Læs mere her:]( 
                https://www.linkedin.com/jobs/view/4294606184/?eBP=CwEAAAGZbOAIVXahq-iKrBEO5inrvFIUvm0ZtRxfkxroqYrifQlTYTsXZkhjfYTVceicx3mdDRCQ791rAppvgtJtuI0OlCcQNqTuhTChjilS9PB5DfLOrdXGHenWBEO-7H_EsR6h6ExZ5XtKMx2bF-zSieNrwlCv1PJe671HFeip9OF0cbsLfPf8V-hEsJz1ePnTX1n4fnbvwkBp2LTcGWzgbKPjcCsUhOcjo9B-bZUW9WEVdBl9j3HBfYXelLDVKthd4TiqYktN45un6O6bWzDjNK0dUKlvIeL7Fk_1poBZnZEIFM6Q0q66HrClCG0-TnWD51YhxM5yuD4nPTjrzzDqD_mjpyIRb3X6OH86xpPldK3uWRqELlMRZC2qGlNw1H-lZ6AoQsTDbaf1c5jwlEvDhGFbxqMIin5lPYGJc-0bTyYnIw3CXcO1fmUH6xUllN20X8idFA2jd6lp86Psy_hOA_GFWH_Vw1VkkPya&refId=a2ttCb%2F2yrifV5vOBXdOCg%3D%3D&trackingId=tsXLZtoFxcx1mQfKvdnDsQ%3D%3D&trk=flagship3_search_srp_jobs&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_jobs%3BoHkzcskuTdysmHIjO2otTw%3D%3D&lici=tsXLZtoFxcx1mQfKvdnDsQ%3D%3D)`);

		} else {
			console.error('Channel not found or is not a text channel.');
		}
	} catch (err) {
		console.error('Error sending message:', err);
	}
}); 

// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN); 