const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises


const logEvents = async (message, logFile) => {
    const time = new Date();
    const dateTimeSeconds = format(time, 'yyyy-MM-dd hh:mm:ss a') // define a date object and format to readable time;

    // define the logItem
    const logItem = `${dateTimeSeconds}\t ${uuid()}\t ${message}\n`
    console.log(logItem)

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) { // checking to see if the logs folder exist
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        // testing
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem)
    }
    catch (err) {
        console.log(err.message)
    }
}


module.exports = {
    logEvents
}