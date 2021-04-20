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
  const voice_channels = msg.guild.channels.cache.filter(chan => chan.type == VOICE_CHANNEL_TYPE);;
  voice_channels.forEach(v_chan => {
    console.log(`got ${v_chan.members.size} members in ${v_chan.name}`);
    v_chan.members.forEach(mem => {
      if (mem.id == msg.member.id) {
        console.log('we got him boys: ', mem.user.id);
        mem.voice.kick('just for fun').then(() => {
          console.log('should be kicked!');
        });
      }
    });
  });
}


function getRandomItem(arr) {
    const random_index = Math.floor(Math.random() * arr.length);
    return arr[random_index];
}


function moveRandomVoice(msg) {
  const voice_channels = msg.guild.channels.cache.filter(chan => chan.type == VOICE_CHANNEL_TYPE);;
  let all_voice_members = [];
  voice_channels.forEach(v_chan => {
    const channel_members = v_chan.members.array();
    all_voice_members = all_voice_members.concat(channel_members);
  });

  if (all_voice_members.length) {
    const randy = getRandomItem(all_voice_members);
    let current_chan = randy.voice.channel;
    const new_channels = voice_channels.filter(chan => chan.id !== current_chan.id).array();

    if (new_channels.length) {
      const new_voice_channel = getRandomItem(new_channels);
      console.log('move to: ', new_voice_channel.name);
      randy.voice.setChannel(new_voice_channel, 'all in good fun').then(() => {
        console.log('user should be in new channel now');
      });
    }
    else {
      randy.voice.kick('just for fun').then(() => {
        console.log('should be kicked!');
      });
    }
  }
}


function initializeBot() {
  client.on('ready', () => {
    console.log('yeety boy here');
  });

  
  client.on('message', msg => {
    moveRandomVoice(msg);

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
