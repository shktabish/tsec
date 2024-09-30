import mongoose from 'mongoose';

const { Schema } = mongoose;

const tutoringSessionSchema = new Schema(
  {
    student_ids: [
      {
        type: String,
        required: true,
        ref: 'User',
      },
    ], // An array of student IDs, allowing multiple students in one session
    mentor_id: {
      type: String,
      required: true,
      ref: 'User',
    },
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true, // Duration in minutes
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'canceled'],
      default: 'scheduled',
    },
  },
  { timestamps: true }
);

export const TutoringSession = mongoose.model('TutoringSession', tutoringSessionSchema);
