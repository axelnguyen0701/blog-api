const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

//Get all comments
router.get("/", commentsController.list_all_comments);

//Create new comment
router.post("/", commentsController.create_comment);

//Get specific comment
router.get("/:commentId", commentsController.get_comment);

//Edit comment
router.put("/:commentId", commentsController.edit_comment);

//Delete comment
router.delete("/:commentId", commentsController.delete_comment);
module.exports = router;
