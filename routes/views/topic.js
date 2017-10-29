var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'topic';
	locals.filters = {
		topic: req.params.topic || false,
		explanation: req.params.explanation || false

	};
	locals.data = {
		topic: {},
    explanations: [],
		currentExplanation: null
	};

  // Load the current topic
	view.on('init', function(next) {

		if (locals.filters.topic) {
			keystone.list('ExplanationTopic').model.findOne({ slug: locals.filters.topic }).exec(function(err, result) {

				if(result) {
					locals.data.topic = result;
					if (locals.filters.explanation) {
						keystone.list('Explanation').model
										.find({ slug: locals.filters.explanation })
										.where('topic').in([locals.data.topic.id])
										.populate('topic')
										.exec(function(err, results) {

							locals.data.currentExplanation = results[0];

						});
					}
				}
				next(err);
			});
		} else {
			next();
		}

	});

	// Load the explanations
	view.on('init', function(next) {

		var q = keystone.list('Explanation').paginate({
				page: req.query.page || 1,
				perPage: 25,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('name');

		if (locals.data.topic) {
			q.where('topic').in([locals.data.topic]);
		}

		q.exec(function(err, results) {
			locals.data.explanations = results;
			next(err);
		});

	});

	// Render the view
	view.render('topic');
};
