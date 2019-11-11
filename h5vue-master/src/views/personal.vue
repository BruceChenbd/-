<template>
  <div class="container">
    <h5 class="user-header">我</h5>
    <van-cell-group style="margin: 30px 0" custom-class="user-group">
      <van-cell is-link center>
       <div v-if="!isLogin" class="user-area" @click="goLogin">
          <img class="user-default" src="../assets/user.png" alt="">
          <h1>登陆/注册</h1>
       </div>
       <div v-else class="user-area">
          <img class="user-default" :src="imgUrl" alt="">
          <h1>{{userInfo.username}}</h1>
       </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell icon="comment-o">
        消息中心
      </van-cell>
      <van-cell icon="good-job-o">
        我赞过的
      </van-cell>
      <van-cell icon="setting-o">
        设置
      </van-cell>
    </van-cell-group>
    <van-cell-group v-show="isLogin" style="margin: 30px 0">
      <div class="loginOut" @click="loginOut">
        退出登陆
      </div>
    </van-cell-group>
    <footer-tabbar/>
  </div>
</template>
<script>
// import { fetchList } from 'api/article'
import { Cell, CellGroup, Button } from 'vant'
import FooterTabbar from 'components/FooterTabbar'
export default {
  name: 'Article',
  data () {
    return {
      active: 1,
      list: [],
      total: 0,
      page: 1,
      loadedAll: false,
      userInfo: {},
      isLogin: false,
      imgUrl: ''
    }
  },
  mounted () {
    this.imgUrl = this.imgBaseUrl;
    const userInfo = this.$store.getters.userData;
    if(JSON.stringify(userInfo) !== '{}' && userInfo != null) {
       this.isLogin = true;
       this.userInfo = userInfo
       this.imgUrl = this.imgUrl+ userInfo.avatar_image;
    }
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    FooterTabbar
  },
  methods: {
    goLogin () {
      this.$router.push({
        name: 'login'
      })
    },
    loginOut () {
      this.$store.dispatch('user/loginOut')
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
  width: 100%;
  .user-header {
    background:#007fff;
    color: #fff;
    display: flex;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    margin: 0;
    height: 50px;
  }
  background: #f5f5f5;
  h1 {
    color: #333;
    font-weight: 300;
    font-size: 20px;
  }
  .user-area  {
    display: flex;
    align-items: center;
  }
  .user-default {
    width: 45px;
    height: 45px;
    margin-right: 20px;
    border-radius: 50%;
    background:#eee;
  }
  .loginOut {
    text-align: center;
    padding: 15px;
    font-size: 14px;
    &:active {
      color: #007fff;
    }
  }
}

</style>
