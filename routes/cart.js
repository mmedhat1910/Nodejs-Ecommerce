const { Router } = require('express');
const CartModel = require('./../models/cart')
const UserModel = require('./../models/users')
const ItemModel = require('./../models/item')
const router = Router();

router.get('/', async (req, res) => {
    const username = req.cookies.username;
    try {
        const user = await UserModel.findOne({ username: username });
        const cart = await CartModel.findOne({ user_id: user._id });
        const items = [];
        await Promise.all(cart.items.map(async (itemID) => {
            const i = await ItemModel.findOne({ _id: itemID });
            items.push(i);
        }));
        if (cart) {
            res.render('cart.ejs', { cart: items });
        } else {
            res.render('cart.ejs', { cart: [] })
        }
    } catch (err) {
        console.error(err);
    }
})

router.post('/', async (req, res) => {
    const username = req.cookies.username;
    const item = req.body.item;
    try {
        const user = await UserModel.findOne({ username: username });
        const cart = await CartModel.findOne({ user_id: user._id.toString() });
        if (cart && user) {

            if (cart.items.includes(item)) {
                return res.status(409).json({ msg: "Already in cart" });
            }
            const newItems = [...cart.items, item];
            console.log(newItems)
            const addToCartRes = await CartModel.updateOne({ _id: cart._id }, { items: newItems });
            console.log(addToCartRes);
            return res.status(200).json({ msg: "Added Successfully" });
        } else {
            //TODO: check here
            return res.status(404).json({ msg: "Not Found" });
        }
    } catch (err) {
        console.error(err);
    }

});

module.exports = router;

