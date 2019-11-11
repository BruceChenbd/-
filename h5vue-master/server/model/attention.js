const mongoose  = require('mongoose');
const arttentionSchema = require('../schemas/attention');

module.exports = mongoose.model("arttention",arttentionSchema);
