var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * StaticPage Model
 * =================
 */

var StaticPage = new keystone.List('StaticPage', {
    perPage: 25,
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
});

StaticPage.add({
    title: { type: String, required: true },
    keys: { type: Types.TextArray },
    content: {
        EN: { type: Types.TextArray },
        HI: { type: Types.TextArray }
    }
});

StaticPage.defaultColumns = 'title, slug';
StaticPage.register();
