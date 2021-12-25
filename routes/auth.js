const { Router } = require('express');
const UserModel = require('./../models/users');
const CartModel = require('./../models/cart');
const bcrypt = require('bcrypt');
const req = require('express/lib/request');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login.ejs', { status: 200 });
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    const isPasswordCorrect = await bcrypt.compare(user.password, password);
    if (!user) {
        return res.render('login.ejs', { status: 404 });
    }
    else if (isPasswordCorrect) {
        return res.render('login.ejs', { status: 401 });
    }

    res.setHeader('Set-Cookie', ['loggedin=true', `username=${username}`]);
    return res.redirect('/');

})

router.get('/register', (req, res) => {
    res.render('registration.ejs', { status: 200 });
})
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username })
    if (user) {
        console.log(user)
        return res.render('registration.ejs', { status: 409 });
    } else {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({ username: username, password: hashPassword });
            await CartModel.create({ user_id: newUser._id, items: [] });
            res.setHeader('Set-Cookie', ['loggedin=true', `username=${username}`]);
            res.redirect('/');
        } catch (e) {
            return res.render('registration.ejs', { status: 400 });
        }
    }
})

module.exports = router;