export default {
  clientId: '',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  spreadsheetId: '',
  speedLowerBound: 25,
  speedUpperBound: 35,
  gridSize: 12,
  timePerWord: 0.1,
  range: 'A2:E',
  mapping: {
    name: 2,
    from: 4,
    message: 3,
    secret: 4
  }
}
