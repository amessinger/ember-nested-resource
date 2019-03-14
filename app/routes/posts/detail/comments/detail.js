import Route from '@ember/routing/route';

export default Route.extend({
  model({ comment_id }) {
    let post = this.modelFor('posts.detail');
    return this.store.findSubRecord(post, 'comment', comment_id);
  }
});
