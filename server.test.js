const request = require('supertest');
const chai = require('chai');
var expect = chai.expect;
var app = require('./server').app;

it('is should return string',(done) => {
    request(app)
    .get('/')
    .expect(404)
    .expect((res) => {
        expect(res.body.Name).to.equal('Should to wait');
    })
    .end(done);
});