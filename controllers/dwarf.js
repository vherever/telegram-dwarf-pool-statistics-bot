'use strict';

const Telegram = require('telegram-node-bot');
const http = require('http');

const wallet = process.env.WALLET;

const apiUrl = `http://dwarfpool.com/eth/api?wallet=${wallet}`;

const DataHelper = require('../helpers/dataHelper');
const dataHelper = new DataHelper();

class DwarfController extends Telegram.TelegramBaseController {
    settingsHandler($) {
        $.sendMessage('*Not implemented yet...*', {parse_mode: 'Markdown'});
    }

    infoHandler($) {
        http.get(apiUrl, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
                if (data) {
                    let resData = JSON.parse(data);
                    if (!resData.error) {
                        $.sendMessage(dataHelper._parseData(resData), {parse_mode: 'Markdown'});
                    } else {
                        $.sendMessage(resData.error_code);
                    }
                }
                else {
                    $.sendMessage('Dwarf pool offline at the moment.');
                }
            });
        }).on('error', (err) => {
            console.log("Error: " + err.message);
        });
    }

    get routes() {
        return {
            'settingsCommand': 'settingsHandler',
            'infoCommand': 'infoHandler'
        };
    }
}

module.exports = DwarfController;