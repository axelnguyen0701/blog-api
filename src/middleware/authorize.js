const authorize = (req, res, next) => {
  if (req.user.username === "axelnguyen0701") {
    next();
  } else {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    return next(err);
  }
};

module.exports = authorize;
