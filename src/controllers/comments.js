const Comment = require("../models/comment");
const { body } = require("express-validator");
const { validate, authorize } = require("../middleware/index");
const passport = require("passport");

exports.list_all_comments = async (req, res, next) => {
  try {
    const comment_list = await Comment.find({ post: req.params.postId })
      .populate("author")
      .exec();
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
  validate,
  async (req, res, next) => {
    try {
      let comment = await Comment.create({
        content: req.body.content,
        author: req.user._id,
        post: req.params.postId,
      });
      comment = await comment.execPopulate("author");
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
  validate,
  authorize,
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

exports.delete_comment = [
  passport.authenticate("jwt", { session: false }),
  authorize,
  async (req, res, next) => {
    try {
      const deleted_comment = await Comment.findByIdAndDelete(
        req.params.commentId
      ).exec();
      return res.json(deleted_comment);
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  },
];
