// Import required modules 
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js'); 
require('dotenv').config();

const cron = require('node-cron');

// Create a new Discord client with message intent 
const client = new Client({
  	intents: [
		GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],  
}); 

// // Bot is ready 
// client.once('ready', async () => { 
// 	try {
// 		console.log(`🤖 Logged in as ${client.user.tag}`); // Optional logging

// 		// Replace with your actual channel ID
// 		const channelId = process.env.DISCORD_CHANNEL_ID;

// 		// Fetch the channel
// 		const channel = await client.channels.fetch(channelId);

// 		// Send a message
// 		if (channel && channel.isTextBased()) {
// 			channel.send(`@everyone ny praktikmulighed fundet! \n [Læs mere her:]( 
//                 https://www.linkedin.com/jobs/view/4294606184/?eBP=CwEAAAGZbOAIVXahq-iKrBEO5inrvFIUvm0ZtRxfkxroqYrifQlTYTsXZkhjfYTVceicx3mdDRCQ791rAppvgtJtuI0OlCcQNqTuhTChjilS9PB5DfLOrdXGHenWBEO-7H_EsR6h6ExZ5XtKMx2bF-zSieNrwlCv1PJe671HFeip9OF0cbsLfPf8V-hEsJz1ePnTX1n4fnbvwkBp2LTcGWzgbKPjcCsUhOcjo9B-bZUW9WEVdBl9j3HBfYXelLDVKthd4TiqYktN45un6O6bWzDjNK0dUKlvIeL7Fk_1poBZnZEIFM6Q0q66HrClCG0-TnWD51YhxM5yuD4nPTjrzzDqD_mjpyIRb3X6OH86xpPldK3uWRqELlMRZC2qGlNw1H-lZ6AoQsTDbaf1c5jwlEvDhGFbxqMIin5lPYGJc-0bTyYnIw3CXcO1fmUH6xUllN20X8idFA2jd6lp86Psy_hOA_GFWH_Vw1VkkPya&refId=a2ttCb%2F2yrifV5vOBXdOCg%3D%3D&trackingId=tsXLZtoFxcx1mQfKvdnDsQ%3D%3D&trk=flagship3_search_srp_jobs&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_jobs%3BoHkzcskuTdysmHIjO2otTw%3D%3D&lici=tsXLZtoFxcx1mQfKvdnDsQ%3D%3D)`);

// 		} else {
// 			console.error('Channel not found or is not a text channel.');
// 		}
// 	} catch (err) {
// 		console.error('Error sending message:', err);
// 	}
// }); 

// client.once('ready', async () => {
//     try {
//         console.log(`🤖 Logged in as ${client.user.tag}`);

//         const channelId = process.env.DISCORD_CHANNEL_ID;

//         const channel = await client.channels.fetch(channelId);

//         if (!channel || !channel.isTextBased()) {
//             console.error('❌ Channel not found or is not a text channel.');
//             return;
//         }

//         // ⏰ Schedule the job
//         // cron.schedule('0 10 * * 5', async () => {
//         cron.schedule('1 0 * * 0', async () => {
//             try {
//                 await channel.send(`@everyone ny praktikmulighed fundet! \nLæs mere her: https://www.linkedin.com/jobs/view/...`);
//                 console.log("📢 Scheduled message sent!");
//             } catch (err) {
//                 console.error('⚠️ Error sending scheduled message:', err);
//             }
//         });

//         console.log('🗓️ Weekly job scheduled for every Friday at 10:00 AM.');
        
//     } catch (err) {
//         console.error('⚠️ Error during bot setup:', err);
//     }
// });

// async function sendWeeklyMessage(client) {
//     try {
//         const channelId = process.env.DISCORD_CHANNEL_ID;
//         const channel = await client.channels.fetch(channelId);

//         if (channel && channel.isTextBased()) {
//             await channel.send(`@everyone ny praktikmulighed fundet! \nLæs mere her: https://www.linkedin.com/jobs/view/...`);
//             console.log("📢 Message sent!");
//         } else {
//             console.error('❌ Channel not found or is not a text channel.');
//         }
//     } catch (err) {
//         console.error('⚠️ Error sending message:', err);
//     }
// }

async function sendWeeklyMessage(client) {
    try {
        const channelId = process.env.DISCORD_CHANNEL_ID;
        const channel = await client.channels.fetch(channelId);

        if (channel && channel.isTextBased()) {
            // Replace this with your actual link
            const jobUrl = 'https://www.linkedin.com/jobs/view/4294606184/';

            // Create the embed
            const embed = new EmbedBuilder()
                .setTitle('Nyt opslag om praktikmulighed fundet på LinkedIn!')
                .setDescription('Klik på linket for at læse mere om praktikmuligheden på LinkedIn')
                .setURL(jobUrl)
                .setColor(0x0077B5)
                .setImage('https://play-lh.googleusercontent.com/dWGBdDzI8mxlZqXT3qBt4eWmCaWLq-OXfZYea1hu6ODmMj1cLIeQak6Gsecn4zJoflE-') // Example LinkedIn image
                .setFooter({ text: 'Søg det nu!' });

            // Send the message with @everyone + embed
            await channel.send({
                content: '@everyone',
                embeds: [embed],
            });

            console.log("📢 Embed message sent!");
        } else {
            console.error('❌ Channel not found or is not a text channel.');
        }
    } catch (err) {
        console.error('⚠️ Error sending message:', err);
    }
}

client.once('ready', async () => {
    try {
        console.log(`🤖 Logged in as ${client.user.tag}`);

        // 🧪 Immediately test when bot starts
        await sendWeeklyMessage(client);

        cron.schedule('0 8 * * *', async () => {
            await sendWeeklyMessage(client);
        });

        console.log('🗓️ Cron job scheduled: Every day at 08:00 AM');
        
    } catch (err) {
        console.error('⚠️ Error during bot setup:', err);
    }
});

// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN); 