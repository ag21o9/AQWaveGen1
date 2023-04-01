const mongoose = require('mongoose')

var schema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const coll = new mongoose.model('register',schema)

module.exports = coll;