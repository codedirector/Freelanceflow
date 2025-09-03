const mongoose = require('mongoose');

const Project = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
enum: ['open', 'in progress', 'completed', 'cancelled'],
    default: 'open'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
   assignedfreelancerid:{
      type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
   }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', Project);
