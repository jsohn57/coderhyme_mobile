// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      'news/:category': 'news',
      'news': 'news',
      // Default - catch all
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(options){
    var appView = options.appView;
    
		var router = new AppRouter(options);
    router.on('route:defaultAction', function (actions) {
			require(['views/news/page'], function (NewsPage) {
				// Vm.create[ context, name, View, options 
				console.log('route:news : ' + 'eco');
        var newsPage = Vm.create(appView, 'NewsPage', NewsPage, { category: 'eco' });
        newsPage.render();
      });
    });

		router.on('route:news', function (category) {
      require(['views/news/page'], function (NewsPage) {
				// Vm.create[ context, name, View, options 
				console.log('route:news : ' + category);
        var newsPage = Vm.create(appView, 'NewsPage', NewsPage, { category: category });
        newsPage.render();
      });
    });

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
