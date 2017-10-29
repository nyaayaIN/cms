var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'laws';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		laws: [],
		categories: [],
		jurisdictions: []
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('LawCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Law').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.lawCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load all jurisdictions
	view.on('init', function (next) {

		keystone.list('LawJurisdiction').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.jurisdictions = results;

			// Load the counts for each jurisdiction
			async.each(locals.data.jurisdictions, function (jurisdiction, next) {

				keystone.list('Law').model.count().where('jurisdiction').in([jurisdiction.id]).exec(function (err, count) {
					jurisdiction.lawCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('LawCategory').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the laws
	view.on('init', function (next) {

		var q = keystone.list('Law').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories jurisdictions');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.laws = results;
			next(err);
		});
	});

	// Render the view
	view.render('laws');
};
