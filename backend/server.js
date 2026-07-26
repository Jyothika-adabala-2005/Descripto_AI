import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';
import Description from './models/Description.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(passport.initialize());
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected securely to MongoDB Atlas."))
  .catch(err => console.error("Database connection failure:", err));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many attempts from this IP. Please try again after 15 minutes." },
  statusCode: 429
});

const validateAuthFields = [
  body('email').isEmail().withMessage('Provide a valid email layout address.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password string must be at least 6 characters.')
];

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Access Denied: No authentication token provided." });
  }

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Access Denied: Invalid or expired authentication token." });
  }
};

app.get('/api/descriptions', requireAuth, async (req, res) => {
  try {
    const logs = await Description.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'DUMMY_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_CLIENT_SECRET',
    callbackURL: "http://localhost:5000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });
      
      if (!user) {
        user = new User({ email, password: 'OAUTH_EXTERNAL_ACCOUNT_VALIDATION_STRING' });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${token}`);
});

app.get('/api/descriptions/search', requireAuth, async (req, res) => {
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

app.get('/api/descriptions/:id', requireAuth, async (req, res) => {
  try {
    const log = await Description.findById(req.params.id);
    if (!log) return res.status(404).json({ error: "Record not found." });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format." });
  }
});


app.post('/api/descriptions', requireAuth, async (req, res) => {
  try {
    const { prodName, ingredients, weight, features, tone } = req.body;
    if (!prodName) return res.status(400).json({ error: "Validation failed: Product Name is required." });

    const response = await ai.interactions.create({
      model: 'gemini-3.5-flash', 
      input: `You are an expert e-commerce copywriter. Generate a concise, high-converting product description based on the following attributes:
      - Product Name: ${prodName}
      - Materials Used: ${ingredients || 'N/A'}
      - Weight/Dimensions: ${weight || 'N/A'}
      - Unique Features: ${features || 'N/A'}
      
      CRUCIAL LENGTH & FORMATTING INSTRUCTIONS:
      1. Keep the output SHORT, punchy, and under 80-100 words total.
      2. Tone: Strictly align with a "${tone || 'Professional'}" marketing tone alignment.
      3. Structure: Open with a 1-2 sentence snappy hook paragraph, followed by 2-3 short bullet points highlighting key features or materials value.
      4. Avoid filler text, long intro phrases, or fluffy descriptions.`,
    });

    const outputCopy = response.output_text; 

    const newLog = new Description({ prodName, ingredients, weight, features, outputCopy });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    console.error("❌ Gemini API Pipeline Error Details:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/descriptions/:id', requireAuth, async (req, res) => {
  try {
    const { outputCopy } = req.body;
    const updatedRecord = await Description.findByIdAndUpdate(
      req.params.id,
      { outputCopy },
      { new: true }
    );
    if (!updatedRecord) return res.status(404).json({ error: "Record not found." });
    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/descriptions/:id', requireAuth, async (req, res) => {
  try {
    const deletedLog = await Description.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ error: "Record not found." });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/signup', authLimiter, validateAuthFields, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "An account with this email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, email: newUser.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', authLimiter, validateAuthFields, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password credentials." });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server operational on port http://localhost:${PORT}`));