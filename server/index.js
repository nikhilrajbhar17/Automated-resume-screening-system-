const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const scoreRoute = require("./routes/scoreRoute");
const resumeRoutes = require("./routes/resume");
const { consumeResumeData } = require("./kafka/consumer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000", // for local development
  "https://automated-resume-screening-system.vercel.app/", // replace with your Vercel frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        // !origin allows non-web requests (e.g., Postman)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows credentials (like cookies) to be sent
    allowedHeaders: ["Authorization", "Content-Type"], // Allow the specified headers
  })
);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

// Routes
app.use("/api/result", scoreRoute);
app.use("/api/auth", authRoutes);
console.log("about");
app.use("/api/resume", resumeRoutes);

// Start Kafka Consumer
consumeResumeData();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
