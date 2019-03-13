import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let post = this.modelFor('posts.detail');
    return this.store.findAll('comment', { adapterOptions: { parentResource: post } });
  }
});
