import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import { teamData } from './mocks/teams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando o endpoint "/teams"', () => {
    beforeEach(function () { sinon.restore(); });
    it('retorna todos os times', async function () {
        const data = await chai.request(app).get('/teams').send();

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq(teamData);
    });

    it('retorna time pelo id', async function () {
        const data = await chai.request(app).get('/teams/1').send();

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq(teamData[0])
    });

});
