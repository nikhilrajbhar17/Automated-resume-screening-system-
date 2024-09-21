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
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your React frontend to make requests
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
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
