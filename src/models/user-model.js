const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    
  },
  password: {
    type: String,
    required: true
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' }]
})


module.exports = mongoose.model('User', userSchema);
