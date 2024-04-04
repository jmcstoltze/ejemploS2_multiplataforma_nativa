
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = Schema({
    fullname: String,
    email: String,
    createdAt: {type: Date, default: Date.now},
    photo: String,
    active: {type: Boolean, default: true}
})

module.exports = mongoose.model('User', userSchema)