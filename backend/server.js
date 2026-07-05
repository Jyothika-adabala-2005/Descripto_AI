import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Description from './models/Description.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Establish Cloud Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected securely to MongoDB Atlas."))
  .catch(err => console.error("Database connection failure:", err));

// 1. GET ALL ITEMS
app.get('/api/descriptions', async (req, res) => {
  try {
    const logs = await Description.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET SEARCH LOGS (Must be placed ABOVE the /:id route)
app.get('/api/descriptions/search', async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const filtered = await Description.find({
      $or: [
        { prodName: { $regex: query, $options: 'i' } },
        { features: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET SINGLE ITEM BY ID
app.get('/api/descriptions/:id', async (req, res) => {
  try {
    const log = await Description.findById(req.params.id);
    if (!log) return res.status(404).json({ error: "Record not found." });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format." });
  }
});

// 4. CREATE NEW ITEM (POST)
app.post('/api/descriptions', async (req, res) => {
  try {
    const { prodName, ingredients, weight, features } = req.body;
    if (!prodName) return res.status(400).json({ error: "Validation failed: Product Name is required." });

    const outputCopy = `Premium Marketplace Copywriting Asset:\nDiscover the standout qualities of our newly optimized ${prodName}. Meticulously sourced incorporating choice components like ${ingredients || 'natural elements'}. Delivered in exact ${weight || 'standard'} batch quantities with distinctive ${features || 'premium'} details.`;

    const newLog = new Description({ prodName, ingredients, weight, features, outputCopy });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 5. UPDATE ITEM (PUT)
app.put('/api/descriptions/:id', async (req, res) => {
  try {
    const updatedLog = await Description.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLog) return res.status(404).json({ error: "Record not found." });
    res.status(200).json(updatedLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. DELETE ITEM
app.delete('/api/descriptions/:id', async (req, res) => {
  try {
    const deletedLog = await Description.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ error: "Record not found." });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ==========================================
// AUTHENTICATION: SIGNUP ENDPOINT
// ==========================================
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "An account with this email already exists." });

    // Hash the user's password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Sign a secure JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token, email: newUser.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// AUTHENTICATION: LOGIN ENDPOINT
// ==========================================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password credentials." });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server operational on port http://localhost:${PORT}`));