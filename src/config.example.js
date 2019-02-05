export default {
  clientId: '', //google client ID
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  spreadsheetId: '', //ID for the spreadsheet
  speedLowerBound: 25, //lower bound for flip randomisation
  speedUpperBound: 35, //upper bound for flip randomisation
  gridSize: 12, //grid size for the cards
  timePerWord: 0.1, //to work out how long to show a message
  range: 'A2:E', //range for the data columns in the spreadsheet
  mapping: { //data mapping columns from spreadsheet
    name: 2,
    from: 4,
    message: 3,
    secret: 4
  }
}
