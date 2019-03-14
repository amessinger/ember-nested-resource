import DS from "ember-data";
import { set } from '@ember/object';

const { Store } = DS;

export default Store.extend({
  findSubAll(parentResource, modelName, options = {}) {
    set(options, 'parentResource', parentResource);
    return this.findAll(modelName, options);
  },
  findSubRecord(parentResource, modelName, id, options = {}) {
    set(options, 'parentResource', parentResource);
    return this.findRecord(modelName, id, options);
  }
});
