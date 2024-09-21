const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filePath: { type: String, required: true },
  extractedData: { type: Object },
});

module.exports = mongoose.model("Resume", resumeSchema);
