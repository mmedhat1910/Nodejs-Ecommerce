const { model, Schema } = require('mongoose');

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    video: {
        type: String,
        required: true
    }


});

const itemModel = model('item', itemSchema);

module.exports = itemModel;
