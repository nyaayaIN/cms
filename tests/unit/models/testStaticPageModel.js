var keystone = require('keystone');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    should = chai.should(); //actually call the function. 

keystone.import('../models');

const StaticPage = keystone.list('StaticPage');

const StaticPageModel = StaticPage.model;

describe('StaticPage model Test', function() {
    const tempStaticPage = {
        title: { EN: 'Super', HI: 'Duper' },
        state: 'draft'
    };
    describe('Validation', function() {
        it('should be a Mongoose Model', function(done) {
            StaticPage.should.be.a('Object');
            StaticPage.should.have.property('model').be.a('Function');
            StaticPage.should.have.property('schema').be.a('Object');
            done();
        });

        it('should reject a new StaticPage without an English title', function(done) {
            const invalidStaticPage = Object.assign({}, tempStaticPage);
            delete invalidStaticPage.title.EN;
            new StaticPageModel(invalidStaticPage).validate((err) => {
                console.log(err.errors.title)
                //err.errors.should.have.property('title.EN').be.a('Object');
                done();
            });
        })
    });

    //out of describe to clear the err object. 

    it('should accept a new StaticPage without summary', function(done) {
        const validStaticPage = Object.assign({}, tempStaticPage);
        delete validStaticPage.summary;
        new StaticPageModel(validStaticPage).validate((err) => {
            assert.isNull(err, 'there was no error');
            done();
        });
    });
});