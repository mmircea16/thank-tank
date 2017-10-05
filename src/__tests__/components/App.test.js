'use strict';

import React from 'react';
import renderer from 'react-test-renderer';
jest.mock('../../data/spreadsheet');
jest.mock('../../helpers/randomColour');
jest.mock('../../data/card_store');
jest.mock('../../config');
import { checkAuth, loadData } from '../../data/spreadsheet';
import getCardStore from '../../data/card_store';
import config from '../../config';
import App from '../../components/App';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe("App", () => {
    it('render if not authenticated', (done) => {
        var promise = new Promise((resolve, reject) => {
            var authPromise = new Promise((resolve, reject) => resolve(false))
            checkAuth.mockReturnValue(authPromise);
            var app = renderer.create(<App />);
            authPromise.then(resolve.bind(null, app), reject);
        });
        promise.then((app) => {
            expect(app.toJSON()).toMatchSnapshot();
            done();
        });
    });

    it('render if authenticated and waiting for data', (done) => {
        var promise = new Promise((resolve, reject) => {
            var authPromise = new Promise((resolve, reject) => resolve(true))
            checkAuth.mockReturnValue(authPromise);
            var app = renderer.create(<App />);
            authPromise.then(resolve.bind(null, app), reject);
        });
        promise.then((app) => {
            expect(app.toJSON()).toMatchSnapshot();
            done();
        });
    });


    it('render if authenticated and data arrived', (done) => {
        var promise = new Promise((resolve, reject) => {
            var app = renderer.create(<App />);
            var getNextPromise = new Promise((resolveNext) => {
                var loadDataPromise = new Promise((resolve, reject) => {
                    resolve([['time', 'email', 'name', 'message', 'No'], ['time', 'email', 'name', 'message', 'No']]);
                });
                var authPromise = new Promise((resolve, reject) => resolve(true))
                checkAuth.mockReturnValue(authPromise);
                loadData.mockReturnValue(loadDataPromise);
                loadDataPromise.then(resolveNext.bind(null, {name:'name', message:'message', from:'thanked By'}));
            });
            getCardStore.mockReturnValue({ getNext: () => getNextPromise });
            getNextPromise.then(resolve.bind(null, app), reject);
        });
        promise.then((app) => {
            expect(app.toJSON()).toMatchSnapshot();
            done();
        });
    });
});