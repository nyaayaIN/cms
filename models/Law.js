var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Law Model
 * ==========
 */

var Law = new keystone.List('Law', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Law.add({
	title: { type: String, required: true },
	translatedTitle: {
		hindi: {type: String}
	},
	act: { type: Types.Number  },
	year: { type: String },
	dateOfAssent: { type: Types.Date },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	preamble: {
		english: { type: Types.Html, wysiwyg: true, height: 250},
		hindi: { type: Types.Html, wysiwyg: true, height: 250 }
	},
	content: {
		english: {type: Types.Markdown},
		hindi: {type: Types.Markdown}
	},
	jurisdiction: { type: Types.Relationship, ref: 'LawJurisdiction', index: true, many: false },
	categories: { type: Types.Relationship, ref: 'LawCategory', many: true },
});

Law.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Law.defaultColumns = 'title, act|8%, year|8%, jurisdiction|15%, categories|20%, state|10%';
Law.register();
