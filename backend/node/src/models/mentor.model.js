import mongoose from 'mongoose';

const { Schema } = mongoose;

const mentorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User schema
    required: true
  },
  currentProfession: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  academicQualifications: {
    type: String,
    required: true
  },
  skills: {
    type: [String],  // Array of skills
    required: true
  }
}, { timestamps: true });

export const Mentor = mongoose.model('Mentor', mentorSchema);

