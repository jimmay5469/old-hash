import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('github',function() {
    this.route('index', { path: '/' });
    this.route('owner', { path: '/:ownerId' });
    this.route('repository', { path: '/:ownerId/:repositoryName' });
  });
});
