const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  spiciness: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Additional product fields as needed
});

module.exports = mongoose.model('Product', productSchema);
