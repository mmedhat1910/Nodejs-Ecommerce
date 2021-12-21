const { Router } = require('express');

const router = Router();

router.get('/login', (req, res) => {

    res.render('login.ejs', { status: 200 });
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // TODO: Connect to database
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