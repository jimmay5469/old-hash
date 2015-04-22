import Ember from 'ember';
import config from 'old-hash/config/environment';

export default Ember.Service.extend({
  firebase: Ember.computed(function() {
    return new Firebase(config.firebaseUrl);
  }),

  store: Ember.inject.service(),
  isGithubAuthenticated: Ember.computed.notEmpty('githubToken'),
  githubToken: Ember.computed(function(key, value) {
    if(value || value==='') {
      localStorage.setItem('githubToken', value);
    }
    return localStorage.getItem('githubToken');
  }),
  githubUser: Ember.computed('githubToken', function() {
    if(this.get('githubToken')) {
      return this.get('store').find('githubUser', '');
    }
  }),
  authenticateGithub: function() {
    return new Ember.RSVP.Promise((resolve, reject)=> {
      Firebase.goOnline();
      this.get('firebase').authWithOAuthPopup('github', (error, authData)=> {
        Firebase.goOffline();
        if (error) {
          reject(error);
        } else {
          this.set('githubToken', authData.github.accessToken);
          resolve();
        }
      });
    });
  },
  invalidateGithub: function() {
    this.set('githubToken', '');
  }
});
