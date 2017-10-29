var keystone = require('keystone');

/**
 * LawComponent Model
 * ==================
 */

var LawCategory = new keystone.List('LawCategory', {
	autokey: { path: 'slug', from: 'name', unique: true }
});

LawCategory.add({
	name: { type: String, required: true },
	hindi: { type: String}
});

LawCategory.relationship({ ref: 'Law', path: 'categories' });

LawCategory.register();
