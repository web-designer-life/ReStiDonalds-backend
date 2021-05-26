const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const menuRoutes = require('./routes/menu')
const basketRoutes = require('./routes/basket')
const productsRoutes = require('./routes/products')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // registrate handlebars in express
app.set('view engine', 'hbs') // use handlebars
app.set('views', 'views')

app.use(express.static('public'))
app.use('/', homeRoutes)
app.use('/menu', menuRoutes)
app.use('/basket', basketRoutes)

app.use('/api/products', productsRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})