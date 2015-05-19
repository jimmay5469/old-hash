import GithubBranchAdapter from 'ember-data-github/adapters/github-branch';

export default GithubBranchAdapter.extend({
  findHasMany: function(store, snapshot, url) {
    return this._super(store, snapshot, url).then(function(data) {
      if(url.match(/package\.json|bower\.json/)) {
        return JSON.parse(window.atob(data.content));
      }
      return data;
    }).catch(function() {
      if(url.match(/package\.json|bower\.json/)) {
        return {};
      }
    });
  }
});
