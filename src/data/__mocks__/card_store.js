const cardStore = jest.genMockFromModule('../card_store');
let getInstance = cardStore.default;
export default getInstance;
export let reset = cardStore.reset;