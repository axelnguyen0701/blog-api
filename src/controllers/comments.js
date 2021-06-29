const Comment = require("../models/comment");
const { body } = require("express-validator");
const validation = require("../middleware/validate");
const passport = require("passport");

exports.list_all_comments = async (req, res, next) => {
  try {
    const comment_list = await Comment.find({ post: req.body.postId });
    return res.json(comment_list);
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.get_comment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).exec();
    return res.json(comment);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

exports.create_comment = [
  passport.authenticate("jwt", { session: false }),
  body("content", "Content must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  validation,
  async (req, res, next) => {
    try {
      const comment = await Comment.create({
        content: req.body.content,
        author: req.user._id,
        post: req.body.postId,
      });
      return res.json(comment);
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  },
];

exports.edit_comment = [
  passport.authenticate("jwt", { session: false }),
  body("content", "Content must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  validation,
  async (req, res, next) => {
    try {
      let comment = await Comment.findById(req.params.commentId)
        .populate("author")
        .exec();
      if (comment.author._id.toString() === req.user._id.toString()) {
        comment = await Comment.findByIdAndUpdate(
          req.params.commentId,
          {
            content: req.body.content,
            date: Date.now(),
          },
          { new: true }
        );
        return res.json(comment);
      } else {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        next(error);
      }
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  },
];

exports.delete_comment = async (req, res, next) => {
  try {
    const deleted_comment = await Comment.findByIdAndDelete(
      req.params.commentId
    ).exec();
    return res.json(deleted_comment);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};
