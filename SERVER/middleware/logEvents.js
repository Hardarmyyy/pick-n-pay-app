const {logEvents} = require('../Utilities/logEvents')


const logger = (req, res, next) => {
    logEvents(`${req.path}\t${req.method}\t${req.headers.origin}`, 'eventsLog.txt');
    next()
}

module.exports = {logger}