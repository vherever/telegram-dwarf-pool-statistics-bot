'use strict';

const humanizeDuration = require('humanize-duration');

class DataHelper {
    _formatTime(sec) {
        return humanizeDuration(sec * 1000);
    }

    _parseData(data, price) {
        let parsed = '*3CAP NODES STATS:*\n';
        parsed += `*Total shares*: _${data.total_hashrate}_\n`;
        parsed += `*Wallet balance*: _${data.wallet_balance} ETH_\n`;
        parsed += `*ETH course*: _${parseFloat(price).toFixed(2)} USD_\n`;
        parsed += `*Earning 24h*: _${data.earning_24_hours} ETH (${parseFloat(data.earning_24_hours * price).toFixed(2)} USD)_\n\n`;
        for (let key in data.workers) {
            if (data.workers.hasOwnProperty(key)) {
                let dataWorkerByKey = data.workers[key];
                parsed += `*[${key}]*\n`;
                parsed += `*Alive*: _${dataWorkerByKey.alive}_\n`;
                parsed += `*Hashrate*: _${dataWorkerByKey.hashrate}_\n`;
                parsed += `*Last submit*: _${dataWorkerByKey.last_submit}_\n`;
                parsed += `*Last share*: _${this._formatTime(dataWorkerByKey.second_since_submit)} ago..._\n\n`;
            }
        }
        return parsed;
    }
}

module.exports = DataHelper;