//models/Items.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema = new Schema({
  name: String,
  quantity: Number
});
module.exports = mongoose.model('Item', itemSchema);
