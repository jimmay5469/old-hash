import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  concatDependencies: function(list, dependencies, isDev) {
    if(!dependencies) {
      return list;
    }
    return list.concat(Object.keys(dependencies).map(function(key) {
      return {
        name: key,
        isDev: isDev,
        requestedVersion: dependencies[key]
      };
    }));
  },
  extractArray: function(store, primaryType, payload) {
    payload = {
      bowerDependencies: this.concatDependencies(this.concatDependencies([], payload.dependencies, false), payload.devDependencies, true)
    };
    return this._super(store, primaryType, payload);
  },
  normalize: function(type, hash, prop) {
    hash.id = `${hash.name}@${hash.requestedVersion}`;
    return this._super(type, hash, prop);
  }
});
