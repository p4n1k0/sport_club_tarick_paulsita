import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste da rota base "/"', () => {
  describe('Testa se a requisição foi feita com sucesso', () => {
    it('Testa se retorna mensagem "ok"', async () => {
      const httResponse = await chai.request(app).get('/');

      expect(httResponse.body).to.deep.equal({ ok: true });
    });
  })

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
