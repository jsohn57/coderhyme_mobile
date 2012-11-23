define([
  'lodash',
  'backbone'
], function(_, Backbone) {
	
	console.log('create newsModel');

  var newsModel = Backbone.Model.extend({
    defaults: {
    },
    initialize: function(){
			//console.log('initialize news model : ' + JSON.stringify(this));

			var title = this.get('title');
			if( title ) this.set('title', title.substr(1));
		
			//console.log( title );

			var media = title.charAt(0);
			if('D' == media ) {
				this.set('logoUrl', '/images/daum.png');
			} else if( 'N' == media ) {
				this.set('logoUrl', '/images/nate.png');
			}

    }

  });
  return newsModel;

});
