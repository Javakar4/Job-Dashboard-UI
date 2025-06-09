const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Job = require('./models/Job');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json()); // For application/json
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const uri = "mongodb+srv://javakarjava44:JavakarN4@cluster0.dz5dlbb.mongodb.net/";

mongoose.connect(uri).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST /api/jobs — with optional file upload
app.post('/api/jobs', upload.single('logo'), async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
    } = req.body;

    if (!title || !company || !location || !type || !salary || !description) {
      return res.status(400).json({ error: 'Missing required job fields' });
    }

    const job = new Job({
      title,
      company,
      location,
      type,
      salary: parseFloat(salary),
      description,
      logo: req.file ? req.file.filename : null,
    });

    await job.save();
    res.status(201).json({ message: 'Job saved to MongoDB', job });
  } catch (error) {
    console.error('❌ Error saving job:', error);
    res.status(500).json({ error: 'Failed to save job', details: error.message });
  }
});

// GET /api/jobs — retrieve all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('❌ Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
