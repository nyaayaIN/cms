var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Explanation Topic Model
 * =======================
 */

var Topic = new keystone.List('Topic', {
    autokey: { path: 'slug', from: 'name.EN', unique: true },
    map: { name: 'name.EN' }
});

Topic.add({
    name: {
        EN: { type: String, initial: true, required: true },
        HI: { type: String }
    },
    summary: {
        EN: { type: Types.Markdown },
        HI: { type: Types.Markdown }
    },
    topicImage: {type:Types.CloudinaryImage, folder: '/topics'},
    category: { type: Types.Relationship, ref: 'Category', many: false },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    featured: {type: Types.Boolean }
});

Topic.relationship({ ref: 'Explanation', path: 'explanation', refPath: 'topics' });
Topic.relationship({ ref: 'Questions', path: 'question', refPath: 'topic' });
Topic.relationship({ ref: 'Terms', path: 'term', refPath: 'topic' });

Topic.defaultColumns = 'name.EN|60%, category|20%, state, author';
Topic.register();
