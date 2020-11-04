const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')

const auctionSchema = new mongoose.Schema({
  item: {
    type: Schema.Types.ObjectId, ref: 'Item'
  },
  user: { 
    type: Schema.Types.ObjectId, ref: 'User'
  }, 
  bid: {
    type: Number,
    required: true
  }
})


module.exports = mongoose.model('Auction', auctionSchema);
