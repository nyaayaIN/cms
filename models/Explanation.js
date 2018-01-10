var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Explanation Model
 * =================
 */

var Explanation = new keystone.List('Explanation', {
    autokey: { path: 'slug', from: 'title.EN', unique: true },
    track: {createdAt: true,
            createdBy: true,
            updatedAt: true,
            updatedBy: true},
    map: { name: 'title.EN' }
});

Explanation.add({
    title: {
        EN: { type: String, required: true, initial: true },
        HI: { type: String }
    },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    content: {
        EN: { type: Types.Markdown },
        HI: { type: Types.Markdown }
    },
    explanationImage: {type:Types.CloudinaryImage, folder: '/explanation'},
    topics: { type: Types.Relationship, ref: 'Topic', many: true },
    tags: { type: Types.TextArray }
});

Explanation.defaultColumns = 'title.EN|60%, topics|20%, state, author';
Explanation.register();