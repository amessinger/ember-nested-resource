import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

export default Mixin.create({
  buildURL(modelName, id, snapshot) {
    assert('This is a subresource, a `snapshot.adapterOptions.parentResource:<DS.Record>` must be provided.', get(snapshot, 'adapterOptions.parentResource'));

    let url = this._super(...arguments);
    let { parentResource } = snapshot.adapterOptions;
    let { modelName: parentModelName } = parentResource.constructor;
    let parentAdapter = this.store.adapterFor(parentModelName);
    let parentUrl = parentAdapter.buildURL(parentModelName, parentResource.id);

    return `${parentUrl}${url}`;
  }
});
