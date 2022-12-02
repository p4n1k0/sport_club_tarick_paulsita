import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/TeamsModel';
import statusCodes from '../statusCodes';
import { matchData } from './mocks/match';

chai.use(chaiHttp);

const { app } = new App();

const { expect, request } = chai;

describe('Testando endpoint "/matches"', () => {
    before(() => {
        sinon.stub(TeamModel, 'findAll').resolves(matchData as TeamModel[]);
    });
    after(() => {
        (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('Testando busca de jogos', async () => {
        const data = await request(app).post('/matches');

        expect(data.status).to.be.eq(statusCodes.ok);
        expect(data.body).to.deep.equal(matchData);
    })
})