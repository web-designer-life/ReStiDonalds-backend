const {Schema, model} = require('mongoose')

const other = new Schema({
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
    choices: {
        type: Array,
        required: false
    },
})

module.exports = model('Other', other)