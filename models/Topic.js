var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Explanation Topic Model
 * =======================
 */

var Topic = new keystone.List('Topic', {
    autokey: { path: 'slug', from: 'name.EN', unique: true }
});

Topic.add({
    name: {
        EN: { type: String, initial: true, required: true },
        HI: { type: String }
    },
    summary: {
        EN: { type: Types.Markdown },
        HI: { type: Types.Markdown }
    }
});

Topic.relationship({ ref: 'Explanation', path: 'topics' });

Topic.register();