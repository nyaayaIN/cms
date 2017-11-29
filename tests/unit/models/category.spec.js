var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function.

keystone.import('../../models');
const Category = keystone.list('Category');

describe('Category Schema', function() {
  it('should be a Mongoose Model', function(done) {
      Category.should.be.a('Object');
      Category.should.have.property('model').be.a('Function');
      Category.should.have.property('schema').be.a('Object');
      done();
  });

  it('should consist of name and description', function(done) {
      expect(Category.schema.tree).to.have.property('name');
      expect(Category.schema.tree).to.have.property('description');
      done();
  });

  it('should support English and Hindi', function(done) {
      expect(Category.schema.tree.name).to.have.property('EN');
      expect(Category.schema.tree.name).to.have.property('HI');
      expect(Category.schema.tree.description).to.have.property('EN');
      expect(Category.schema.tree.description).to.have.property('HI');
      done();
  });

  it('should require name in english when creating records', function(done) {
      expect(Category.schema.tree.name.EN).to.have.property('required');
      expect(Category.schema.tree.name.EN.required).to.be.true;
      done();
  });
});
