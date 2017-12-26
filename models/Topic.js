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
    category: { type: Types.Relationship, ref: 'Category', many: false }
});

Topic.relationship({ ref: 'Checklist',  path: 'checklist', refPath: 'topics' });
Topic.relationship({ ref: 'Explanation', path: 'explanation', refPath: 'topics' });
Topic.relationship({ ref: 'Questions', path: 'question', refPath: 'topic' });
Topic.relationship({ ref: 'Terms', path: 'term', refPath: 'topic' });
Topic.register();