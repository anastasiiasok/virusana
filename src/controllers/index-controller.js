const Item = require('../models/item-model');
const User = require('../models/user-model');
const Auction = require('../models/auction-model');

const index = async (req, res) => {
  let allItems = await Item.find();
  res.render('index', {allItems})
};


const detail = async (req, res) => {
  let item = await Item.findById(req.params.id);
  res.render('showMain', {item})
};

const sendBid = async (req, res) => {
  const bid = req.body.bid;
  const auction = await new Auction({
    item: req.body.item,
    user: req.session.user.id,
    bid
  }).save();
  const user = await User.findById(req.session.user.id);
  user.bids.push(auction._id);
  res.redirect('/')
}

module.exports = {
  index,
  detail,
  sendBid
}
