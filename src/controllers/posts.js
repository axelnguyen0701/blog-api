const Post = require("../models/post");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const validation = require("../middleware/validate");
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
  body("title", "Title must not be blank").trim().isLength({ min: 1 }).escape(),
  body("content", "Content must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  validation,
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
  body("title", "Title must not be blank").trim().isLength({ min: 1 }).escape(),
  body("content", "Content must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  validation,
  async (req, res, next) => {
    try {
      const post_DB = await Post.findByIdAndUpdate(req.params.postId, {
        title: req.body.title,
        content: req.body.content,
      }).exec();
      return res.json(post_DB);
    } catch (err) {
      err.statusCode = 400;
      console.log(err);
      return next(err);
    }
  },
];

exports.delete_post = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    return res.json(post);
  } catch (error) {
    error.statusCode = 400;
    return next(err);
  }
};
