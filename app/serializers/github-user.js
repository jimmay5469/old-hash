import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, primaryType, payload) {
    payload = { githubUsers: payload };
    return this._super(store, primaryType, payload);
  },
  extractSingle: function(store, primaryType, payload, recordId) {
    if(recordId==='') {
      payload.repos_url = payload.repos_url.replace(`users/${payload.login}`, 'user');
    }
    payload = { githubUser: payload };
    return this._super(store, primaryType, payload, recordId);
  },
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.login,
      name: hash.name,
      avatarUrl: hash.avatar_url,
      links: {
        githubRepositories: hash.repos_url
      }
    };
    return this._super(type, hash, prop);
  }
});
