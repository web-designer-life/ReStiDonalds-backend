const {Router} = require('express')
const Product = require('../models/product')
const router = Router()

router.get('/', async (req, res) => {
    const products = await Product.find().lean()
    
    res.render('menu', {
        title: 'Меню',
        isMenu: true,
        products
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const product = await Product.findById(req.params.id).lean()

    res.render('editProduct', {
        title: `Редактировать ${product.title}`,
        product
    })
})

router.post('/edit', async (req, res) => {
    const _id = req.body.id

    delete req.body.id

    await Product.findByIdAndUpdate(_id, req.body).lean()

    res.redirect('/menu')
})

router.post('/remove', async (req, res) => {
    try {
        await Product.deleteOne({_id: req.body.id})

        res.redirect('/menu')
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).lean()

    res.render('product', {
        layout: 'empty',
        title: product.title,
        product
    })
})

module.exports = router