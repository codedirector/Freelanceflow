const mongoose = require('mongoose');

const Proposal = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true
  },
  coverLetter: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: Number,
    required: true,
    min: 0,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  freelancerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectid: {
    type: String,
    ref: 'Project',
    default: null,
  },
  acceptedAt: {
     type: Date,
  },
  acceptedby:{
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Proposal', Proposal);
