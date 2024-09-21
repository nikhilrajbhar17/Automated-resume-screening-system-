const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const { produceResumeData } = require("../kafka/producer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + `${Date.now()}-file.originalname`);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });

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

router.post(
  "/upload",
  upload.single("resume"),
  authenticateToken,
  async (req, res) => {
    const resumeData = await pdfParse(req.file.path);
    console.log("req file: " + req.file.path);

    console.log("req.user : " + userId);
    const resume = new Resume({
      userId: userId,
      filePath: req.file.path,
      extractedData: resumeData.text,
    });
    await resume.save();

    // Produce resume data to Kafka
    await produceResumeData(resumeData.text, userId);

    res.json({ message: "Resume uploaded and data extracted successfully" });
  }
);

module.exports = router;
