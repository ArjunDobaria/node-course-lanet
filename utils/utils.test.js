const utils = require('./utils');
const expect = require('expect');

it('Testing function using mocha',() => {
    var res = utils.add(45,87);
});

it('Async Function', (done) => {
    utils.asyncAdd(5,5, (res) => {
        expect(res).toBe(10);
        done();
    })
});

it('Async Multiplication',(done) => {
    utils.asyncMul(5,(res) => {
        expect(res).toBe(25);
        done()
    })
})