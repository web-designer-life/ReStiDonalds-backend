const {Router} = require('express')
const Burger = require('../models/burger')
const router = Router()

router.get('/', (req, res) => {
    res.render('addBurger', {
        title: 'Добавить бургер',
        isAddBurger: true
    })
})

router.post('/', async (req, res) => {

    if (req.body.toppings === '') {
        delete req.body.toppings
    } else {
        req.body.toppings = req.body.toppings.split(',')
    }

    const burger = new Burger({
        name: req.body.name, 
        img: req.body.img,
        price: req.body.price,
    })

    try {
        await burger.save()

        res.redirect('/menu')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router