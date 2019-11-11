<template>
  <div class="home">
    <div class="banner">
      <van-search
        placeholder="请输入搜索关键词"
        show-action
        v-model="searchKey"
        :clearable="true"
        use-action-slot
        bind:search="onSearch"
        bind:clear="clearKey"
        background="#007fff"
        field-class="search"
      >
        <div  class="go-search" slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
    <div class="tab-list">
       <van-tabs sticky animated color="#007fff" :active="active" @change="onChange">
           <van-tab title="文章">
                <div class="container">
                  <div class="list-wrap">
                    <van-loading v-show="isLoading" type="spinner" size="20px" vertical color="#007fff">

                    </van-loading>
                      <vo-pages :data="list"
                                @pullingUp="pullingUp"
                                @pullingDown="pullingDown"
                                :loadedAll="loadedAll"
                                noDataHint
                                >
                        <ul class="article-list">
                          <li class="article"
                              v-for="article in list"
                              :key="article.id" @click="goDetail(article)">
                            <div class="right">
                              <div class="article-header">
                                <div class="article-header-userinfo">
                                   <img :src="imgUrl + article.userAvatar" alt="">
                                   <span>{{article.userName}}</span>
                                </div>
                                <div class="article-header-tag">
                                  {{article.tagStr}}
                                </div>
                              </div>
                              <p>{{ article.title }}</p>
                              <p class="more-info">
                                <span class="time">发布时间：{{article.displayTimeFormart}}</span>
                              </p>
                            </div>
                          </li>
                        </ul>
                      </vo-pages>
                    </div>
                </div>
           </van-tab>
           <van-tab title="关注">
             <div class="noData">暂时还没有已关注的作者哦</div>
           </van-tab>
       </van-tabs>
    </div>
    <footer-tabbar/>
  </div>
</template>

<script>
import { Button, Tabbar, TabbarItem, Search, Icon, Tabs, Tab, Loading } from 'vant'
import { mapActions } from 'vuex'
import FooterTabbar from 'components/FooterTabbar'
import { fetchList, getUserList } from 'api/article'
import VoPages from 'vo-pages'
import 'vo-pages/lib/vo-pages.css'
import './home.scss'
export default {
  name: 'home',
  data () {
    return {
      value: 1,
      searchKey: '宝哥哥太帅啦',
      active: 0,
      list: [],
      total: 0,
      pageNum: 1,
      loadedAll: false,
      userList: [],
      imgUrl: '',
      isLoading: false,
      isFirstEnter: false // 是否第一次进入页面
    }
  },
  components: {
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Search.name]: Search,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Loading.name]: Loading,
    FooterTabbar,
    VoPages
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'articleDetail') { // 下一级页面的路由name
      to.meta.isBack = true // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
    }
    next()
  },
  created () {
    this.isFirstEnter = true
  },
  async activated () {
  },
  async mounted () {
    this.isLoading = true
    await this.getList()
    this.imgUrl = this.imgBaseUrl
  },
  computed: {
  },
  methods: {
    goDetail (article) {
      // 将对象转化为字符串进行传递，防止页面刷新时值变为undefined
      article = JSON.stringify(article)
      this.setDetail(article)
      this.$router.push({
        name: 'articleDetail'
      })
    },
    ...mapActions({
      setDetail: 'user/setDetail'
    }),
    onSearch (e) {
      console.log(this.searchKey)
    },
    clearKey () {

    },
    onChange (e) {

    },
    pullingDown () {
      this.beforePullDown = false
      this.pageNum = 1
      this.getList(false)
    },
    pullingUp () {
      this.pageNum += 1
      this.getList()
    },
    async getList (loadMore = true) {
      const data = {
        pageNum: this.pageNum
      }
      const userData = await getUserList()
      const userList = userData.data.userList
      const result = await fetchList(data)
      this.isLoading = false
      this.total = result.data.total
      const newList = result.data.articleArr.map(article => {
        article.displayTimeFormart = article.createTime
        return article
      })
      newList.forEach(item => {
        userList.forEach(u => {
          if (item.userId === u._id) {
            item.userName = u.username
            item.userAvatar = u.avatar_image
          }
        })
      })
      newList.forEach(item => {
        if (item.tag_ids.length > 1) {
          item.tagStr = item.tag_ids.join('/')
        } else {
          item.tagStr = item.tag_ids[0]
        }
      })
      if (loadMore) {
        this.list = this.list.concat(newList)
      } else {
        this.list = newList
      }
      if (!this.beforePullDown) {
        this.beforePullDown = true
      }
      this.loadedAll = this.total <= this.list.length
    }
  }
}
</script>
<style>
 .pulldown-wrapper {
    top: -50px !important;
 }
</style>
<style lang="scss" scoped>

.van-search__action {
  background: #007fff;
}
.home {
  height: 100%;
  width: 100%;
  .go-search {
    color: #fff;
    &:active {
      color: #eee;
    }
  }
  .tab-list {
    margin-top: 50px;
  }
}
.banner {
  width: 100%;
  height: 50px;
  position: fixed;
}
.now-value {
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 16px;
  // line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-list {
  margin: 15px;
  font-size: 24px;
  .icon{
    margin: 0 10px;
  }
}
.buttons{
  padding: 0 15px;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a{
    color: #333
  }
}

p{
  margin-block-start: 0;
  margin-block-end: 0;
}
.container{
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  .list-wrap{
    height:  calc(100vh - 140px);
    overflow-y: hidden;
  }
}
.noData {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.article-list {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 15px 20px 0;
  .article {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 15px;
    box-sizing: border-box;
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 0 6px #e3e3e3;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: 80px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      .article-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: 14px;
        .article-header-tag {
          max-width: 100px;
          overflow: hidden;
          text-overflow:ellipsis;/* 超出部分显示省略号 */
          white-space: nowrap;/*规定段落中的文本不进行换行 */
        }
        .article-header-userinfo {
          display: flex;
          align-items: center;
          img {
            width: 25px;
            height: 25px;
            margin-right: 5px;
            border-radius: 50%;
            background: orange;
          }
        }
      }
      p {
        width: 100%;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
      }
      .more-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
