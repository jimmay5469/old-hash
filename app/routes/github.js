import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel: function() {
    if(!this.get('session.isGithubAuthenticated')) {
      this.replaceWith('index');
    }
  },
  model: function() {
    var currentUser = this.get('session.githubUsername');
    return this.store.find('githubUser', currentUser).then(function(user) {
      return user.get('githubRepositories');
    });
  }
});
