var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Questions Model
 * =============
 */

var Questions = new keystone.List('Questions', {
    map: { name: 'question.EN' },
    autokey: { path: 'slug', from: 'question.EN', unique: true },
});

Questions.add({
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    question: {
        EN: { type: String, required: true },
        HI: { type: String }
    },
    answer: {
        EN: { type: String },
        HI: { type: String }
    },
    topic: { type: Types.Relationship, ref: 'Topic', many: true },
    tags: { type: Types.TextArray }
});

Questions.defaultSort = 'question.EN';
Questions.defaultColumns = 'question.EN|60%, state|10%, topic';
Questions.register();