var keystone = require('keystone');
var _ = require('lodash');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var topic = {};

	// Set locals
	locals.section = 'topic';
	locals.filters = {
		topic: req.params.topic,
		explanation: req.params.explanation || false
	};
	locals.data = {
		topic: {},
		explanations: [],
		content: {}
	};

  // Load the current topic
	view.on('init', function(next) {

		if (locals.filters.topic) {
			keystone.list('ExplanationTopic').model.findOne({ slug: locals.filters.topic }).exec(function(err, result) {
				if(result) {
					topic = result;
					locals.data.topic = {
						name: topic.name,
						slug: topic.slug
					};
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
			.sort('publishedDate');

		if (locals.data.topic) {
			q.where('topic').in([topic]);
		}

		q.exec(function(err, explanations) {

			_.forEach(explanations.results, function(explanation){
				locals.data.explanations.push({
					title: explanation.title,
					slug: explanation.slug
				});

				if(explanation.slug === locals.filters.explanation) {
					locals.data.content = {
						title: explanation.title,
						html: explanation.content.html,
						tags: explanation.tags
					};
				}
			});

			if (!locals.data.content.title) {
				locals.data.content = {
					slug: "summary",
					title: "Summary",
					html: topic.summary.html
				};
			}

			next(err);
		});

	});

	// Render the view
	view.render('topic');
};
