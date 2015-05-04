import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('githubUser', params.ownerId).then((user)=> {
      if(user.get('type') === 'Organization') {
        return this.get('store').find('githubOrganization', params.ownerId);
      }
      return user;
    });
  },
});
