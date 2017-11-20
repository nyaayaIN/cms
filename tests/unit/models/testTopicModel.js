var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');

const Topic = keystone.list('Topic');
const TopicModel = Topic.model;

describe('Topic model Test', function() {
    const tempTopic = {
        name: { EN: 'Super', HI: 'Duper' },
        summary: { EN: 'draft', HI: 'throw' }
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            Topic.should.be.a('Object');
            Topic.should.have.property('model').be.a('Function');
            Topic.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject a new Topic without an English name', function(done) {
            const invalidTopic = Object.assign({}, tempTopic);
            delete invalidTopic.name.EN;
            new TopicModel(invalidTopic).validate((err) => {
                err.errors.should.have.property('name.EN').be.a('Object');
                done();
            });
        })
    });

    //out of describe to clear the err object. 

    it('should accept a new Topic without summary', function(done) {
        const validTopic = Object.assign({}, tempTopic);
        delete validTopic.summary;
        new TopicModel(validTopic).validate((err) => {
            assert.isNull(err, 'there was no error');
            done();
        });
    });
});