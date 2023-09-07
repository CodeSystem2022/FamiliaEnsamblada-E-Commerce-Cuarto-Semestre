exports.login = (req, res) => {
  try {
    const { user, password } = req.body;
    // check if the email and password are valid
    if (user === "admin" && password === "1234") {
      req.session.user = { user }; // set the user object in the session
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("error es, ", error);
  }
};
