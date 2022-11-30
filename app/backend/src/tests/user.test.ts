import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UsersModel';
import { userData } from './mocks/user';

import { Response } from 'superagent';
import { before, after } from 'node:test';
import statusCodes from '../statusCodes';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando o endpoint "/login"', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(UserModel, 'findOne').resolves(userData as UserModel);
  });
  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('Testando sucesso de login', async () => {
    chaiHttpResponse = await chai.request(app).post('/login');

    expect(chaiHttpResponse.status).to.be.eq(statusCodes.ok);
    expect(chaiHttpResponse.body).to.deep.equal(userData);
  });  
});
