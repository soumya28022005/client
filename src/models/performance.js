const mongoose = require("mongoose");

const PerformanceSchema = new mongoose.Schema({
  userId: String,
  subject: String,
  score: Number,
  weakTopics: [String],
});

module.exports = mongoose.model("Performance", PerformanceSchema);