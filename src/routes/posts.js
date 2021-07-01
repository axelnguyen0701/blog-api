const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const commentController = require("../controllers/comments");
//Get all posts
router.get("/", postsController.list_all_posts);

//Create new posts:
router.post("/", postsController.create_new_post);

//Get specific post:
router.get("/:postId", postsController.get_post);

//Update post:
router.put("/:postId", postsController.edit_post);

//Delete post:
router.delete("/:postId", postsController.delete_post);

//Get post's comments:
router.get("/:postId/comments", commentController.list_all_comments);

//Get posts's specific comment:
router.get("/:postId/comments/:commentId", commentController.get_comment);

//Post comment:
router.post("/:postId/comments", commentController.create_comment);

//Edit comment:
router.put("/:postId/comments/:commentId", commentController.edit_comment);

//Delete
router.delete("/:postId/comments/:commentId", commentController.delete_comment);

module.exports = router;
