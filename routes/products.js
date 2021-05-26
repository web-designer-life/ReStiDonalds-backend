const {Router} = require('express')
const router = Router()
const products = require('../public/products')

router.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/json'
    })

    res.end(JSON.stringify(products))
})

module.exports = router