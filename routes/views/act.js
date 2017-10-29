var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'laws';
	locals.filters = {
		slug: req.params.act,
	};
	locals.data = {
		law: {},
	};

	// Load the current law
	view.on('init', function (next) {

		var q = keystone.list('Law').model.findOne({
			state: 'published',
			slug: locals.filters.slug,
		}).populate('author categories jurisdiction');

		q.exec(function (err, result) {
			locals.data.law = result;
			next(err);
		});

	});

	// Render the view
	view.render('act');
};
