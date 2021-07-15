const {Router} = require('express')
const Other = require('../models/other')
const router = Router()

router.get('/', (req, res) => {
    res.render('addOther', {
        title: 'Добавить закуску/напиток',
        isAddOther: true
    })
})

router.post('/', async (req, res) => { 

    if (req.body.choices === '') {
        delete req.body.choices
    } else {
        req.body.choices = req.body.choices.split(',')
    }

    const other = new Other({
        name: req.body.name, 
        img: req.body.img,
        price: req.body.price,
    })

    try {
        await other.save()

        res.redirect('/menu')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router