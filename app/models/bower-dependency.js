import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  isDev: DS.attr('boolean'),
  requestedVersion: DS.attr('string')
});
