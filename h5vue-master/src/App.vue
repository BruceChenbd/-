<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <router-view class="router"></router-view> -->
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view  class="router"></router-view>
      </keep-alive>
      <router-view class="router" v-else></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    transitionName () {
      return this.$store.state.direction
    }
  }
}
</script>

<style lang="scss">
@import "style/common.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}
.router {
  width: 100%;
  height: 100%;
  // height: 100vh;
  overflow: scroll;
  position: absolute;
  overflow: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
</style>
