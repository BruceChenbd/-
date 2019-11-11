/**
 * 结合
 */
const mongoose  = require('mongoose');
const replySchema = require('../schemas/reply');

module.exports = mongoose.model("replySchema",replySchema);
