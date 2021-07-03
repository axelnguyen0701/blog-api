const Post = require("../models/post");
const User = require("../models/user");
const { body } = require("express-validator");
const { validate, authorize } = require("../middleware/index");
const passport = require("passport");
exports.list_all_posts = async (req, res, next) => {
  try {
    const post_list = await Post.find().populate("author").exec();
    return res.json(post_list);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.get_post = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).exec();
    return res.json(post);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
exports.create_new_post = [
  passport.authenticate("jwt", { session: false }),
  body("title", "Title must not be blank").trim().isLength({ min: 1 }).escape(),
  body("content", "Content must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  validate,
  authorize,
  async (req, res, next) => {
    try {
      const user = await User.findOne({ username: "axelnguyen0701" }).exec();
      const post = {
        title: req.body.title,
        content: req.body.content,
        author: user,
        published: req.body.published,
      };
      const post_DB = await Post.create(post);
      return res.json(post_DB);
    } catch (err) {
      console.log(err);
      err.statusCode = 400;

      return next(err);
    }
  },
];

exports.edit_post = [
  passport.authenticate("jwt", { session: false }),
  body("title", "Title must not be blank").trim().isLength({ min: 1 }).escape(),
  body("content", "Content must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  validate,
  authorize,
  async (req, res, next) => {
    try {
      const post_DB = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          title: req.body.title,
          content: req.body.content,
        },
        { new: true }
      ).exec();
      return res.json(post_DB);
    } catch (err) {
      err.statusCode = 400;
      return next(err);
    }
  },
];

exports.delete_post = [
  passport.authenticate("jwt", { session: false }),
  authorize,
  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId);
      await post.remove(); //remove comment associated with post
      return res.json(post);
    } catch (error) {
      error.statusCode = 400;
      return next(error);
    }
  },
];
