import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { login } from './mocks/user';
import { allMatches, matchData, matchesEqualsTeam, matchesInProgress, matchesNotInProgress, matcheTeamNotExist } from './mocks/matches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando o endpoint "/matches"', () => {
    beforeEach(function () { sinon.restore(); });
    it('retorna partidas', async function () {
        const data = await chai.request(app).get('/matches').send();

        expect(data.body).to.be.deep.eq(allMatches);
    });

    it('retorna partidas em andamento', async function () {
        const data = await chai.request(app).get('/matches?inProgress=true').send();

        expect(data.body).to.be.deep.eq(matchesInProgress);
    });

    it('retorna partidas finalizadas', async function () {
        const data = await chai.request(app).get('/matches?inProgress=false').send();

        expect(data.body).to.be.deep.eq(matchesNotInProgress);
    });

    it('será possível salvar uma partida em andamento como true no banco de dados', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const data = await chai.request(app).post('/matches').send({
            homeTeam: 16,
            homeTeamGoals: 2,
            awayTeam: 8,
            awayTeamGoals: 2,
        }).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({
            id: data.body.id,
            homeTeam: data.body.homeTeam,
            homeTeamGoals: data.body.homeTeamGoals,
            awayTeam: data.body.awayTeam,
            awayTeamGoals: data.body.awayTeamGoals,
            inProgress: true
        });
    });

    it('altera partida em andamento para finalizada', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const data = await chai.request(app).patch('/matches/:id/finish').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq('Finished');
    });

    it('ao inserir partidas iguais, retorne um erro', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const data = await chai.request(app).post('/matches').send(matchesEqualsTeam).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(422);
        expect(data.body).to.be.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('ao inserir partida inexistente, retorne um erro', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const data = await chai.request(app).post('/matches').send(matcheTeamNotExist).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'There is no team with such id!' });
    });

    it('ao inserir partida com token inválido, retorne um erro', async function () {
        const data = await chai.request(app).post('/matches').send({
            homeTeam: 16,
            homeTeamGoals: 2,
            awayTeam: 8,
            awayTeamGoals: 2,
        }).set('Authorization', 'Bearer 123');

        expect(data.status).to.be.deep.eq(401);
        expect(data.body).to.be.deep.eq({ message: 'Token must be a valid token' });
    });

    it('altera partida em andamento', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const data = await chai.request(app).patch('/matches/:id').send({ homeTeamGoals: 3, awayTeamGoals: 1 }).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
    });
});
