const Telegram = require('telegram-node-bot');

require('dotenv').config();

const config = {
    token: process.env.TOKEN,
    wallet: process.env.WALLET
};

const tg = new Telegram.Telegram(config.token, {
    workers: 1
});

const DwarfController = require('./controllers/dwarf'),
    OtherwiseController = require('./controllers/otherwise');

const dwarfCtrl = new DwarfController();

tg.router.when(new Telegram.TextCommand('/settings', 'settingsCommand'), dwarfCtrl)
    .when(new Telegram.TextCommand('/info', 'infoCommand'), dwarfCtrl)
    .otherwise(new OtherwiseController());