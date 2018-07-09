const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const nodemailer = require('nodemailer');

const transport = {
  sendMail: sinon.spy(),
};

// Fake return of an function
sinon.stub(nodemailer, 'createTransport').returns(transport);;

const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../index');
const factory = require('../factories');
const User = mongoose.model('User');

describe('Authentication', () => {
  beforeEach(async () => {
    await User.remove();
  });

  // SignUp

  describe('Sign up', () => {
    it('it should be able to sign up', async () => {
      const user = await factory.attrs('User');
      const response = await chai.request(app)
        .post('/api/signup')
        .send(user);
      expect(response.body.result).to.have.property('user');
      expect(response.body.result).to.have.property('token');
    });

    it('it should not be able to sign up with duplicates', async () => {
      const user = await factory.create('User');
      const user2 = await factory.attrs('User', {
        email: user.email
      });

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user2);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('success').equal(false);
    });
  });

  // SignIn

  describe('Sign in', () => {
    it('it should be able to authenticate with valid credentials', async () => {
      const user = await factory.create('User', {
        password: '123'
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: '123' });

      expect(response.body.result).to.have.property('user');
      expect(response.body.result).to.have.property('token');
      expect(transport.sendMail.calledOnce).to.be.true;
    });

    it('it should not be able to signin with none existent user', async () => {
      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: 'notExist@test.com', password: '123' });

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('success').equal(false);
    });

    it('it should not be able to signin with wrong password', async () => {
      const user = await factory.create('User', {
        password: '123456'
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: '123' });

        expect(response).to.have.status(200);
        expect(response.body).to.have.property('success').equal(false);
    });

  });

});

