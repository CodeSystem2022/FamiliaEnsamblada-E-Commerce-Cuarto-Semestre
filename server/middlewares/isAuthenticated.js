exports.isAuthenticated = (req, res, next) => {
  console.log("req session es", req.session);
  if (req.session && req.session.cookie) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
