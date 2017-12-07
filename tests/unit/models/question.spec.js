var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');

const Questions = keystone.list('Questions');

describe('Questions Schema', function() {
  it('should be a Mongoose Model', function(done) {
      Questions.should.be.a('Object');
      Questions.should.have.property('model').be.a('Function');
      Questions.should.have.property('schema').be.a('Object');
      done();
  });
});
