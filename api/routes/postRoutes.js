'use strict';
module.exports = function(apiRoutes) {
  var post = require('../controllers/postController');

  // Post Routes
  apiRoutes.get('/posts', post.read_all_posts);
  apiRoutes.get('/adminposts', post.admin_read_all_posts);
  apiRoutes.get('/posts/:postId', post.read_a_post);
  apiRoutes.get('/comments/:postId', post.get_all_comments);
  apiRoutes.post('/posts', post.create_a_post);
  apiRoutes.post('/editpost/:postId', post.edit_a_post);
  apiRoutes.delete('/posts/:postId', post.delete_a_post);
  apiRoutes.get('/flagcomment/:commentId', post.flag_a_comment);
  apiRoutes.get('/unflagcomment/:commentId', post.unflag_a_comment);
  apiRoutes.delete('/comments/:commentId', post.delete_a_comment);
  apiRoutes.get('/verifypost/:postId', post.verifypost);
  apiRoutes.get('/flagpost/:postId', post.flagpost);
  apiRoutes.post('/flagpostreason/:postId', post.flagpostreason);
  apiRoutes.get('/unflagpost/:postId', post.unflagpost);
  apiRoutes.get('/adminpost/:postId', post.admin_read_a_post);

  // app.route('/tasks/:taskId')
  //   .get(todoList.read_a_task)
  //   .put(todoList.update_a_task)
  //   .delete(todoList.delete_a_task);
};
