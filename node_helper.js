/* Magic Mirror
 * Module: MMM-FuckOff
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getFuckOff: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body)[0];
				console.log(response.statusCode + result); // for checking
                this.sendSocketNotification('FUCKOFF_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_FUCKOFF') {
            this.getFuckOff(payload);
        }
    }
});