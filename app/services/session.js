import Ember from 'ember';
import config from 'old-hash/config/environment';

export default Ember.Service.extend({
  firebase: Ember.computed(function() {
    return new Firebase(config.firebaseUrl);
  }),

  store: Ember.inject.service(),
  isGithubAuthenticated: Ember.computed.notEmpty('githubAccessToken'),
  githubAccessToken: Ember.computed(function(key, value) {
    if(value || value==='') {
      localStorage.setItem('githubAccessToken', value);
    }
    return localStorage.getItem('githubAccessToken');
  }),
  githubUser: Ember.computed('githubAccessToken', function() {
    if(this.get('isGithubAuthenticated')) {
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
          this.set('githubAccessToken', authData.github.accessToken);
          resolve();
        }
      }, {
        scope: 'repo'
      });
    });
  },
  invalidateGithub: function() {
    this.set('githubAccessToken', '');
  }
});
