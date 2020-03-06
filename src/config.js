export default {
    apiKey: 'AIzaSyC4UvL_Yjq8Tef22E7Rj-HDafrxzRY4Iis', //google api key
    clientId: '302154217901-42dk7gumote0945geu0bq6vpotaa4qqu.apps.googleusercontent.com', //google client ID
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    spreadsheetId: '17lpXtlODcFYHK5kdDSpuO0sXimVwUrzQMbEnMVj8h0c', //ID for the spreadsheet
    speedLowerBound: 25, //lower bound for flip randomisation
    speedUpperBound: 35, //upper bound for flip randomisation
    gridSize: 12, //grid size for the cards
    timePerWord: 0.1, //to work out how long to show a message
    ranges: ['A2:F', 'Form Responses 1!A2:F'], //range for the data columns in the spreadsheet
    mapping: {
        //data mapping columns from spreadsheet
        name: 3,
        from: 2,
        message: 4,
        secret: 5
    }
};
