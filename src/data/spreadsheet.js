import config from '../config';
/**
 * Get the user authentication status
 */
export function checkAuth(immediate) {
  return new Promise((resolve) => {
    window.gapi.load('client', () => {
      window.gapi.auth.authorize({
        'key': config.clientId,
        'scope': config.scope,
        'immediate': immediate
      }, resolve);
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
        key: config.clientId
      }).then(
        (response) => {
          resolve(response.result.values || []);
        },
        (response) => {
          reject(false, response.result.error);
        }
      );
    });

  });

  return promise;
}