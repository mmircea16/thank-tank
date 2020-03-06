import config from '../config';
/**
 * Get the user authentication status
 */
export function checkAuth(immediate) {
  return new Promise((resolve) => {

    window.gapi.load('client:auth2', () => {
      console.log("config", config)
      window.gapi.client.init({
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
      window.gapi.client.sheets.spreadsheets.values.batchGet({
        spreadsheetId: config.spreadsheetId,
        ranges: config.ranges,
      }).then(
        (response) => {
          let allRanges = response.result.valueRanges;
          let allThanks = allRanges.flatMap(range => range.values);
          resolve(filterEmptyThankees(allThanks));
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

  return values.filter(row => row[config.mapping.name] && (row[config.mapping.name] !== ''))
};