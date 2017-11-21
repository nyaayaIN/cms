var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');

const Questions = keystone.list('Questions');
const QuestionsModel = Questions.model;

describe('Questions model Test', function() {
    const tempQuestions = {
        question: { EN: 'Super', HI: 'Duper' },
        state: 'draft'
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            Questions.should.be.a('Object');
            Questions.should.have.property('model').be.a('Function');
            Questions.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject a new Questions without an English question', function(done) {
            const invalidQuestions = Object.assign({}, tempQuestions);
            delete invalidQuestions.question.EN;
            new QuestionsModel(invalidQuestions).validate((err) => {
                err.errors.should.have.property('question.EN').be.a('Object');
                done();
            });
        })
    });
    
    //out of describe to clear the err object. 

    it('should accept a new Questions without state', function(done) {
        const validQuestions = Object.assign({}, tempQuestions);
        delete validQuestions.state;
        new QuestionsModel(validQuestions).validate((err) => {
            assert.isNull(err, 'there was no error');
            done();
        });
    });
});