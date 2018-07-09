const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const factory = require('../factories');

const httpMock = require('node-mocks-http'); //simulate res, req
const authMiddleware = require('../../app/middlewares/auth');

describe('Auth Middleware', () => {
  it('it should validate the presence of Jwt Token', async () => {
    const request = httpMock.createRequest();
    const response = httpMock.createResponse();

    await authMiddleware(request, response);
    expect(response.statusCode).to.be.eq(401);
  });

  it('it should validate if token is valid', async () => {
    const response = httpMock.createResponse();
    const request = httpMock.createRequest({
      headers: {
        authorization: 'Bearer 123123123',
      },
    });

    await authMiddleware(request, response);
    expect(response.statusCode).to.be.eq(401);
  });

  it('it should pass if token is valid', async () => {
    const user = await factory.create('User');
    const response = httpMock.createResponse();
    const request = httpMock.createRequest({
      headers: {
        authorization: `Bearer ${user.generateToken()}`,
      },
    });

    const nextSpy = sinon.spy();

    await authMiddleware(request, response, nextSpy);
    expect(request).to.include({ userId: user.id });
    expect(nextSpy.calledOnce).to.be.true;
  });
});
