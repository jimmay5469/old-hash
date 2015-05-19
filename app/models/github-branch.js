import DS from 'ember-data';
import GithubBranchModel from 'ember-data-github/models/github-branch';

export default GithubBranchModel.extend({
  npmDependencies: DS.hasMany('npmDependency', { async: true, }),
  bowerDependencies: DS.hasMany('bowerDependency', { async: true, })
});
