const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.get_user_list = async (req, res, next) => {
  try {
    const user_list = await User.find();
    return res.json(user_list);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

exports.get_user = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    return res.json(user);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

exports.delete_user = async (req, res, next) => {
  if (
    req.user._id === req.params.userId ||
    req.user.username === "axelnguyen0701"
  ) {
    try {
      const deleted_user = await User.findByIdAndDelete(req.params.userId);
      return res.json(deleted_user);
    } catch (err) {
      return next(err);
    }
  } else {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    return next(err);
  }
};
