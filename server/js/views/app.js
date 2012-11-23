define([
  'jquery',
  'lodash',
  'backbone',
  'vm',
  'events',
  'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, layoutTemplate){
  
	// AppView 
	var AppView = Backbone.View.extend({
    el: '.container',
    initialize: function () {
			console.log('AppView:initialize');
    
      var NestedView2 = Backbone.View.extend({});
      var NestedView1 = Backbone.View.extend({
        initialize: function () {
          var nestedView2 = Vm.create(this, 'Nested View 2', NestedView2);
        }
      });
      var nestedView1 = Vm.create(this, 'Nested View 1', NestedView1);

    },
    render: function () {
			console.log('AppView:render');
      var that = this;
      $(this.el).html(layoutTemplate);
      require(['views/header/menu'], function (HeaderMenuView) {
				console.log('HeaderMenuView: create and render');
        var headerMenuView = Vm.create(that, 'HeaderMenuView', HeaderMenuView);
        headerMenuView.render();
      });
      require(['views/footer/footer'], function (FooterView) {
				console.log('FooterView: create and render');
        // Pass the appView down into the footer so we can render the visualisation
        var footerView = Vm.create(that, 'FooterView', FooterView, {appView: that});
        footerView.render();
      });
    
    }
  });
  return AppView;
});
