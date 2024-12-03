const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  text: { type: String, required: true },
  summary: { type: String, required: true },
  date: { type: Date, default: Date.now },
  last_update_date: { type: Date, default: Date.now },
  inputLanguage: { type: String, required: true },
  outputLanguage: { type: String, required: true },
  email: { type: String, required: true },
});

const Summary = mongoose.model('Summary', summarySchema);
module.exports = Summary;