import EmberObject from '@ember/object';
import SubResourceAdapterMixin from 'nested-resources/mixins/sub-resource-adapter';
import { module, test } from 'qunit';

module('Unit | Mixin | SubResourceAdapter', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SubResourceAdapterObject = EmberObject.extend(SubResourceAdapterMixin);
    let subject = SubResourceAdapterObject.create();
    assert.ok(subject);
  });
});
