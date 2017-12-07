var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');

const Explanation = keystone.list('Explanation');

describe('Explanation Schema', function() {
  it('should be a Mongoose Model', function(done) {
      Explanation.should.be.a('Object');
      Explanation.should.have.property('model').be.a('Function');
      Explanation.should.have.property('schema').be.a('Object');
      done();
  });
});
