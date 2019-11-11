<template>
  <div class="login-page">
    <div class="header">
      <div class="logo">
        <img src="../../assets/xigua.jpg" alt="default_logo">
      </div>
    </div>
    <div class="content">
      <van-field placeholder="用户名" v-model="phoneNumber" left-icon="contact" :error-message="phoneNumberError" />
      <!-- eye -->
      <van-field v-if="loginWay==='password'" placeholder="登录密码" v-model="password" left-icon="lock" :type="passwordType" :error-message="passwordError">
         <van-icon slot="right-icon" @click="switchPasswordType" :name="passwordIcon"/>
      </van-field>
      <!-- <van-field v-else placeholder="短信验证码" v-model="password" left-icon="comment-o" type="text">
        <VerifyCodeBtn slot="button" @sendVerifyCode="sendVerifyCode" />
      </van-field> -->
      <div class="button-wrap">
        <van-button  color="linear-gradient(to right, #4bb0ff, #7232dd)" size="large" @click="handleLogin" type="info">登录</van-button>
      </div>
      <div class="more-wrap">
        <router-link class="link" to="/register">没有账号？去注册</router-link>
        <!-- <div class="switch-way" @click="switchLoginWay">{{loginWayObj.toggleMsg}}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button } from 'vant'
import { mapActions } from 'vuex'
// import VerifyCodeBtn from '@/components/VerifyCodeBtn'
export default {
  name: 'Login',
  data () {
    return {
      phoneNumber: '',
      password: '',
      code: '',
      loginWay: 'password',
      passwordType: 'password',
      phoneNumberError: '',
      passwordError: ''
    }
  },
  methods: {
    // sendVerifyCode () {
    //   this.phoneNumberError = ''
    //   if (!this.phoneNumber) { // 根据需求做判断
    //     this.phoneNumberError = '请输入用户名'
    //   }
    // },
    switchPasswordType () {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    switchLoginWay () {
      this.password = this.code = ''
      this.loginWay = this.loginWay === 'password' ? 'verifyCode' : 'password'
    },
    handleLogin () {
      if (!this.phoneNumber) {
        this.phoneNumberError = '请输入用户名'
        return;
      }
      if (!this.password) {
        this.passwordError = '请输入密码'
        return
      }
      const data = {
        username: this.phoneNumber,
        password: this.password,
        $router: this.$router,
        $route: this.$route
      }
      this.login(data)
    },
    ...mapActions({
      login: 'user/login'
    })
  },
  computed: {
    loginWayObj: function () {
      if (this.loginWay === 'password') {
        return {
          icon: 'closed-eye',
          toggleMsg: '验证码登录'
        }
      }
      return {
        icon: 'eye',
        toggleMsg: '密码登录'
      }
    },
    passwordIcon: function () {
      return this.passwordType === 'password' ? 'closed-eye' : 'eye'
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button
    // VerifyCodeBtn
  }
}
</script>
<style lang="scss" scoped>
  .login-page {
    background-color: #007fff;
  }
  .header{
    width: 100%;
    height: 175px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .blog-title {
      h4 {
        text-align: center;
        font-family: "League-Gothic", Courier;
        font-size: 25px;
        text-transform: uppercase;
        color: #fff;
      }
    }
    .logo{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
  }
  .content{
    width: 100%;
    height: auto;
    padding: 0 20px;
    box-sizing: border-box;
    .button-wrap{
      width: 100%;
      height: auto;
      margin-top: 15px;
    }
  }
  .more-wrap{
    align-items: center;
    margin-top: 15px;
    font-size: 14px;
    a.link{
      float: right;
      color: #fff;
      cursor: pointer;
    }
    .switch-way{
      color: #333;
    }
  }

</style>
