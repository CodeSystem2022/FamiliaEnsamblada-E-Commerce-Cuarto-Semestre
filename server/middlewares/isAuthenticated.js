exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.cookie) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
