const mongoose = require("mongoose");


// Schema
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  product: String,
  category: String,
  quantity: String,
  location: String,
  user: String
});

// Model
const ShopItems = mongoose.model('shoppinglistitems', ItemSchema);

module.exports = ShopItems;
