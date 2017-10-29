var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Explanation Topic Model
 * =======================
 */

 var ExplanationTopic = new keystone.List('ExplanationTopic', {
 	autokey: { path: 'slug', from: 'name', unique: true }
 });

 ExplanationTopic.add({
 	name: { type: String, required: true },
  summary: { type: Types.Markdown }
 });

 ExplanationTopic.relationship({ ref: 'Explanation', path: 'topics' });

 ExplanationTopic.register();
