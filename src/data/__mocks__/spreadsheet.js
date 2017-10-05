const spreadSheet = jest.genMockFromModule('../spreadSheet');

export let checkAuth = spreadSheet.checkAuth;
export let loadData = spreadSheet.loadData;