function route(n) { }
function auth(n) { }
function can(n) { }

$attr(route('/user/:user/posts/:post'), auth('user'), can('create_post'));
function createPostHandler() {
    //
}