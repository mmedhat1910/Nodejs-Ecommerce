const { Router } = require('express');
const UserModel = require('./../models/users')
const router = Router();

router.get('/login', (req, res) => {
    res.render('login.ejs', { status: 200 });
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    //todo
    const user = await UserModel.findOne({ username: username })

    if (!user) {
        return res.render('login.ejs', { status: 404 });
    }
    else if (password !== user.password) {
        return res.render('login.ejs', { status: 401 });
    }
    res.setHeader('Set-Cookie', 'loggedin=true')
    return res.redirect('/');

})

router.get('/register', (req, res) => {
    res.render('registration');
})

module.exports = router