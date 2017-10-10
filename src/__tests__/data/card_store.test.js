jest.mock('../../data/spreadsheet');
import { checkAuth, loadData } from '../../data/spreadsheet';
import getInstance, { reset } from '../../data/card_store';

describe("cardStore", () => {
    afterEach(() => {
        reset();
    });
    it('getNext should return with a promise', () => {

        var loadDataPromise = Promise.resolve([
            ['time', 'email', 'spreadsheet name', 'message', 'No'],
            ['time', 'email', 'name', 'message', 'No']]);
        var authPromise = Promise.resolve(true);
        checkAuth.mockReturnValueOnce(authPromise);
        loadData.mockReturnValueOnce(loadDataPromise);

        var cardStore = getInstance();
        var promise = cardStore.getNext();
        expect(promise).toBeDefined();
        expect(promise.then).toBeDefined();
    });

    it('getNext should resolve the promise with a card when data has arrived', (done) => {
        var loadDataPromise = Promise.resolve([
            ['time', 'toName', 'spreadsheet name', 'message 1', 'fromName'],
            ['time', 'email', 'name', 'message 2', '']
        ]);

        var authPromise = Promise.resolve(true);
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
                        name: 'name',
                        message: 'message 2',
                        from: 'Anonymous'
                    });
                done();
            });
        });
    });
});