'use strict';

const express = require('express');
const app = express();

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

app.set('port', (process.env.PORT || 3000));
app.get('/', function(request, response) {

});

const Telegram = require('telegram-node-bot');

require('dotenv').config();

const token = process.env.TOKEN;

const tg = new Telegram.Telegram(token, {
    workers: 1,
    webAdmin: {
        port: 3000,
        host: 'localhost'
    }
});

const DwarfController = require('./controllers/dwarf'),
    OtherwiseController = require('./controllers/otherwise');

const dwarfCtrl = new DwarfController();

tg.router.when(new Telegram.TextCommand('/settings', 'settingsCommand'), dwarfCtrl)
    .when(new Telegram.TextCommand('/info', 'infoCommand'), dwarfCtrl)
    .otherwise(new OtherwiseController());