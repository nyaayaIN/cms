var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Explanation Model
 * =================
 */

var Explanation = new keystone.List('Explanation', {
    perPage: 25,
    autokey: { path: 'slug', from: 'title.EN', unique: true },
    map: { name: 'title.EN' },
    track: { createdAt: true,
             createdBy: true,
             updatedAt: true,
             updatedBy: true }
});

Explanation.add({
    title: {
        EN: { type: String, required: true, initial: true },
        HI: { type: String }
    },
    content: {
        EN: { type: Types.Markdown, height: 250 },
        HI: { type: Types.Markdown, height: 250 }
    },
    order: { type: Types.Number },
    explanationImage: {type:Types.CloudinaryImage, folder: '/explanation'},
    topics: { type: Types.Relationship, ref: 'Topic', many: true },
    tags: { type: Types.TextArray }
});

Explanation.defaultSort = 'topics';
Explanation.defaultColumns = 'title.EN|60%, topics|20%, tags';
Explanation.register();
