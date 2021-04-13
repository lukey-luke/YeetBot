const utils = require('./utils.js');
const fs = require('fs');
const Discord = require('discord.js');

const KICK_MESSAGE = 'Yeetus Deletus \nYou are now a fetus';
const MAX_YEETS_THRESHOLD = 10; // stops affecting move probability at this point
const token_path = '/Users/Grievous/.hidden_files/discord_yeet_bot.json'
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

const VOICE_CHANNEL_TYPE = 'voice';

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


function moveMessager(msg) {
  // console.log('msg.guild.name: ', msg.guild.name);
  const voice_channels = msg.guild.channels.filter(chan => chan.type == VOICE_CHANNEL_TYPE);
  voice_channels.forEach(v_chan => {
    console.log(`got ${v_chan.members.size} members in ${v_chan.name}`);
    v_chan.members.forEach(mem => {
      // if (mem.user.id == msg.user.id) {
      if (mem.id == msg.member.id) {
        console.log('we got him boys: ', mem.user.id);
        mem.kick('just for fun');
      }
    });
  });
}


function initializeBot() {
  client.on('ready', () => {
    console.log('yeety boy here');
    console.log('client.channels: ', client.channels);
    // console.log('this: ', this);
    // let data = {};
    // let textChannel = null;
    // Discord.Message(this, data, textChannel);
  });

  
  client.on('message', msg => {
    moveMessager(msg);

    const msg_lowercase = msg.content.toLowerCase();

    // let bad_word_count = utils.getYeetCount(msg_lowercase);
    let bad_word_count = utils.getYeetCount(msg_lowercase);
    if(bad_word_count) {
      if(bad_word_count > MAX_YEETS_THRESHOLD) {
        bad_word_count = MAX_YEETS_THRESHOLD;
      }
      if (Math.random() <= bad_word_count/MAX_YEETS_THRESHOLD) {
        console.log('movemovemove');
        movePabs();
      }
    }

    // if (msg.author !== client.user) {
    //   console.log('say hi');
    //   msg.channel.send('hi');
    // }
  });

  client.on('messageReactionAdd', (msgRe, user) => {
    // console.log('msgRe: ', msgRe);
    console.log('user: ', user);
    // let user_id = user.id;
    console.log('msgRe.message:', msgRe.message);
    let guildy = msgRe.message.guild;
    console.log('guild? ', guildy.name);
    let member = guildy.member(user);
    console.log('member? ', member);
  });


  client.login(token);
}

// setInterval(() => {utils.movePabs()}, PABS_CHECK_TIME);
