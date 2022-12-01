import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/TeamsModel';
import { team, teamData } from './mocks/team';
import statusCodes from '../statusCodes';

chai.use(chaiHttp);

const { app } = new App();

const { expect, request } = chai;

describe('Testando o endpoint "/teams"', () => {
    before(() => {
        sinon.stub(TeamModel, 'findAll').resolves(teamData as TeamModel[]);
    });
    after(() => {
        sinon.stub(TeamModel.findAll as sinon.SinonStub).restore();
    });

    describe('Testando busca dos times', () => {
        it('Testando retorno de todos os times', async () => {
            const data = await request(app).get('/teams').send();

            expect(data.status).to.be.eq(statusCodes.ok);
            expect(data.body).to.eq(teamData);
            expect(data.body[0]).to.have.property('id');
            expect(data.body[0]).to.have.property('teamName');
        });
    });

    describe('Testando busca de time com sucesso', () => {
        before(() => {
            sinon.stub(TeamModel, 'findOne').resolves(team as TeamModel);
        });
        after(() => {
            (TeamModel.findOne as sinon.SinonStub).restore();
        });

        it('Testando retorno do endpoint "teams/:id"', async () => {
            const data = await request(app).get('/teams/1').send();

            expect(data.status).to.be.eq(statusCodes.ok);
            expect(data.body).to.be.eq(team);
        });
    });

    describe('Testando busca de time com falha', () => {
        before(() => {
            sinon.stub(TeamModel, 'findOne').resolves();
        });
        after(() => {
            (TeamModel.findOne as sinon.SinonStub).restore();
        });

        it('Testando retorno do endpoint "teams/:id"', async () => {
            const data = await request(app).get('/teams/50').send();

            expect(data.status).to.be.eq(statusCodes.notFound);
            expect(data.body.message).to.eq('Team not exist');
        });
    });
});
