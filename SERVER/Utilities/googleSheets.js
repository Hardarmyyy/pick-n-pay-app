const { google } = require('googleapis')

const registerGoogleSheets = async (userRole, username, email) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "picknpay.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    //create client instance for auth
    const client  = await auth.getClient();

    //instance of googlesheet apis
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })

    // get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth: auth,
        spreadsheetId: process.env.GOOGLESPREADSHEETID
    })

    // write rows to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: process.env.GOOGLESPREADSHEETID,
        range: "Sheet1!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [userRole, username, email]
            ]
        }
    })
}

module.exports = {
    registerGoogleSheets
}