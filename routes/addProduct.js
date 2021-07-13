const {Router} = require('express')
const Product = require('../models/product')
const router = Router()

router.get('/', (req, res) => {
    res.render('addProduct', {
        title: 'Добавить продукт',
        isAddProduct: true
    })
})

router.post('/', async (req, res) => {
    const product = new Product({
        title: req.body.title, 
        price: req.body.price, 
        image: req.body.image
    })

    try {
        await product.save()

        res.redirect('/menu')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router