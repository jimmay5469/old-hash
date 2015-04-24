import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, primaryType, payload) {
    payload = { githubRepositories: payload };
    return this._super(store, primaryType, payload);
  },
  extractSingle: function(store, primaryType, payload, recordId) {
    payload = { githubRepository: payload };
    return this._super(store, primaryType, payload, recordId);
  },
  normalize: function(type, hash, prop) {
    hash = {
      id: hash.full_name,
      name: hash.name
    };
    return this._super(type, hash, prop);
  }
});
