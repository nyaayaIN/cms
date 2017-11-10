var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * =======================
 */

 var Category = new keystone.List('Category', {
 	map: { name: 'name.EN' },
 	autokey: { path: 'slug', from: 'name.EN', unique: true }
 });

 Category.add({
 	name:{
    EN: { type: String, required: true },
    HI: { type: String }
  },
  description: {
    EN: { type: Types.Markdown },
    HI: { type: Types.Markdown }
  }
 });

 Category.relationship({ ref: 'Topic', path: 'category' });

 Category.register();
