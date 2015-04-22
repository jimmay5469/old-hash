import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model: function() {
    if(!this.get('session.isGithubAuthenticated')) {
      return;
    }
    return this.get('session.githubUser').then(function(user) {
      return user.get('githubRepositories');
    });
  },
  actions: {
    authenticateGithub: function() {
      this.get('session').authenticateGithub().then(()=> {
        this.refresh();
      });
    },
    invalidateGithub: function() {
      this.get('session').invalidateGithub();
      window.location.reload();
    }
  }
});
