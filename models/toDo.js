const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: 'Please Supply a user ID'
    },
    item: {
        type: String,
        required: 'Please give an item'
    },
    done: {
        type: Boolean,
        required: 'Please choose a display option'
    },
    order: {
        type: Number,
        required: 'Please add order to your list.'
    },
    
})

module.exports = mongoose.model('toDo', toDoSchema)