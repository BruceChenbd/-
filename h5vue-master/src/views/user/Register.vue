<template>
  <div class="regist-page">
    <div class="content">
      <van-field placeholder="用户名" v-model="phoneNumber" left-icon="contact" :error-message="phoneNumberError" />
      <!-- eye -->
      <van-field v-if="loginWay==='password'" placeholder="密码" v-model="password" left-icon="lock" :error-message="passwordError" :type="passwordType1">
         <van-icon slot="right-icon" @click="switchPasswordType" :name="passwordIcon"/>
      </van-field>
      <van-field v-if="loginWay==='password'" placeholder="确认密码" v-model="rePassword" left-icon="lock" :type="passwordType2">
         <van-icon slot="right-icon" @click="switchPasswordType1" :name="passwordIcon1"/>
      </van-field>
      <div class="button-wrap">
        <van-button  color="linear-gradient(to right, #4bb0ff, #7232dd)" size="large" @click="handleLogin" type="info">注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Icon, Button, Toast } from 'vant'
import { mapActions } from 'vuex'
// import VerifyCodeBtn from '@/components/VerifyCodeBtn'
export default {
  name: 'Register',
  data () {
    return {
      phoneNumber: '',
      password: '',
      rePassword: '',
      code: '',
      loginWay: 'password',
      passwordType1: 'password',
      passwordType2: 'password',
      phoneNumberError: '',
      passwordError: ''
    }
  },
  methods: {
    sendVerifyCode () {
      this.phoneNumberError = ''
      if (!this.phoneNumber) { // 根据需求做判断
        this.phoneNumberError = '请输入用户名'
      }
    },
    switchPasswordType () {
      this.passwordType1 = this.passwordType1 === 'password' ? 'text' : 'password'
    },
    switchPasswordType1 () {
      this.passwordType2 = this.passwordType2 === 'password' ? 'text' : 'password'
    },
    switchLoginWay () {
      this.password = this.code = ''
      this.loginWay = this.loginWay === 'password' ? 'verifyCode' : 'password'
    },
    handleLogin () {
      if (this.phoneNumber === '') {
        this.phoneNumberError = '请先输入用户名'
        return
      }
      if (this.password === '') {
        this.passwordError = '请设置密码'
        return
      }
      if (this.password !== this.rePassword) {
        Toast({
            message: '两次输入的密码不一致',
            position: 'middle',
            duration: 1500
        })
        return
      }
      const data = {
        username: this.phoneNumber,
        password: this.password,
        $router: this.$router,
        $route: this.$route
      }
      this.regist(data)
    },
    ...mapActions({
      regist: 'user/regist'
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
      return this.passwordType1 === 'password' ? 'closed-eye' : 'eye'
    },
    passwordIcon1: function () {
      return this.passwordType2 === 'password' ? 'closed-eye' : 'eye'
    }
  },
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Toast.name]: Toast
    // VerifyCodeBtn
  }
}
</script>
<style lang="scss" scoped>
.regist-page {
  background-color: #007fff;
}
  .content{
    padding: 60px 20px;
    width: 100%;
    height: auto;
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
