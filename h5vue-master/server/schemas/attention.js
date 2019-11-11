const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    my_userId: String,
    my_userName: String,
    attention_userId: String,
    attention_userName: String
})
