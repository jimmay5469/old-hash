import GithubAdapter from './github';

export default GithubAdapter.extend({
  pathForType: function() {
    return 'users';
  },
  buildURL: function(type, id, snapshot) {
    var builtURL = this._super(type, id, snapshot);
    if(id==='') {
      builtURL = builtURL.replace('users', 'user');
    }
    return builtURL;
  }
});
