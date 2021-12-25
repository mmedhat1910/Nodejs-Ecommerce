const { model, Schema } = require('mongoose');

const cartSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    items: {
        type: Array,
        required: true,
        default: [],
    }
});

const CartModel = model('cart', cartSchema);

module.exports = CartModel;