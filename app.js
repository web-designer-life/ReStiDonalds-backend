const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const menuRoutes = require('./routes/menu')
const addBurgerRoutes = require('./routes/addBurger')
const addOtherRoutes = require('./routes/addOther')
const productsRoutes = require('./routes/products')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // registrate handlebars in express
app.set('view engine', 'hbs') // use handlebars
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/menu', menuRoutes)
app.use('/addBurger', addBurgerRoutes)
app.use('/addOther', addOtherRoutes)

app.use('/api/products', productsRoutes)

const PORT = process.env.PORT || 8000

async function start() {
    try {
        const url = 'mongodb+srv://ReStiAdmin:aUnVoLXQSovIK3dN@cluster0.zyvpj.mongodb.net/ReStiDonalds'

        await mongoose.connect(url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false 
        })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()