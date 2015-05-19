import GithubBranchSerializer from 'ember-data-github/serializers/github-branch';

export default GithubBranchSerializer.extend({
  normalize: function(type, hash, prop) {
    var normalizedHash = this._super(type, hash, prop);
    normalizedHash.links = {
      npmDependencies: hash.commit.url.replace(/\/commits\/.+/, `/contents/package.json?ref=${hash.name}`),
      bowerDependencies: hash.commit.url.replace(/\/commits\/.+/, `/contents/bower.json?ref=${hash.name}`)
    };
    return normalizedHash;
  }
});
