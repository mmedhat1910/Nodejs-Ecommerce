const { Router } = require('express');
const UserModel = require('./../models/users')
const router = Router();

router.get('/login', (req, res) => {
    res.render('login.ejs', { status: 200 });
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username })
    console.log(user)
    if (username === 'admin' && password === '1234') {
        // res.setHeader('Set-Cookie', 'loggedin=true')
        return res.redirect('/');
    }
    return res.render('login.ejs', { status: 401 });
})

router.get('/register', (req, res) => {
    res.render('registration');
})

module.exports = router