const {Router} = require('express')
const Burger = require('../models/burger')
const Other = require('../models/other')
const router = Router()

router.get('/', async (req, res) => {
    const burgers = await Burger.find().lean()
    const others = await Other.find().lean()

    burgers.forEach((item) => {
        item.id = item._id

        if (item.toppings.length === 0) {
            delete item.toppings
        }

        delete item._id
        delete item.__v
    })

    others.forEach((item) => {
        item.id = item._id

        if (item.choices.length === 0) {
            delete item.choices
        }
        
        delete item._id
        delete item.__v
    })

    const products = {}
    products.burger = burgers;
    products.other = others;

    res.writeHeader(200 , {"Content-Type" : "text/html; charset=utf-8"});
    res.end(JSON.stringify(products))
})

module.exports = router