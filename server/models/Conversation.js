// /models/Message.js
const mongoose = require('mongoose');

const Conversation = new mongoose.Schema({
    people:[{
        type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: true
    }],
project: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true 
  },
message:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default:[]
}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Conversation', Conversation);
