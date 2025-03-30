import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchesModel from '../database/models/MatchesModel';
import statusCodes from '../statusCodes';
import { matchData, matchesEqualsTeam, matchesInProgress, matchesInserted, matchesNotInProgress, matcheTeamNotExist, matcheUpdated } from './mocks/match';

chai.use(chaiHttp);

const { app } = new App();

const { expect, request } = chai;

describe('Testando endpoint "/matches"', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSJ9LCJpYXQiOjE2NjkyOTU4MjV9.aH-mXCakA9lMP83O2IlWoSnAtQMNKC5LeSePBAJHBHM';

    describe('Testando busca de confrontos', () => {
        before(() => {
            sinon.stub(MatchesModel, 'findAll').resolves(matchData as MatchesModel[]);
        });
        after(() => {
            (MatchesModel.findAll as sinon.SinonStub).restore();
        });

        it('Testando busca de jogos', async () => {
            const data = await request(app).get('/matches').send();

            expect(data.status).to.be.eq(statusCodes.ok);
            expect(data.body).to.deep.equal(matchData);
            expect(data.body[0]).to.have.property('id');
            expect(data.body[0]).to.have.property('id');
            expect(data.body[0]).to.have.property('homeTeam');
            expect(data.body[0]).to.have.property('homeTeamGoals');
            expect(data.body[0]).to.have.property('awayTeam');
            expect(data.body[0]).to.have.property('awayTeamGoals');
            expect(data.body[0]).to.have.property('inProgress');
            expect(data.body[0]).to.have.property('teamHome');
            expect(data.body[0]).to.have.property('teamAway');
        });
    });

    describe('Testando listagem de todos os confrontos', () => {
        before(() => {
            sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgress as any)
        });
        after(() => {
            (MatchesModel.findAll as sinon.SinonStub).restore();
        })

        it('Testando se todos os confrontos em andamento são retornados', async () => {
            const data = await request(app).get('/matches?inProgress=true').send();

            expect(data.status).to.be.eq(statusCodes.ok);
            expect(data.body).to.eql(matchesInProgress);
        });
    });

    describe('Testando confrontos que não estão em andamento', () => {
        before(() => {
            sinon.stub(MatchesModel, 'findAll').resolves(matchesNotInProgress as any);
        });
        after(() => {
            (MatchesModel.findAll as sinon.SinonStub).restore();
        });

        it('Testando se confrontos que não estão andamento são retornados', async () => {
            const data = await request(app).get('/matches?inProgress=false').send();

            expect(data.status).to.be.eq(statusCodes.ok);
            expect(data.body).to.eq(matchesNotInProgress);
        });
    });

    describe('Testando inserção de confrontos', () => {
        before(() => {
            sinon.stub(MatchesModel, 'create').resolves(matchesInserted as any);
        });
        after(() => {
            (MatchesModel.create as sinon.SinonStub).restore();
        });

        it('Testando se inserção foi um sucesso', async () => {
            const data = await request(app).post('/matches').set('Authorization', token).send(matchesInserted);

            expect(data.status).to.be.eq(statusCodes.created);
            expect(data.body).to.eq(matchesInserted);
        });
    });

    describe('Testando endpoint PATCH "/:id/finish"', () => {
        before(() => {
            sinon.stub(MatchesModel, 'update').resolves();
        });
        after(() => {
            (MatchesModel.update as sinon.SinonStub).restore();
        });

        it('Testando retorno do endpoint "/matches/:id/finish" com sucesso', async () => {
            const data = await await request(app).patch('/matches/2/finish').set('Authorization', token).send();

            expect(data.status).to.be.eq(statusCodes.ok);
            expect(data.body).to.eq({ message: 'Finished' });
        });
    });

    describe('Testando finalização de confronto inexistente', () => {
        before(() => {
            sinon.stub(MatchesModel, 'update').resolves();
        });
        after(() => {
            (MatchesModel.update as sinon.SinonStub).restore();
        })

        it('Testando erro de busca de confronto finalizado inexistente', async () => {
            const matche = await request(app).patch('/matches/777/finish').set('Authorization', token).send();

            expect(matche.status).to.be.eq(statusCodes.notFound);
            expect(matche.body).to.eq({ message: 'Match not exist' });
        });
    });

    describe('Testando inserção de times iguais', () => {
        before(() => {
            sinon.stub(MatchesModel, 'update').resolves();
        });
        after(() => {
            (MatchesModel.update as sinon.SinonStub).restore();
        });

        it('Testando erro ao finalizar confronto inexistente', async () => {
            const matche = await request(app).post('/matches').set('Authorization', token).send(matchesEqualsTeam)

            expect(matche.status).to.be.eq(statusCodes.notFound);
            expect(matche.body).to.eq({ message: 'It is not possible to create a match with two equal teams' });
        });
    });

    describe('Testando inserção de um novo confronto com tima inexistente', () => {
        before(() => {
            sinon.stub(MatchesModel, 'create').resolves();
        });
        after(() => {
            (MatchesModel.create as sinon.SinonStub).restore();
        });

        it('Testando erro de inserção de confronto com time inexistente na tabela', async () => {
            const matche = await request(app).post('/matches').set('Authorization', token).send(matcheTeamNotExist);
            
            expect(matche.status).to.be.eq(statusCodes.notFound);
            expect(matche.body).to.eq({ message: 'There is no team with such id!' });
        });        
    });

    describe('Testando sucesso do endpoint PATCH "/matche/:id"', () => {
        before(() => {
            sinon.stub(MatchesModel, 'update').resolves();
        });
        after(() => {
            (MatchesModel.update as sinon.SinonStub).restore();
        });

        it('Testando retorno de atualização', async () => {
            const matche = await request(app).patch('/matches/1').set('Authorization', token).send(matcheUpdated);

            expect(matche.status).to.be.eq(statusCodes.ok);
            expect(matche.body).to.eq({ message: 'Match updated!' });
        });
    });

    describe('Testando falha do enpoint PATCH "/matche/:id"', () => {
        before(() => {
            sinon.stub(MatchesModel, 'update').resolves();
        });
        after(() => {
            (MatchesModel.update as sinon.SinonStub).restore();
        });

        it('Testando retorno de atualização de um confronto inexistente', async () => {
            const matche = await request(app).patch('/matches/777').set('Authorization', token).send(matcheUpdated);

            expect(matche.status).to.be.eq(statusCodes.notFound);
            expect(matche.body).to.eq({ message: 'Match not exist' });
        });
    });
});
