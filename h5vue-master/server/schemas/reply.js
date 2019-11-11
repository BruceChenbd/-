/**
 * 用户注册 集合数据结构
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    comment_id: String,
    replyUserId: String,
    replyUserName: String,
    replyContent: String,
    replyTime: String
})
