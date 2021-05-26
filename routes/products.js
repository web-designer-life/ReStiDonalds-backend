const {Router} = require('express')
const router = Router()
const products = require('../public/products')

router.get('/', (req, res) => {
    res.writeHeader(200 , {"Content-Type" : "text/html; charset=utf-8"});
    res.end(JSON.stringify(products))
})

module.exports = router