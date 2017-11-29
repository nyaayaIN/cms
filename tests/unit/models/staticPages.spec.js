var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');

const StaticPage = keystone.list('StaticPage');

describe('StaticPage Schema', function() {
  it('should be a Mongoose Model', function(done) {
      StaticPage.should.be.a('Object');
      StaticPage.should.have.property('model').be.a('Function');
      StaticPage.should.have.property('schema').be.a('Object');
      done();
  });
});
