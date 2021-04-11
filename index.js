const utils = require('./utils.js');
const fs = require('fs');
const Discord = require('discord.js');

const KICK_MESSAGE = 'Yeetus Deletus \nYou are now a fetus';
const MAX_YEETS_THRESHOLD = 10; // stops affecting move probability at this point
const token_path = '/Users/Grievous/.hidden_files/discord_yeet_bot.json'
const client = new Discord.Client();

let token = null;
fs.readFile(token_path, (err, data) => {
  token = JSON.parse(data)["TOKEN"];
  initializeBot();
});

function movePabs(){
  const pabs = getPabsUser();
  // const pabs_channel = getPabsChannel();
  if (pabs) {
    const voice_channels = getVoiceChannels();
  }
}


function initializeBot() {
  client.on('ready', () => {
    console.log('yeety boy here');
    // console.log('this: ', this);
    // let data = {};
    // let textChannel = null;
    // Discord.Message(this, data, textChannel);
  });
  
  client.on('message', msg => {
    const msg_lowercase = msg.content.toLowerCase();
    let yeet_count = utils.getYeetCount(msg_lowercase);
    if(yeet_count) {
      if(yeet_count > MAX_YEETS_THRESHOLD) {
        yeet_count = MAX_YEETS_THRESHOLD;
      }
      if (Math.random() <= yeet_count/MAX_YEETS_THRESHOLD) {
        console.log('movemovemove');
        movePabs()
      }
      else {
        console.log('nonono');
      }
    }

    if (msg.author !== client.user) {
      console.log('say hi');
      msg.channel.send('hi');
    }
  });

  client.on('messageReaction', (msgRe, user) => {
    console.log('msgRe: ', msgRe);
    console.log('user: ', user);
  });


  client.login(token);
}

// setInterval(() => {utils.movePabs()}, PABS_CHECK_TIME);
