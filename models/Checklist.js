var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Checklist Model
 * =================
 */

var Checklist = new keystone.List('Checklist', {
	map: { name: 'title.EN' },
	autokey: { path: 'slug', from: 'title.EN', unique: false},
});

Checklist.add({
  title: {
		EN: { type: String, required: true },
		HI: { type: String }
	},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  EN_list: { type: Types.TextArray },
	HI_list: { type: Types.TextArray },
  topics: { type: Types.Relationship, ref: 'Topic', many: true },
	tags: { type: Types.TextArray }
});

Checklist.defaultColumns = 'name, topic|25%, kind|15%';
Checklist.register();
