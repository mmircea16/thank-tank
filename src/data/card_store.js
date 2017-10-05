"use srtict";
import { checkAuth, loadData } from './spreadsheet'
import config from '../config';

var mapping = config.mapping;
var actualDataPromise;
var isPending = false;
var lastShown = -1;

function fetchData() {
    if (!isPending) {

        isPending = true;
        actualDataPromise = new Promise((resolve) => {
            checkAuth(true).then((authResult) => {
                loadData()
                    .then(resolve)
                    .then(() => {
                        isPending = false;
                    });
            });
        });
    }
}

function getShowIndex(rowCount){
    var showIndex = lastShown + 1;
    if(showIndex < rowCount)
        return showIndex;
    return Math.floor(Math.random()*rowCount);
}

class CardStore {
    constructor() {
        fetchData();
    }

    getNext() {
        fetchData();
        return new Promise((resolve, reject) => {
            actualDataPromise.then((rows) => {
                var showIndex = getShowIndex(rows.length);
                var hasName = rows[showIndex][mapping.secret] !== 'Yes';
                var from = hasName && rows[showIndex][mapping.from] || 'Anonymous';
                resolve({
                    name: rows[showIndex][mapping.name],
                    message: rows[showIndex][mapping.message],
                    from: from
                });
                lastShown = showIndex > lastShown ? showIndex : lastShown;
            });
        });
    }
}

export function reset() {
    console.warn('depricated call reset (only allowed in tests)');
    lastShown = -1;
    isPending = false;
}

export default function getInstance() {
    return new CardStore();
}