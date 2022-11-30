import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/TeamsModel';
import { Response } from 'superagent';
import { teamData } from './mocks/team';
import statusCodes from '../statusCodes';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando o endpoint "/teams"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
        sinon.stub(TeamModel, 'findAll').resolves(teamData as TeamModel[]);
    });
    after(() => {
        sinon.stub(TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('Testando se retorna todos os times', async () => {
        chaiHttpResponse = await chai.request(app).post('/teams');

        expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
        expect(chaiHttpResponse.body).to.deep.equal(teamData);
    });
});
function before(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}

function after(arg0: () => void) {
    throw new Error('Function not implemented.');
}

