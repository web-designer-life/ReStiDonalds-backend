const {Router} = require('express')
const Burger = require('../models/burger')
const Other = require('../models/other')
const router = Router()

router.get('/', async (req, res) => {
    const burgers = await Burger.find().lean()
    const others = await Other.find().lean()
    
    res.render('menu', {
        title: 'Меню',
        isMenu: true,
        burgers,
        others
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const burger = await Burger.findById(req.params.id).lean()
    const other = await Other.findById(req.params.id).lean()

    if (burger) {
        res.render('editBurger', {
            title: `Редактировать ${burger.name}`,
            burger
        })
    }

    if (other) {
        res.render('editOther', {
            title: `Редактировать ${other.name}`,
            other
        })
    }
})

router.post('/edit', async (req, res) => {
    const _id = req.body.id

    delete req.body.id

    if (req.body.toppings) {
        req.body.toppings = req.body.toppings.split(',')
    }

    if (req.body.toppings === '') {
        delete req.body.toppings
    }

    if (req.body.choices) {
        req.body.choices = req.body.choices.split(',')
    }

    if (req.body.choices === '') {
        delete req.body.choices
    }

    await Burger.findByIdAndUpdate(_id, req.body).lean()
    await Other.findByIdAndUpdate(_id, req.body).lean()

    res.redirect('/menu')
})

router.post('/remove', async (req, res) => {
    try {
        await Burger.deleteOne({_id: req.body.id})
        await Other.deleteOne({_id: req.body.id})

        res.redirect('/menu')
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    const burger = await Burger.findById(req.params.id).lean()
    const other = await Other.findById(req.params.id).lean()

    if (burger) {
        res.render('burger', {
            layout: 'empty',
            title: burger.name,
            burger
        })
    }
    
    if (other) {
        res.render('other', {
            layout: 'empty',
            title: other.name,
            other
        })
    }
})

module.exports = router