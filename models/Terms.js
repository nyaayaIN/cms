var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Terms Model
 * =============
 */

var Terms = new keystone.List('Terms', {
    perPage: 25,
    map: { name: 'term.EN' },
    autokey: { path: 'slug', from: 'title.EN', unique: true },
});

Terms.add({
    term: {
        EN: { type: String, initial: true, required: true },
        HI: { type: String }
    },
    definition: {
        EN: { type: String, initial: true, required : true },
        HI: { type: String },
    },
    topic: { type: Types.Relationship, ref: 'Topic', many: true },
    tags: { type: Types.TextArray }
});

Terms.defaultSort = 'term.EN';
Terms.defaultColumns = 'term.EN, topic';
Terms.register();
