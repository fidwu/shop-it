const mongoose = require("mongoose");


// Schema
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  product: String,
  category: String,
  quantity: Number,
  expDate: String,
  user: String
});

// Model
const InventoryItems = mongoose.model('groceryitems', ItemSchema);

module.exports = InventoryItems;
