import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UsersModel';
import { userData, login } from './mocks/user';
import * as jwt from 'jsonwebtoken';
import statusCodes from '../statusCodes';

chai.use(chaiHttp);

const { app } = new App();

const { expect, request } = chai;

describe('Testando o endpoint "/login"', () => {
  before(() => {
    sinon.stub(UserModel, 'findOne').resolves(userData.valid as UserModel);
  });
  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('Testando sucesso de login', async () => {
    const data = await request(app).post('/login').send(login.valid);

    expect(data.status).to.be.eq(statusCodes.ok);
    expect(data.body).to.have.property('token');
  });
});

describe('Testando falha de e-mail inválido', () => {
  it('Testando erro ao logar com e-mail inválido', async () => {
    const data = await request(app).post('/login').send(login.emailInvalid);

    expect(data.status).to.be.eq(statusCodes.badRequest);
    expect(data.body.message).to.eq('All fields must be filled');
  });
});

describe('Testando usuário inexistente', () => {
  it('Testando retorno de erro ao logar com usuário inexistente', async () => {
    const data = await request(app).post('/login').send(login.userNotExist);

    expect(data.status).to.be.eq(statusCodes.unauthorized);
    expect(data.body.message).to.eq('Incorrect email or password')
  });
});

describe('Testando senha incorreta', () => {
  it('Testando retorno de erro ao logar com senha incorreta', async () => {
    const data = await request(app).post('/login').send(login.passwordIncorrect);

    expect(data.status).to.be.eq(statusCodes.unauthorized);
    expect(data.body.message).to.eq('Incorrect email or password');
  });
});

describe('Testando token válido', () => {
  before(() => {
    sinon.stub(jwt, 'verify').returns({ data: login.valid } as any);
  });
  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('Testando retorno de token quando o usuário é válido', async () => {
    const data = await request(app).get('/login/validate').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc').send();

    expect(data.status).to.be.eq(statusCodes.ok);
    expect(data.body).to.eq({ role: userData.valid.role });
  });
})

describe('Testando token inválido', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves();
  });
  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
  });

  it('Testando retorno de token quando usuário é inválido', async () => {
    const data = await request(app).get('/login/validate').send();

    expect(data.status).to.be.eq(statusCodes.unauthorized);
  });
});
