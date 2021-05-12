require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in!`)
});

client.on('message',(message)=>{
    console.log(message.content)
})

client.login(process.env.DISCORD_BOT_TOKEN);
