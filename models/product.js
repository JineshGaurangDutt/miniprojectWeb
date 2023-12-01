const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    spiciness: {
        type: Number,
        required: false
    },
    // productID: {
    //     type: String,
    //     required: true,
    //     unique: true
    // }
});

module.exports = mongoose.model('product', productSchema);
