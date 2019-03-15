import DS from 'ember-data';
import { get } from '@ember/object';

export default DS.RESTAdapter.extend({
  buildURL(modelName, id, snapshot) {
    let url = this._super(...arguments);
    let parentResource = get(snapshot, 'adapterOptions.parentResource')
    if (parentResource) {
      let { modelName: parentModelName } = parentResource.constructor;
      let parentAdapter = this.store.adapterFor(parentModelName);
      let parentUrl = parentAdapter.buildURL(parentModelName, parentResource.id);
      return `${parentUrl}${url}`;
    }
    return url;
  }
});
