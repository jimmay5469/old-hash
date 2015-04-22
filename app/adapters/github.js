import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  session: Ember.inject.service(),
  host: 'https://api.github.com',
  headers: Ember.computed('session.githubToken', function() {
    return {
      Authorization: `token ${this.get('session.githubToken')}`,
    };
  })
});
