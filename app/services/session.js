import Ember from 'ember';
import config from 'old-hash/config/environment';

export default Ember.Service.extend({
  firebase: Ember.computed(function() {
    return new Firebase(config.firebaseUrl);
  }),

  isGithubAuthenticated: Ember.computed.notEmpty('githubToken'),
  githubToken: Ember.computed(function(key, value) {
    if(value) {
      localStorage.setItem('githubToken', value);
    }
    return localStorage.getItem('githubToken');
  }).volatile(),
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
  }
});
