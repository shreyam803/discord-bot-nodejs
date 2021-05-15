module.exports = client =>{
    const channelId = '840520113765744653';

    client.on('guildMemberAdd', (member) => {
        console.log(member);

        const msg = `Hi There..!! <@${member.id}> Welcome to Shreya's server. Hope you will enjoy here. Keep chatting..!! :) `;

        const channel = member.guild.channels.cache.get(channelId);

        channel.send(msg);

        console.log(`${member.user.username} has joined`);
    });
}