import GithubAdapter from './github';

export default GithubAdapter.extend({
  pathForType: function() {
    return 'users';
  },
  find: function(store, type, id, snapshot) {
    return this._super(store, type, id, snapshot).then(function(data) {
      return {
        githubUser: {
          id: id,
          name: data.name,
          avatarUrl: data.avatar_url,
          links: {
            githubRepositories: data.repos_url
          }
        }
      };
    });
  },
  findHasMany: function(store, snapshot, url) {
    return this._super(store, snapshot, url).then(function(data) {
      return {
        githubRepositories: data.map(function(item) {
          return {
            id: item.full_name,
            name: item.name
          };
        })
      };
    });
  }
});
