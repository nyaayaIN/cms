var keystone = require('keystone');

/**
 * LawJurisdiction Model
 * ==================
 */

var LawJurisdiction = new keystone.List('LawJurisdiction', {
	autokey: { path: 'slug', from: 'name', unique: true }
});

LawJurisdiction.add({
	name: { type: String, required: true },
	hindi: { type: String}
});

LawJurisdiction.relationship({ ref: 'Law', path: 'jurisdiction' });

LawJurisdiction.register();
