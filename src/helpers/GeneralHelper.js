const moment = require('moment');

module.exports.apiBaseUrl = "https://chatr-api.herokuapp.com";

/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 */

module.exports.dateStamp = (date) => {
    return moment(date).calendar(null, {
        sameDay: '[Today]',
        lastDay: '[Yesterday]',
        lastWeek: 'dddd',
        sameElse: 'MMMM Do, YYYY'
    });
}

module.exports.timeStamp = (date) => {
    // Return the formatted string
    return moment(new Date(date)).format('h:mm a');
}