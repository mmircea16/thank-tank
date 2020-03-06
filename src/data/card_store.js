"use srtict";
import { checkAuth, loadData } from './spreadsheet'
import config from '../config';

var mapping = config.mapping;
var actualDataPromise;
var isPending = false;
var lastShown = -1;
var lengthOfData = 0;
var timeouts = [];

function fetchData() {
    if (!isPending) {

        isPending = true;
        var tempPromise = new Promise((resolve) => {
            checkAuth(true)
                .then((authResult) => {
                    loadData()
                        .then(resolve)
                        .then(timeout.bind(null, config.minRefreshRate));
                });
        });
        tempPromise.then(() => {actualDataPromise = tempPromise});
        if (!actualDataPromise) actualDataPromise = tempPromise;
        timeout(config.minRefreshRate * 2);
    }
}

function timeout(timeoutInSec) {
    var timeout = setTimeout(() => {
        isPending = false
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts = [];
    }, timeoutInSec * 1000);
    timeouts.push(timeout);
}

function getShowIndex(rowCount) {
    var showIndex = lastShown + 1;
    if (showIndex < rowCount)
        return showIndex;
    return Math.floor(Math.random() * rowCount);
}

class CardStore {
    constructor() {
        fetchData();
    }

    getNext() {
        if (lengthOfData - 1 <= lastShown) {
            fetchData();
        }
        return new Promise((resolve, reject) => {
            actualDataPromise.then((rows) => {
                lengthOfData = rows.length;
                var showIndex = getShowIndex(rows.length);
                var from = (rows[showIndex][mapping.from]) || 'Anonymous';
                resolve({
                    name: rows[showIndex][mapping.name] || '',
                    message: rows[showIndex][mapping.message] || '',
                    from: from,
                    secret:  rows[showIndex][mapping.secret]
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
    lengthOfData = 0;
    actualDataPromise = null;
}

export default function getInstance() {
    return new CardStore();
}