import Route from '@ember/routing/route';

export default Route.extend({
  model({ post_id }) {
    return this.modelFor('posts').findBy('id', post_id);
  }
});
