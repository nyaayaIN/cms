var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');

const Checklist = keystone.list('Checklist');

describe('Checklist Schema', function() {
  it('should be a Mongoose Model', function(done) {
      Checklist.should.be.a('Object');
      Checklist.should.have.property('model').be.a('Function');
      Checklist.should.have.property('schema').be.a('Object');
      done();
  });
});
