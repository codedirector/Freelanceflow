const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["client", "freelancer"],
    default: "freelancer"
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Users', Users);
