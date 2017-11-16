var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Explanation Model
 * =================
 */

var Explanation = new keystone.List('Explanation', {
    map: { name: 'title.EN' },
    autokey: { path: 'slug', from: 'title.EN', unique: false },
});

Explanation.add({
    title: {
        EN: { type: String, required: true },
        HI: { type: String }
    },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    content: {
        EN: { type: Types.Markdown },
        HI: { type: Types.Markdown }
    },
    topics: { type: Types.Relationship, ref: 'Topic', many: true },
    tags: { type: Types.TextArray }
});

Explanation.defaultColumns = 'name, topic|25%, kind|15%';
Explanation.register();