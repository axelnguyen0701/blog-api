const User = require("../models/user");

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
