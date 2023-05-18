function route(n) {}
function auth(n) {}
function can(n) {}
function createPostHandler() {
  //
}
(function () {
  const attributes = new Map();
  attributes.set(route, route('/user/:user/posts/:post'));
  attributes.set(auth, auth('user'));
  attributes.set(can, can('create_post'));
  $attr.__attributes__ = attributes;
})();
