<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o"
                     replace
                     to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="user-o"
                     replace
                     to="/personal">个人中心</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'FooterTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>
