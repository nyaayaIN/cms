var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'explanation';
	locals.filters = {
		slug: req.params.explanation,
	};
	locals.data = {
		explanation: {},
	};

  // Load the current topic
	view.on('init', function(next) {

		if (locals.filters.slug) {
			keystone.list('Explanation').model.findOne({ slug: locals.filters.slug }).populate('topic').exec(function(err, result) {
				locals.data.explanation = result;
				next(err);
			});
		} else {
			next();
		}

	});

	// Render the view
	view.render('explanation');
};
