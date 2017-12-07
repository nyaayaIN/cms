var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');

const Terms = keystone.list('Terms');

describe('Terms Schema', function() {
  it('should be a Mongoose Model', function(done) {
      Terms.should.be.a('Object');
      Terms.should.have.property('model').be.a('Function');
      Terms.should.have.property('schema').be.a('Object');
      done();
  });
});
