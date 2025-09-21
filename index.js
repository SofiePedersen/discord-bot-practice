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