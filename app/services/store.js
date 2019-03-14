import DS from 'ember-data';


export default DS.Store.extend({
  findSubRecord(parentResource, resourceName, resourceId, options) {
    options = options || {};
    options.adapterOptions = options.adapterOptions || {};
    Object.assign(options.adapterOptions, { parentResource });
    return this.findRecord(resourceName, resourceId, options);
  },
  findSubAll(parentResource, resourceName, options) {
    options = options || {};
    options.adapterOptions = options.adapterOptions || {};
    Object.assign(options.adapterOptions, { parentResource });
    return this.findAll(resourceName, options);
  }
});
