define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'text!templates/footer/footer.html',
], function($, _, Backbone, Events, footerTemplate){
  var FooterView = Backbone.View.extend({
    el: '.footer',
    
		intialize: function () {

    },
    
		render: function () {
      $(this.el).html(footerTemplate);
      //this.renderSpringy();
      //Events.on('viewCreated', this.renderSpringy, this);
    }
    
  });

  return FooterView;
});
