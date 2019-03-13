# nested-resources

## TL;DR

This test application implements and showcases *a* solution for handling REST nested resources.

It does so with an [adapter mixin](./app/mixins/sub-resource-adapter.js) overriding the `buildURL()` method.

## Proposed API

> Make your sub-resource's adapter extends the mixin.

In the sub-resource's adapter ([see example](./app/adapters/comment.js)):
```js
[...]
import SubResourceAdapterMixin from '../mixins/sub-resource-adapter';

export default ApplicationAdapter.extend(SubResourceAdapterMixin, {
  [...]
});
```

> When using the adapter to query the backend, make sure to provide the `parentResource`.

In a route fetching the index of the sub-resource ([see example](./app/routes/posts/detail/comments.js)):
```js
[...]
model() {
  let parentResource = this.modelFor('parent-route');
  return this.store.findAll('sub-resource', { adapterOptions: { parentResource } });
}
[...]
```

In a route fetching a single item of the sub-resource ([see example](./app/routes/posts/detail/comments/detail.js)):
```js
[...]
model({ id }) {
  let parentResource = this.modelFor('parent-route');
  return this.store.findRecord('sub-resource', id, { adapterOptions: { parentResource } });
}
[...]
```

## Example Use Case

Nested resources are available under the path of a parent resource.

Let's consider the infamous blog example:
- a blog is a collection of `post`s
- a `post` has `comment`s
- a `comment` has only one `post`

A `comment` *only* exists within the context of a `post` (well, at least in our dummy blog).

There is the resulting REST API contract:

`GET http://localhost:3000/posts`:
```json
[
  {
    "id": 1,
    "title": "Post Title",
    "content": "Post content"
  }
]
```

`GET http://localhost:3000/posts/1`:
```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post content"
}
```

`GET http://localhost:3000/posts/1/comments`:
```json
[
  {
    "id": 1,
    "content": "Comment content"
  }
]
```

`GET http://localhost:3000/posts/1/comments/1`:
```json
{
  "id": 1,
  "content": "Comment content"
}
```

## Problem & Proposed Solution

> The hard task is to be able to retrieve the `comment` nested-resource.

`app/routes/posts/details/comments.js`:
```js
[...]
model() {
  return this.store.findAll('comment'); // this won't work, since we need the `post` parent resource to build the URL
}
[...]
```

> The proposed solution overrides the adapter's `buildURL()` method to build the sub-resource URL using the parent resource URL and the sub-resource `pathForType`. Refer to the [implementation](./app/mixins/sub-resource-adapter.js) for more details.

By providing a reference to the parent resource, we are now able to build our sub-resource URL.

[`app/routes/posts/detail/comments.js`](./app/routes/posts/detail/comments.js):
```js
[...]
model() {
  let post = this.modelFor('posts.detail');
  return this.store.findAll('comment', { adapterOptions: { parentResource: post } });
}
[...]
```


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd nested-resources`
* `yarn install`

## Running / Development

* `yarn run json-server --watch mock/db.json --routes mock/routes.json`
* `ember serve --proxy http://localhost:300`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `yarn run json-server --watch mock/db.json --routes mock/routes.json`
* `ember test --proxy http://localhost:300`
* `ember test --server --proxy http://localhost:300`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
