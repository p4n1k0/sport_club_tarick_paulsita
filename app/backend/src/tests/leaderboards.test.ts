import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { login } from './mocks/user';
import { leaderHome } from './mocks/leaderboards';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando o endpoint "/leaderboard"', () => {
    beforeEach(function () { sinon.restore(); });
    it('retorna classificação dos times da casa', async function () {
        const data = await chai.request(app).get('/leaderboard/home').send();
        
        expect(data.body).to.be.deep.eq(leaderHome)
    });
});
