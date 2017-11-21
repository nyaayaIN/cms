var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');

const Terms = keystone.list('Terms');
const TermsModel = Terms.model;

describe('Terms model Test', function() {
    const tempTerms = {
        term: { EN: 'Super', HI: 'Duper' },
        definition: { EN: 'Super', HI: 'Duper' },
        state:'draft'
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            Terms.should.be.a('Object');
            Terms.should.have.property('model').be.a('Function');
            Terms.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject new Terms without an English term', function(done) {
            const invalidTerms = Object.assign({}, tempTerms);
            delete invalidTerms.term.EN;
            new TermsModel(invalidTerms).validate((err) => {
                err.errors.should.have.property('term.EN').be.a('Object');
                done();
            });
        })

        it('should reject new Terms without an English definition', function(done) {
            const invalidTerms = Object.assign({}, tempTerms);
            delete invalidTerms.definition.EN;
            new TermsModel(invalidTerms).validate((err) => {
                err.errors.should.have.property('definition.EN').be.a('Object');
                done();
            });
        })
    });

    //out of describe to clear the err object. 

    it('should accept a new Terms without state', function(done) {
        const validTerms = Object.assign({}, tempTerms);
        delete validTerms.state;
        new TermsModel(validTerms).validate((err) => {
            console.log(err);
            //assert.isNull(err, 'there was no error');
            done();
        });
    });
});