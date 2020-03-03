export default {
    apiKey: 'AIzaSyC4UvL_Yjq8Tef22E7Rj-HDafrxzRY4Iis', //google client ID
    clientId: '302154217901-42dk7gumote0945geu0bq6vpotaa4qqu.apps.googleusercontent.com', //google client ID
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    spreadsheetId: '1tzG2gBFiE75bDN7QctnlwpEbncR5u425LUFESLRZRFE', //ID for the spreadsheet
    speedLowerBound: 25, //lower bound for flip randomisation
    speedUpperBound: 35, //upper bound for flip randomisation
    gridSize: 12, //grid size for the cards
    timePerWord: 0.1, //to work out how long to show a message
    range: 'A2:E', //range for the data columns in the spreadsheet
    mapping: {
        //data mapping columns from spreadsheet
        name: 2,
        from: 1,
        message: 3,
        secret: 4
    }
};
