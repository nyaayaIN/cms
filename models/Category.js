var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * =======================
 */

var Category = new keystone.List('Category', {
    perPage: 10,
    map: { name: 'name.EN' },
    autokey: { path: 'slug', from: 'name.EN', unique: true }
});

Category.add({
    name: {
        EN: { type: String, required: true },
        HI: { type: String }
    },
    description: {
        EN: { type: Types.Markdown },
        HI: { type: Types.Markdown }
    },
    categoriesImage: {type:Types.CloudinaryImage, folder: '/category'}

});

Category.relationship({ ref: 'Topic', path: 'topic', refPath: 'category' });
Category.defaultColumns = 'name.EN, name.HI';
Category.register();
