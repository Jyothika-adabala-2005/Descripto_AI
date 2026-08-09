import mongoose from 'mongoose';

const descriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prodName: { type: String, required: true },
  ingredients: String,
  weight: String,
  features: String,
  outputCopy: String
}, { timestamps: true });

export default mongoose.model('Description', descriptionSchema);