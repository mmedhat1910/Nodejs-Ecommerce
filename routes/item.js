const { Router } = require('express');
const itemModel = require('./../models/item');

const router = Router();

router.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    console.log(itemId)
    try {
        const item = await itemModel.findOne({ _id: itemId});
         // res.json(item);
         // console.log(item);

    res.render('galaxy.ejs',{item});
    }catch(e){
        console.log(e);
    }

   
    
})


module.exports = router;

//router.post('/categories', async (req, res) => {
//     const { username, password } = req.body;
//     //todo
//     const user = await UserModel.findOne({ username: username });
//     const isPasswordCorrect = await bcrypt.compare(user.password, password);
//     if (!user) {
//         return res.render('login.ejs', { status: 404 });
//     }
//     else if (isPasswordCorrect) {
//         return res.render('login.ejs', { status: 401 });
//     }
//     //TODO: Cookie not working
//     res.setHeader('Set-Cookie', `loggedin=true;username=${username}`);
//     return res.redirect('/');

// })