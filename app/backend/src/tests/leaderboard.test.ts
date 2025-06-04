import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { login } from './mocks/user';
import { leaderAway, leaderHome, leaderHomeAtt } from './mocks/leaderboards';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando o endpoint "/leaderboard"', () => {
    beforeEach(function () { sinon.restore(); });
    it('retorna classificação dos times da casa', async function () {
        const data = await chai.request(app).get('/leaderboard/home').send();

        expect(data.body).to.be.deep.eq(leaderHome);
    });

    it('atualiza e retorna classificação dos times da casa', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const matche = await chai.request(app).post('/matches').send({
            homeTeam: 4,
            homeTeamGoals: 2,
            awayTeam: 9,
            awayTeamGoals: 1,
        }).set('Authorization', token.body.token);

        await chai.request(app).patch(`/matches/${matche.body.id}/finish`).send().set('Authorization', token.body.token)

        const data = await chai.request(app).get('/leaderboard/home').send();

        expect(data.body).to.be.deep.eq(leaderHomeAtt);
    });

    it('retorna classificação dos times de fora', async function () {
        const data = await chai.request(app).get('/leaderboard/away').send();

        expect(data.body).to.be.deep.eq(leaderAway);
    });

    it('atualiza e retorna classificação dos times de fora', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const matche = await chai.request(app).post('/matches').send({
            homeTeam: 4,
            homeTeamGoals: 2,
            awayTeam: 9,
            awayTeamGoals: 1,
        }).set('Authorization', token.body.token);

        await chai.request(app).patch(`/matches/${matche.body.id}/finish`).send().set('Authorization', token.body.token)

        const data = await chai.request(app).get('/leaderboard/away').send();

        expect(data.status).to.be.deep.eq(200);
    });

    it('retorna classificação geral', async function () {
        const data = await chai.request(app).get('/leaderboard').send();

        expect(data.status).to.be.deep.eq(200);
    });

    it('atualiza e retorna classificação geral', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const matche = await chai.request(app).post('/matches').send({
            homeTeam: 7,
            homeTeamGoals: 3,
            awayTeam: 11,
            awayTeamGoals: 0,
        }).set('Authorization', token.body.token);

        await chai.request(app).patch(`/matches/${matche.body.id}/finish`).send().set('Authorization', token.body.token)

        const data = await chai.request(app).get('/leaderboard').send();

        expect(data.status).to.be.deep.eq(200);
    });
});
