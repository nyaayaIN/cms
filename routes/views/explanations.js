var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'explanations';
	locals.data = {
		explanations: [],
	};

	view.on('init', function (next) {

		var q = keystone.list('ExplanationTopic').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
      select: 'name slug'
		})
			.sort('name');

		q.exec(function (err, results) {
			locals.data.explanations = results;
			next(err);
		});
	});

	// Render the view
	view.render('explanations');
};
