import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('github-branch', {
  // Specify the other units that are required for this test.
  needs: [
    'model:npm-dependency',
    'model:bower-dependency'
  ]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
