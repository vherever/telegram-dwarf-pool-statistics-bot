const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
const https = require('https');

require('dotenv').config();

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

const wallet = process.env.WALLET;

const apiUrl = `http://dwarfpool.com/eth/api?wallet=${wallet}`;
const marketCapUrlEth = 'https://api.coinmarketcap.com/v1/ticker/ethereum/';

const DataHelper = require('./helpers/dataHelper');
const dataHelper = new DataHelper();

let price = '';

bot.onText(/^\/info/, function (msg) {

    // CoinMarketCap request
    https.get(marketCapUrlEth, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
            if (data) {
                let parsed = JSON.parse(data)[0];
                price = parsed.price_usd ? parsed.price_usd : ''; // if no response - NaN

                // Dwarf request
                http.get(apiUrl, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                        if (data) {
                            let resData = JSON.parse(data);
                            if (!resData.error) {
                                bot.sendMessage(msg.chat.id, dataHelper._parseData(resData, price), {parse_mode: 'Markdown'}).then(function () {
                                    // reply sent!
                                });
                            } else if (resData.error) {
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
            }
            else {
            }
        });
    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });
});