var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * StaticPage Model
 * =================
 */

var StaticPage = new keystone.List('StaticPage', {
    map: { name: 'title.EN' },
});

StaticPage.add({
    title: {
        EN: { type: String, required: true },
        HI: { type: String }
    },
    slug: { type: String, unique: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    keys: { type: Types.TextArray },
    content: {
        EN: { type: Types.TextArray },
        HI: { type: Types.TextArray }
    }
});

StaticPage.defaultColumns = 'name, topic|25%, kind|15%';
StaticPage.register();