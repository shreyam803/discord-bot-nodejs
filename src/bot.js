require('dotenv').config();

const { Client,WebhookClient } = require('discord.js');
const welcome = require('./welcome');
const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN
)

const PREFIX = '$'

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`);

    welcome(client);

});


client.on('message', async (message) => {
    if (message.author.bot) return;
    // console.log(`[${message.author.tag}] : ${message.content} `);

    if(message.content){
        message.react('❤️')
    }

    if(message.conten === 'hi'||'Hi'||'Hello'||'hello'||'hey'||'Hey'){
        message.channel.send('Hello there..')
    }

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/)

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('You do not have permissions to use that command');

            if (args.length === 0)
                return message.reply('Please provide an ID.');

            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((error) => message.channel.send('I do not have permissions :('))
            }
            else {
                message.channel.send('That member was not found!!')
            }
        }

        else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('You do not have permissions to use that command');

            if (args.length === 0)
                return message.reply('Please provide an ID.');

            try {
                const user = await message.guild.members.ban(args[0])
                message.channel.send(`${user} has banned!!`)

            }
            catch (e) {
                console.log(e);
                message.channel.send('Error: Either I do not have permissions or the user was not found')
            }
        }
        else if(CMD_NAME==='announce') {
            
             const msg = args.join(' ')
             webhookClient.send(msg);
        }

    }
});

client.on('messageReactionAdd', (reaction, user) => {

    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
   
    if (reaction.message.id === '842335156835713024') {
        switch (name) {
            case '🍉':
                member.roles.add('842333187174301726');
                break;
            case '🍑':
                member.roles.add('842333635357179934')
                break;
            case '🍇':
                member.roles.add('842333712133783592')
                break;
            case '🍓':
                member.roles.add('842333260063572009')
                break;
        }
    }
})

client.on('messageReactionRemove', (reaction, user) => {

    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    
    if (reaction.message.id === '842335156835713024') {
        switch (name) {
            case '🍉':
                member.roles.remove('842333187174301726');
                break;
            case '🍑':
                member.roles.remove('842333635357179934')
                break;
            case '🍇':
                member.roles.remove('842333712133783592')
                break;
            case '🍓':
                member.roles.remove('842333260063572009')
                break;
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);
