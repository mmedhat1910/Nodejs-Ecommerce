const { Router } = require('express');
const router = Router();
const itemModel = require('./../models/item');

router.get('/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const itemList = await itemModel.find({ category: category });
        if (itemList && itemList.length > 0) {
            return res.render('category.ejs', { itemList: itemList });
        }
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;