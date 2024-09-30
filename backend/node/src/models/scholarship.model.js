import mongoose from 'mongoose';

const { Schema } = mongoose;

const scholarshipSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  eligibility: {
    type: String, // Eligibility criteria
  },
  amount: {
    type: Number, // Scholarship amount
  },
  deadline: {
    type: Date, // Application deadline
  },
  application_link: {
    type: String, // URL for applying
  },
}, { timestamps: true });

export const Scholarship = mongoose.model('Scholarship', scholarshipSchema);


