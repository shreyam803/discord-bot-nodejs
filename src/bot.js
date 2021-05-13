require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

const PREFIX = '$'

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in!`)
});

client.on('message',(message)=>{
    if(message.author.bot) return;
   // console.log(`[${message.author.tag}] : ${message.content} `);
    if(message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)
    
        if(CMD_NAME === 'kick'){
            if(args.length===0) return message.reply('Please provide an ID.');
            const member = message.guild.members.cache.get(args[0]);
            if(member) {
                member
                .kick()
                .then((member)=> message.channel.send(`${member} was kicked.`))
                .catch((error)=> message.channel.send('I do not have permissions :('))
            }
            else{
                message.channel.send('That member was not found!!')
            }

            console.log(member);
        }
        
        console.log(CMD_NAME);
        console.log(args);
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);
