var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Explanation Model
 * =================
 */

var Explanation = new keystone.List('Explanation', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: false},
});

Explanation.add({
  title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  content: { type: Types.Markdown },
  topic: { type: Types.Relationship, ref: 'ExplanationTopic', many: true },
	kind: { type: Types.Select, options: 'definition, rights, duties, steps, actions, repercussion', default: 'definition', index: true },
  tags: { type: Types.TextArray}
});

Explanation.defaultColumns = 'name, topic|25%, kind|15%';
Explanation.register();
