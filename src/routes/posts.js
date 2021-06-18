const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts')

//Get all posts
router.get('/', postsController.list_all_posts)

//Create new posts:
router.post('/', postsController.create_new_post);

//Get specific post:
router.get('/:postId', postsController.get_post);

//Update post:
router.put('/:postId', postsController.edit_post)

//Delete post:
router.delete('/:postId', postsController.delete_post)
module.exports = router;

