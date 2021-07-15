const {Schema, model} = require('mongoose')

const burger = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    toppings: {
        type: Array,
        required: false
    },
})

module.exports = model('Burger', burger)