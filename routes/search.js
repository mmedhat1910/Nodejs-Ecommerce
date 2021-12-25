const { Router } = require('express');
const itemModel = require('../models/item');

const router = Router();

router.get('/', (req, res) => {
    res.render('searchresults.ejs', { results: ["Hello"] })
});


router.post('/', async (req, res) => {
    const search = req.body.search;
    try {
        const items = await itemModel.find();
        const filteredItems = items.filter((item) => (item.name.toLowerCase()).includes(search.toLowerCase()));

        res.render('searchresults.ejs', { results: filteredItems, status: 200 });
    } catch (err) {
        res.redirect('error.ejs');
    }
})

module.exports = router;