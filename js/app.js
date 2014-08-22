App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});


App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    edit: function(){
      this.set('isEditing', true);
    },

    doneEditing: function() {
      this.set("isEditing", false);
    }
  }
})

Ember.Handlebars.helper('format-date', function(date){
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input){
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

var posts = [{
  id: '1',
  title: "Hannah is awesome",
  author: { name: "Brenda" },
  date: new Date('12-27-2012'),
  excerpt: "Candy canes marshmallow soufflé applicake sweet marzipan bear claw. Cookie sweet roll jelly jelly-o icing soufflé caramels bonbon caramels.",
  body: "Candy canes marshmallow soufflé applicake sweet marzipan bear claw. Cookie sweet roll jelly jelly-o icing soufflé caramels bonbon caramels. Pie cheesecake carrot cake toffee tart toffee ice cream bear claw tootsie roll. Soufflé pastry soufflé jelly beans chocolate cake dragée. Macaroon icing carrot cake applicake croissant soufflé chocolate wafer. Powder candy canes chocolate wafer. Toffee dessert muffin. Cookie jelly-o donut chocolate cake bear claw chocolate pastry chocolate cake chocolate bar. Sweet danish cotton candy sweet topping. Candy canes bear claw chocolate cake icing tart powder bear claw oat cake. Oat cake chocolate bear claw lemon drops ice cream ice cream. Muffin toffee macaroon cookie danish muffin croissant cookie jujubes. Sesame snaps powder lemon drops caramels wafer marzipan. Powder chocolate topping danish tart."
}, {
  id: '2',
  title: "Brenda is awesome",
  author: { name: "Hannah" },
  date: new Date('12-30-2012'),
  excerpt: "Donut pie gummies donut apple pie candy canes. Apple pie ice cream caramels candy pie jujubes chocolate bonbon tootsie roll. Pie bonbon jelly beans wafer cheesecake chocolate cake biscuit soufflé.",
  body: "Donut pie gummies donut apple pie candy canes. Apple pie ice cream caramels candy pie jujubes chocolate bonbon tootsie roll. Pie bonbon jelly beans wafer cheesecake chocolate cake biscuit soufflé. Oat cake jelly beans unerdwear.com muffin candy canes. Powder toffee gummi bears muffin cupcake marshmallow lollipop sesame snaps applicake. Unerdwear.com applicake halvah chocolate bar brownie. Cupcake biscuit icing croissant candy lollipop. Pie cheesecake gingerbread. Toffee danish cheesecake bear claw macaroon biscuit cotton candy sugar plum. Liquorice liquorice carrot cake sweet caramels oat cake liquorice chocolate bar candy. Donut tart tart. Tootsie roll caramels pie sesame snaps chocolate chocolate chupa chups. Tiramisu cookie caramels gingerbread."
}];
