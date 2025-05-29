import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import { login } from './mocks/user';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Test endpoint /login', function () {
    beforeEach(function () { sinon.restore(); });
    it('ao receber email e senha válidos, retorne um token', async function () {
        const data = await chai.request(app).post('/login').send(login.valid);

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.have.key('token');
    });

    it('ao não receber um email ou uma senha, retorne um erro', async function () {
        const data = await chai.request(app).post('/login').send({ email: '', password: '' });

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: 'All fields must be filled' });
    });

    it('ao receber dados inválidos, retorne um erro', async function () {
        const data = await chai.request(app).post('/login').send(login.userNotExist);

        expect(data.status).to.be.deep.eq(401);
        expect(data.body).to.be.deep.eq({ message: 'Incorrect email or password' });
    });

    it('tentando endpoint "/login/validate"', async function () {
        const token = await chai.request(app).post('/login').send(login.valid);
        const data = await chai.request(app).get('/login/validate').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq({ role: 'admin' });
    });

});
