var express = require('express');
var router = express.Router();
const  {MD5_KEY,responseClient,md5,getDateStr}  = require('../utils/utils')
const userActionSchema = require('../model/userAction');
const arttentionSchema = require('../model/attention');
const replySchema = require('../model/reply');

// 关注
router.post('/attention', (req,res) => {
    const { myUserName, myUserId, userName, userId } = req.body;

    let attention = new arttentionSchema({
      my_userId: myUserId,
      my_userName: myUserName,
      attention_userId: userId,
      attention_userName: userName
    })
    attention.save().then( data => {
      responseClient(res,200,0,'已关注!',data);
    }).catch(err => {
      responseClient(res);
    })
})
// 评论
router.post('/comment', (req, res) => {
  const {  message, userId, userName, commentUserName, commentUserId, commentAvatar, articleId }  = req.body;
  const now = new Date();
  var timeStr = getDateStr(now.getTime()/1000);
  let comment = new userActionSchema({
      message,
      userId,
      userName,
      commentUserName,
      commentUserId,
      commentTime: timeStr,
      commentAvatar,
      articleId,
      reply: []
  })
  comment.save().then( data => {
    responseClient(res,200,0,'评论成功!',data);
  }).catch(err => {
    responseClient(res);
  })

})

// 查询关注信息
router.post('/getAttention', (req,res) => {
  const { myUserName, myUserId } = req.body;
  arttentionSchema.find({my_userName: myUserName, my_userId:myUserId}).then( data => {
    responseClient(res,200,0,'查询成功!',data);
  }).catch(err => {
    responseClient(res);
  })
})

// 取消关注
router.post('/delAttention', (req,res) => {
  const { id } = req.body;

  arttentionSchema.remove({_id:id}).then(data => {
      if(data){
          responseClient(res,200,0,'取消关注!')
      }
  }).catch(err => {
      responseClient(err)
  })
})

router.post('/getComment', (req, res) => {
  const { userId, articleId } = req.body;
  userActionSchema.find({userId, articleId}).then(data => {
    responseClient(res,200,0,'查询成功!',data);
  }).catch(err => {
    responseClient(res);
  })
})


// 回复评论
router.post('/reply', (req, res) => {
  const { comment_id, replyUserId, replyUserName, replyContent } = req.body;
  const now = new Date();
  var timeStr = getDateStr(now.getTime()/1000);
  let arr = [];
  let obj = {
    comment_id,
    replyUserId,
    replyUserName,
    replyContent,
    replyTime: timeStr
  }
  userActionSchema.find({_id: comment_id}).then(c => {
    if (c[0].reply.length == 0) {
      arr.push(obj)
    } else {
      arr.push(obj)
      arr = [...arr,...c[0].reply];
    }
    userActionSchema.updateOne({_id: comment_id}, {reply: arr}).then(r => {
      responseClient(res,200,0,'更新成功!')
    }).catch(err => {
      responseClient(res)
    })
  })
})


// 获取回复
router.post('/getReply', (req, res) => {
  replySchema.find().then(data => {
    responseClient(res,200,0,'查询成功!',data);
  }).catch(err => {
    responseClient(res);
  })
})
module.exports = router;
