import config from '../config';
/**
 * Get the user authentication status
 */
export function checkAuth(immediate) {
  return new Promise((resolve) => {

    window.gapi.load('client:auth2', () => {
      console.log("config", config)
      window.gapi.client.init({
        'apiKey': config.apiKey,
        'clientId': config.clientId,
        'scope': config.scope,
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
      }).then( () => {
        console.log('resolve');
        resolve()
      });
    });
  });
}

/**
 * Load the quotes from the spreadsheet
 * Embellish them with user own likes
 */
export function loadData() {
  var promise = new Promise((resolve, reject) => {
    window.gapi.client.load('sheets', 'v4', () => {
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: config.range,
      }).then(
        (response) => {
          resolve(filterEmptyThankees(response.result.values));
        },
        (response) => {
          reject(false, response.result.error);
        }
      );
    });

  });

  return promise;
}

let filterEmptyThankees = function (values) {
  if (!values) return [];

  console.log(values)
  console.log(config.mapping.name)
  return values.filter(row => row[config.mapping.name] && (row[config.mapping.name] !== ''))
};