<template>
  <div class="container">
     <h5 class="title">文章详情</h5>
     <div class="user-box">
        <div class="user-info">
            <img :src="imgUrl + article.userAvatar" alt="">
            <span>{{article.userName}}</span>
        </div>
        <div class="attention-user">
           <van-button v-if="!isAttention" size="small"  @click="attentionClick" plain type="primary">+关注</van-button>
           <van-button v-else size="small"  @click="delAttentionClick" type="primary">已关注</van-button>
        </div>
     </div>
     <div class="content-box">
         <h2 class="article-title">{{article.title}}</h2>
         <div class="cover-image">
           <img :src="imgUrl + article.cover_image" alt="暂无封面">
         </div>
         <div class="content-body" v-html="article.content">

         </div>
         <div class="comment-area">
            <div v-if="commentList.length == 0" class="noData">
              啊哦! 暂时还没有小伙伴评论哦！
            </div>
            <div v-else class="comment-list">
               <div class="comment-item" v-for="item in commentList" :key="item._id">
                 <div class="comment-user">
                    <img :src="imgBaseUrl + item.commentAvatar" alt="">
                    <b>{{item.commentUserName}}</b>
                 </div>
                 <div class="comment-msg">
                   {{item.message}}
                 </div>
                 <div class="comment-time" style="overflow: hidden">
                   <b>{{item.commentTime}}</b>
                   <van-icon color="#007fff" v-if="!isReply" :data-id="item._id" :data-name="item.commentUserName"  @click="replyComment" style="float: right" name="comment-o" />
                   <van-icon color="#007fff" v-else @click="replyFocus"  style="float: right" name="comment-o"></van-icon>
                 </div>
                 <div v-if="item.reply.length>0" class="reply-box">
                    <div class="reply-item" v-for="rep in item.reply" :key="rep._id">
                        <b class="reply-name">{{rep.replyUserName}}:</b>
                        <b class="reply-msg">{{rep.replyContent}}</b>
                    </div>
                 </div>
               </div>
            </div>
         </div>
     </div>
     <div v-if="!isReply" class="comment-box">
          <input @focus="commentFocus" v-model="sendMsg" class="comment-input" type="text" placeholder="友善评论的宝宝运气不会太差哦">
          <div @click="sendComment" class="zan-and-comment" :style="{color: this.sendMsg? '#007fff': 'lightgray'}">
            发布
          </div>
     </div>
     <div v-else class="comment-box">
          <input ref="replyInput" @focus="commentFocus"  v-model="replyContent" class="comment-input" type="text" :placeholder="`回复 ${willReplyAuthor}`">
          <div @click="sendReply" class="zan-and-comment" :style="{color: this.replyContent? '#007fff': 'lightgray'}">
            回复
          </div>
     </div>
  </div>
</template>
<script>
import { Button, Field, Icon, Toast } from 'vant'
import { attention, comment, getAttention, delAttention, getComment, reply } from 'api/user'
// import { getArticleDetail } from 'api/article'
export default {
  name: 'Article',
  data () {
    return {
      article: {},
      imgUrl: '',
      sendMsg: '',
      isAttention: false,
      commentList: [],
      isReply: false,
      replyContent: '',
      willReplyAuthor: '',
      id: ''
    }
  },
  mounted () {
    // 图片url地址
    this.imgUrl = this.imgBaseUrl
    // 获取文章id
    const article = this.$store.state.user.article
    this.article = article
    // 获取评论列表
    this.getCommentList()

    // 先获取一次用户信息
    const myUserInfo = this.$store.getters.userData
    if (myUserInfo === null) {
      return
    }
    const myUserName = myUserInfo.username
    const myUserId = myUserInfo.userId
    const attentionUserId = article.userId
    let data = {
      myUserName,
      myUserId
    }
    // 获取本篇作者关注信息
    getAttention(data).then(res => {
      if (res.code === 0) {
        let data = res.data
        if (data.length > 0) {
          data.forEach(item => {
            if (item.attention_userId === attentionUserId) {
              this.isAttention = true
            }
          })
        }
      }
    })
  },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Toast.name]: Toast
  },
  methods: {
    // 回复的时候inputfocus事件
    replyFocus () {
      this.isReply = false
    },
    // 评论的时候inputfocus事件
    commentFocus () {
      // 本人用户信息
      const myUserInfo = this.$store.getters.userData
      if (myUserInfo === null) {
        this.$router.push({
          name: 'login'
        })
      }
    },
    // 发送评论
    sendComment () {
      if (!this.sendMsg) {
        return
      }
      const myUserInfo = this.$store.getters.userData
      // 本人用户信息
      const myUserName = myUserInfo.username
      const myUserId = myUserInfo.userId
      const myAvatar = myUserInfo.avatar_image ? myUserInfo.avatar_image : ''

      // 此篇文章_id
      const articleId = this.article._id
      // 文章所有者用户信息
      const userName = this.article.userName
      const userId = this.article.userId
      let data = {
        message: this.sendMsg,
        userId: userId,
        userName: userName,
        commentUserName: myUserName,
        commentUserId: myUserId,
        commentAvatar: myAvatar,
        articleId
      }
      comment(data).then(res => {
        if (res.code === 0) {
          Toast({
            message: '留言成功！',
            position: 'middle',
            duration: 1500
          })
          this.getCommentList()
          this.sendMsg = ''
        }
      })
    },
    // 关注
    attentionClick () {
      // 本人用户信息
      const myUserInfo = this.$store.getters.userData
      if (myUserInfo === null) {
        return
      }
      const myUserName = myUserInfo.username
      const myUserId = myUserInfo.userId

      // 要关注的作者用户信息
      const userName = this.article.userName
      const userId = this.article.userId

      if (userId === myUserId) {
        return
      }

      let data = {
        myUserName,
        myUserId,
        userName,
        userId
      }
      attention(data).then(res => {
        if (res.code === 0) {
          this.isAttention = true
        }
      }).catch(err => {
        Toast({
          message: err,
          position: 'middle',
          duration: 1500
        })
      })
    },
    // 取消关注
    delAttentionClick () {
      let delId = this.article.userId
      let data = {
        id: delId
      }
      delAttention(data).then(res => {
        if (res.code === 0) {
          this.isAttention = false
        }
      }).catch(err => {
        Toast({
          message: err,
          position: 'middle',
          duration: 1500
        })
      })
    },
    // 获取评论列表
    async getCommentList () {
      let data = {
        userId: this.article.userId,
        articleId: this.article._id
      }
      try {
        let result = await getComment(data)
        if (result.code === 0) {
          this.commentList = result.data
        }
      } catch (error) {

      }
    },
    // 点击信息标签回复
    replyComment (e) {
      // 要回复的评论id和和对应的用户名
      let id = e.target.dataset.id
      let name = e.target.dataset.name
      // 设置要回复的人名称和要回复的标志
      this.isReply = true
      this.willReplyAuthor = name
      this.id = id
      setTimeout(() => {
        this.$refs.replyInput.focus()
      }, 1000)
    },
    // 发送回复信息
    sendReply () {
      // 当前用户信息
      const myUserInfo = this.$store.getters.userData
      if (myUserInfo === null) {
        return
      }
      const myUserName = myUserInfo.username
      const myUserId = myUserInfo.userId

      let data = {
        comment_id: this.id,
        replyUserId: myUserId,
        replyUserName: myUserName,
        replyContent: this.replyContent
      }

      reply(data).then(res => {
        if (res.code === 0) {
          Toast({
            message: '回复成功！',
            position: 'middle',
            duration: 1500
          })
          this.replyContent = ''
          this.getCommentList()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.content-body {
    .media-wrap {
      text-align: center !important;
    }
    img {
      width: 100% !important;
    }
    pre {
      width: 100%;
    }
    code {
      width: 100%;
      overflow: scroll;
    }
}
</style>
<style lang="scss" scoped>
.title {
  width: 100%;
  background:#007fff;
  color: #fff;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  margin: 0;
  height: 50px;
  position: fixed;
  z-index: 10000;
}
.user-box {
  display: flex;
  margin-top: 50px;
  background: #fff;
  justify-content: space-between;
  padding: 20px 10px;
  .user-info {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    span {
      font-size: 15px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
  }
   .attention-user {
      display: flex;
      align-items: center;
   }
}
.content-box {
  background: #fff;
  .content-body{
     background: #fff;
     margin-bottom: 20px;
     border-bottom: 1px solid #eee;
  }
  padding: 10px;
  .article-title {
    text-align: center;
    background: #fff;
  }
  .cover-image {
    img {
      display: inline-block;
      width: 100%;
      height: 200px;
    }
  }
}
.comment-box {
  position: fixed;
  padding: 0 10px;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .comment-input {
     display: inline-block;
     width: 60%;
     height: 60%;
     border: 1px solid #eee;
     border-radius: 50px;
     padding: 5px 20px;
     font-size: 14px;
  }
  .zan-and-comment {
    width: 40%;
    display: flex;
    font-size: 14px;
    justify-content: space-around;
  }
  .zan-num {
    display: flex;
    align-items: center;
  }
  .comment-num {
    display: flex;
    align-items: center;
  }
}
.comment-area {
  background: #eee;
  margin-bottom: 50px;
  .noData {
    font-size: 14px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .comment-list {
    padding: 10px;
    .comment-item {
      border-bottom: 1px solid lightgray;
      padding: 5px 10px;
      margin: 0 0 20px 0;
      .comment-user {
        display: flex;
        align-items: center;
        span {
          color: orange;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .comment-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .comment-msg {
        display: flex;
        padding: 10px 0;
        font-size: 14px !important;
        word-break: break-all;
        color: #007fff
      }
      .reply-box {
        background: #d1cccc;
        border-radius: 10px;
        padding: 5px 5px;
        margin: 10px 0px;
        opacity: .9;
        color: #fff;
        .reply-item  {
          display: flex;
          align-items: center;
          font-size: 14px;
          padding: 5px;
          margin: 5px 0;
          .reply-name {
            font-size: 12px;
            color: black;
            margin-right: 10px;
          }
          .reply-msg {
            font-size: 14px;
            color: #007fff;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
