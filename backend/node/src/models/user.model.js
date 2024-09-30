import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar:{
    type:String, //url
  },
  refreshToken:{
    type:String,
  },
  role: {
    type: String,
    enum: ['student', 'mentor'],
    required: true,
  },
  subjects: [{
    type: String,
  }], // List of subjects the user is interested in or can tutor
}, { 
  timestamps: true, 
});

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
  console.log("Generating access token for user:", this);
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  );
}

userSchema.methods.generateRefreshToken = function() {
  console.log("Generating refresh token for user:", this);
  return jwt.sign(
      {
          _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  );
}



export const User = mongoose.model('User', userSchema);
