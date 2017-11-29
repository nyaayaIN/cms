var keystone = require('keystone');
var chai = require('chai'),
	assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');
const User = keystone.list('User')

describe('User Schema', function() {
	it('should be a Mongoose Model', function(done) {
			User.should.be.a('Object');
			User.should.have.property('model').be.a('Function');
			User.should.have.property('schema').be.a('Object');
			done();
	});

	it('should require email', function(done) {
			expect(User.schema.tree.email).to.have.property('required');
			expect(User.schema.tree.email.required).to.be.true;
			done();
	});

	it('should require password', function(done) {
			expect(User.schema.tree.password).to.have.property('required');
			expect(User.schema.tree.password.required).to.be.true
			done();
	});
});
