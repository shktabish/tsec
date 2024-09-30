import mongoose, {Schema} from "mongoose"

const connectionSchema = new Schema({
  
  student_id: {
    type: String,
    required: true,
    ref: 'User',
  },
  mentor_id: {
    type: String,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Connection = mongoose.model('MentorStudentConnection', connectionSchema);


