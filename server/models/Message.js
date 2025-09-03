// /models/Message.js
const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: true
  },
    receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: true
  },
    Conversationid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation', 
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', Message);