import mongoose from 'mongoose';

const descriptionSchema = new mongoose.Schema({
  prodName: { type: String, required: true },
  ingredients: { type: String },
  weight: { type: String },
  features: { type: String },
  outputCopy: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Description', descriptionSchema);