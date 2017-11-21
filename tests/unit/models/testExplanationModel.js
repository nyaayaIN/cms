var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');

const Explanation = keystone.list('Explanation');
const ExplanationModel = Explanation.model;

describe('Explanation model Test', function() {
    const tempExplanation = {
        title: { EN: 'Super', HI: 'Duper' },
        state: 'draft'
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            Explanation.should.be.a('Object');
            Explanation.should.have.property('model').be.a('Function');
            Explanation.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject a new Explanation without an English title', function(done) {
            const invalidExplanation = Object.assign({}, tempExplanation);
            delete invalidExplanation.title.EN;
            new ExplanationModel(invalidExplanation).validate((err) => {
                err.errors.should.have.property('title.EN').be.a('Object');
                done();
            });
        })
    });
    
    //out of describe to clear the err object. 

    it('should accept a new Explanation without state', function(done) {
        const validExplanation = Object.assign({}, tempExplanation);
        delete validExplanation.state;
        new ExplanationModel(validExplanation).validate((err) => {
            assert.isNull(err, 'there was no error');
            done();
        });
    });
});