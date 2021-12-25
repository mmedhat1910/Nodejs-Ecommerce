const { Router } = require('express');
const router = Router();
const itemModel=require('./../models/item')

router.get('/:category',async (req, res)=>{
    const category=req.params.category;
    const itemList= await itemModel.find({category:category})
    return res.render('phones.ejs',{itemList:itemList});
})

module.exports = router;