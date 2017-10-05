jest.mock('../../data/spreadsheet');
import { checkAuth, loadData } from '../../data/spreadsheet';
import getInstance, { reset } from '../../data/card_store';

describe("cardStore", () => {
    afterEach(() => {
        reset();
    });
    it('getNext should return with a promise', () => {

        var loadDataPromise = new Promise((resolve, reject) => {
            resolve([
                ['time', 'email', 'spreadsheet name', 'message', 'No'],
                ['time', 'email', 'name', 'message', 'No']]);
        });
        var authPromise = new Promise((resolve, reject) => {
            resolve(true);
        });
        checkAuth.mockReturnValueOnce(authPromise);
        loadData.mockReturnValueOnce(loadDataPromise);

        var cardStore = getInstance();
        var promise = cardStore.getNext();
        expect(promise).toBeDefined();
        expect(promise.then).toBeDefined();
    });

    it('getNext should resolve the promise with a card when data has arrived', (done) => {
        var loadDataPromise = new Promise((resolve, reject) => {
            resolve([
                ['time', 'fromName', 'spreadsheet name', 'message 1', 'No'],
                ['time', 'email', 'name', 'message 2', 'Yes']
            ]);
        });
        var authPromise = new Promise((resolve, reject) => {
            resolve(true);
        });
        checkAuth.mockReturnValue(authPromise);
        loadData.mockReturnValue(loadDataPromise);

        var cardStore = getInstance();
        var promise = cardStore.getNext();

        promise.then((card) => {
            expect(card).toBeDefined();
            expect(card).toEqual(
                {
                    name: 'spreadsheet name',
                    message: 'message 1',
                    from: 'fromName'
                });
        }).then(() => {
            var promise = cardStore.getNext();

            promise.then((card) => {
                expect(card).toBeDefined();
                expect(card).toEqual(
                    {
                        name: 'Anonymous',
                        message: 'message 2',
                        from: 'email'
                    });
                done();
            });
        });
    });
});