const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },       // Job Title
  company: { type: String, required: true },     // Company Name
  location: { type: String, required: true },    // e.g., Chennai
  type: { type: String, required: true },        // e.g., Full Time
  salary: { type: Number },                      // Single number (in LPA)
  logo: { type: String },                        // File path or filename
  description: { type: String },                 // Job description
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
