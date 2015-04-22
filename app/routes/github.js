import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
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
