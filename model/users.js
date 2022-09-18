const mongoose = require('mongoose')
const schema = mongoose.Schema

const userModel = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        reqiured : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User',userModel)