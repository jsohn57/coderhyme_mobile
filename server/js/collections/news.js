define([
  'jquery',
  'lodash',
  'backbone',
  'models/news'
], function($, _, Backbone, newsModel){
	
	console.log('js/collections/news.js');
  
	var newsCollection = Backbone.Collection.extend({
    model: newsModel,
    initialize: function(){
			console.log('initialize news collection');

    }

  });

  return newsCollection;
});
