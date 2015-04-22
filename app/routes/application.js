import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  actions: {
    login: function() {
      this.get('session').authenticateGithub();
    }
  }
});
