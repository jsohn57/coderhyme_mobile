define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/header/menu.html'
], function($, _, Backbone, headerMenuTemplate){
  
	var HeaderMenuView = Backbone.View.extend({
    el: '.main-menu-container',

    initialize: function () {
    },

    render: function () {
      $(this.el).html(headerMenuTemplate);
      $('a[href="' + window.location.hash + '"]').addClass('active');
    },

    events: {
      'click a': 'highlightMenuItem'
    },

    highlightMenuItem: function (ev) {

			console.log('highlightMenuItem');
			console.log(ev);

      $('.active').removeClass('active');
      $(ev.currentTarget).parent().addClass('active');
    }
  })

  return HeaderMenuView;
});
