const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('basket', {
        title: 'Корзина',
        isBasket: true
    })
})

module.exports = router