const { Router } = require('express');
const router = Router();

router.get('category/:category',(req, res)=>{
    const category=req.params.category;
    return res.render('phones.ejs',{Status:200});
})

module.exports = router;