var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');

const Topic = keystone.list('Topic');
const TopicModel = Topic.model;

describe('Topic Schema', function() {
  it('should be a Mongoose Model', function(done) {
      Topic.should.be.a('Object');
      Topic.should.have.property('model').be.a('Function');
      Topic.should.have.property('schema').be.a('Object');
      done();
  });
});
