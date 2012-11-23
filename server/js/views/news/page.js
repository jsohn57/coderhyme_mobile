define([
  'jquery',
  'lodash',
  'backbone',
  'models/news',
  'collections/news',
  'text!templates/news/page.html',
  'text!templates/news/news.html'
], function($, _, Backbone, NewsModel, NewsCollection, newsPageTemplate, newsTemplate){
  var NewsPage = Backbone.View.extend({
    el: '.page',
    
		initialize: function(options) {

			_.bindAll(this, 'render');

			console.log('news view initialization');
			console.log('create news instance');
		
			var self = this;

			this.collection = new NewsCollection();
			this.collection.bind('reset', this.render);
			this.collection.url = '/v1/channels/' + options.category;
			console.log('fetch from: ' + this.collection.url);
			this.collection.fetch({
				success: function() {
					console.log('fetch completed');
				}
			});

		},

		// append a news
		appendNews: function(news) {
			if( news.toJSON().beples.length == 0 ) return;
			$('div.news-list', this.el).append( _.template(newsTemplate)(news.toJSON()) );
		},

		// render view
    render: function () {

			var self = this;

			$(self.el).empty();
			$(self.el).append("<div class='news-list'></div>");

			self.collection.models = _.sortBy( self.collection.models, function(news) {				
				return -1*news.toJSON().beples.length;
			});

			_(self.collection.models).each( function(news) {
				self.appendNews(news);
			}, self);

    }
  });

  return NewsPage;
});
