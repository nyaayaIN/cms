var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');
const Category = keystone.list('Category');
const CategoryModel = Category.model;

describe('Category model Test', function() {
    const tempCategory = {
        name: { EN: 'Super', HI: 'Duper' },
        description: {
            EN: 'test',
            HI: ''
        }
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            Category.should.be.a('Object');
            Category.should.have.property('model').be.a('Function');
            Category.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject a new Category without an English name', function(done) {
            const invalidCategory = Object.assign({}, tempCategory);
            delete invalidCategory.name.EN;
            new CategoryModel(invalidCategory).validate((err) => {
                err.errors.should.have.property('name.EN').be.a('Object');
                done();
            });
        });
    });
    //out of describe to clear the err object. 
    it('should accept a new Category without description', function(done) {
        const validCategory = Object.assign({}, tempCategory);
        delete validCategory.description;
        new CategoryModel(validCategory).validate((err) => {
            assert.isNull(err, 'there was no error');
            done();
        });
    });
});