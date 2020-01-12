const utils = require('./utils.js');
const fs = require('fs');
const Discord = require('discord.js');

const PABS_CHECK_TIME = 1000 * 60 * 60 * 17 + 43 * 60 * 1000; // 17 hours, 43 min
const KICK_MESSAGE = 'Yeetus Deletus \nYou are now a fetus';
const token_path = '/Users/Grievous/.hidden_files/discord_yeet_bot.json'
const bot = new Discord.Client();

let token = null;
fs.readFile(token_path, (err, data) => {
  token = JSON.parse(data)["TOKEN"];
  initializeBot();
});

function wordInString(s, word){
  return new RegExp( '\\b' + word + '\\b', 'i').test(s);
}

function initializeBot() {
  bot.on('ready', () => {
    console.log('yeety boy here');
  });
  
  bot.on('message', msg => {
    const msg_lowercase = msg.content.toLowerCase();
    if(utils.wordInString(msg_lowercase, 'yeet')) {
      if (Math.random() <= utils.getMoveProbability(msg_lowercase)) {
        utils.movePabs()
      }
    }
  });

  bot.login(token);
}

// setInterval(() => {utils.movePabs()}, PABS_CHECK_TIME);
