/**
 * 结合
 */
const mongoose  = require('mongoose');
const userActionSchema = require('../schemas/userAction');

module.exports = mongoose.model("userAction",userActionSchema);
