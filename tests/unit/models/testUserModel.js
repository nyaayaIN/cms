var keystone = require('keystone');
var chai = require('chai'),
	assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');
const User = keystone.list('User')
const UserModel = User.model;

describe('User model Test', function() {
    const tempUser = {
        name: {
            first: 'Super',
            last: 'Duper',
        },
        email: 'test@test.com',
        password: 'test'
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            User.should.be.a('Object');
            User.should.have.property('model').be.a('Function');
            User.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject a new user without email', function(done) {
            const invalidUser = Object.assign({}, tempUser);
            delete invalidUser.email;
            new UserModel(invalidUser).validate((err) => {
                assert.equal('Path `email` is required.', err.errors.email.message);
                done();
            });
        });

        it('should reject a new user without password', function(done) {
            const invalidUser = Object.assign({}, tempUser);
            delete invalidUser.password;
            new UserModel(invalidUser).validate((err) => {
                assert.equal('Path `password` is required.', err.errors.password.message);
                done();
            });
        });
    });
});