var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Questions Model
 * =============
 */

var Questions = new keystone.List('Questions', {
    perPage: 25,
    map: { name: 'question.EN' },
    autokey: { path: 'slug', from: 'question.EN', unique: true },
    track: { createdAt: true,
             createdBy: true,
             updatedAt: true,
             updatedBy: true }
});

Questions.add({
    question: {
        EN: { type: String, required: true },
        HI: { type: String }
    },
    answer: {
        EN: { type: Types.Markdown, height: 250 },
        HI: { type: Types.Markdown, height: 250 }
    },
    source: {
        EN: { type: Types.TextArray },
        HI: { type: Types.TextArray }
    },
    topic: { type: Types.Relationship, ref: 'Topic', many: true },
    explanation: { type: Types.Relationship, ref: 'Explanation', many: true },
    tags: { type: Types.TextArray }
});

Questions.defaultSort = 'topic';
Questions.defaultColumns = 'question.EN|60%, topic';
Questions.register();
