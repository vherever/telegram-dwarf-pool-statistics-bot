'use strict';

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($) {
        let message = '';
        message += '*Sorry, I don\'t understand.*\n\n';
        message += 'Available commands:\n';
        message += '*/info* - _Get nodes statistics_;\n';
        message += '*/settings* - _Settings (not implemented yet)._\n';
        $.sendMessage(message, {parse_mode: 'Markdown'});
    }
}

module.exports = OtherwiseController;