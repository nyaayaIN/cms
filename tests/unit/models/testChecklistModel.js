var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');

const Checklist = keystone.list('Checklist');
const ChecklistModel = Checklist.model;

describe('Checklist model Test', function() {
    const tempChecklist = {
        title: { EN: 'Super', HI: 'Duper' },
        state: 'draft'
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            Checklist.should.be.a('Object');
            Checklist.should.have.property('model').be.a('Function');
            Checklist.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject a new Checklist without an English title', function(done) {
            const invalidChecklist = Object.assign({}, tempChecklist);
            delete invalidChecklist.title.EN;
            new ChecklistModel(invalidChecklist).validate((err) => {
                err.errors.should.have.property('title.EN').be.a('Object');
                done();
            });
        })
    });
    
    //out of describe to clear the err object. 

    it('should accept a new Checklist without state', function(done) {
        const validChecklist = Object.assign({}, tempChecklist);
        delete validChecklist.state;
        new ChecklistModel(validChecklist).validate((err) => {
            assert.isNull(err, 'there was no error');
            done();
        });
    });
});