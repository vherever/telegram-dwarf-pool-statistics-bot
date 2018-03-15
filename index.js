const Telegram = require('telegram-node-bot');

require('dotenv').config();

const token = process.env.TOKEN;

const tg = new Telegram.Telegram(token, {
    workers: 1
});

const DwarfController = require('./controllers/dwarf'),
    OtherwiseController = require('./controllers/otherwise');

const dwarfCtrl = new DwarfController();

tg.router.when(new Telegram.TextCommand('/settings', 'settingsCommand'), dwarfCtrl)
    .when(new Telegram.TextCommand('/info', 'infoCommand'), dwarfCtrl)
    .otherwise(new OtherwiseController());