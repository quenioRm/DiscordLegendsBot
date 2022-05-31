require('dotenv').config(); 
const fetch = require("node-fetch");

const { Client, Intents, MessageAttachment } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

async function GetServerStatus(){
    const res = await fetch('https://api.playbdlegends.com/GetServerStatus');
    const json = await res.json();
    return json;
}

async function GetLastAwardHistory(){
    const res = await fetch('https://api.playbdlegends.com/GetLastDayWinner');
    const json = await res.json();
    return json;
}


// client.on('ready', async msg => {
//   const status = await GetServerStatus();
//   if(status.server_status == 1){
//       console.log('Server Online');
//       const attachment = new MessageAttachment('https://playbdlegends.com/assets/images/Server__ON.png');
//       msg.contentchannel.send({ content: "Server Status", files: [attachment] })
//   }else{
//       console.log('Server Offline');
//   }
// });

client.on('message', async msg => {
    switch (msg.content) {
      case "!serverstatus":
        const status = await GetServerStatus(); 
        if(status.server_status == 1){
            msg.channel.send('https://playbdlegends.com/assets/images/Server__ON.png');
        }else{
            msg.channel.send('https://playbdlegends.com/assets/images/Server__OFF.png'); 
        }
        break;
       case "!getawardwinner":
          const data = await GetLastAwardHistory();  
          data.results.forEach(item => {
            msg.channel.send(item);
          });
          break;
    }
})


client.login(process.env.CLIENT_TOKEN); 