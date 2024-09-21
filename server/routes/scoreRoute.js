const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model
const router = express.Router();


var userId = "";
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token part

  if (!token) {
    console.log("No token provided.");
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed: ", err);
      return res.sendStatus(403); // Forbidden if the token is invalid
    }

    userId = decoded.userId;
    req.user = decoded; // Attach decoded data to request object
    next(); // Proceed to the next middleware or route
  });
};

router.get("/score", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(userId); // Use the userId from token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ resumeScore: user.resumeScore });
  } catch (error) {
    console.error("Error fetching resume score:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
