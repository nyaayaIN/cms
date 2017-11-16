/*This is to test your set up of keystone is valid and works*/
require('dotenv').config();

var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should;


var keystoneInit = require('../config.js').keystoneInit;

keystone.init(keystoneInit);


describe('keystone inital setup', function() {

    it('keystoneInit should have properties', function(done) {
        expect(keystoneInit).to.have.property('name');
        expect(keystoneInit).to.have.property('less');
        expect(keystoneInit).to.have.property('static');
        done();
    });

    it('keystoneInit should use fixed values', function(done) {
        expect(keystoneInit).to.have.property('view engine', 'pug');
        expect(keystoneInit).to.have.property('auth', true);
        expect(keystoneInit).to.have.property('user model', 'User');
        done();
    });

    it('keystone.init() should return a valid Object', function(done) {
        expect(keystone.init()).to.be.an('Object');
        done();
    });

});