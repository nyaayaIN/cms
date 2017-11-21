var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Terms Model
 * =============
 */

var Terms = new keystone.List('Terms', {
    map: { name: 'term.EN' },
    autokey: { path: 'slug', from: 'title.EN', unique: false },
});

Terms.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
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
Terms.defaultColumns = 'term.EN, state, publishedDate';
Terms.register();