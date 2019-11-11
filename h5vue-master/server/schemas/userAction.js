/**
 * 用户注册 集合数据结构
 */
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    message: String,
    userId: String,
    userName: String,
    commentUserName: String,
    commentUserId: String,
    commentTime: String,
    commentAvatar: String,
    articleId: String,
    reply: Array
})
