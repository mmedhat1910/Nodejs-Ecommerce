const { Router } = require('express');
const itemModel = require('./../models/item');

const router = Router();

router.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    console.log(itemId)
    try {
        const item = await itemModel.findOne({ _id: itemId });
        // res.json(item);
        // console.log(item);

        res.render('item.ejs', { item });
    } catch (e) {
        console.log(e);
    }



})


module.exports = router;
