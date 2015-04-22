import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel: function() {
    if(!this.get('session.isGithubAuthenticated')) {
      this.replaceWith('index');
    }
  },
  model: function() {
    return this.get('session.githubUser').then(function(user) {
      return user.get('githubRepositories');
    });
  }
});
