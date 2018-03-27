const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

require('dotenv').config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

const wallet = process.env.WALLET;

const apiUrl = `http://dwarfpool.com/eth/api?wallet=${wallet}`;

const DataHelper = require('./helpers/dataHelper');
const dataHelper = new DataHelper();

bot.onText(/^\/info/, function (msg) {
    http.get(apiUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
            if (data) {
                let resData = JSON.parse(data);
                // console.log('resData', resData);
                if (!resData.error) {
                    bot.sendMessage(msg.chat.id, dataHelper._parseData(resData), {parse_mode: 'Markdown'}).then(function () {
                        // reply sent!
                    });
                } else {
                    bot.sendMessage(msg.chat.id, resData.error_code).then(function () {
                        // reply sent!
                    });
                }
            }
            else {
                bot.sendMessage(msg.chat.id, 'Dwarf pool offline at the moment.').then(function () {
                    // reply sent!
                });
            }
        });
    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });

});