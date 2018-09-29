<template>
  <div class="msite">
    <HeaderTop :title="address.name">

      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>

      <router-link :to="userInfo._id ? '/userinfo':'/login'" class="header_login" slot="right">
        <span v-if="!userInfo._id" class="header_login_text">
          登录|注册
        </span>
        <span v-else class="header_login_text">
          <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length > 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" v-for="(category,index) in categorys" :key="index" class="link_to_food">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
        <img src="./images/msite_back.svg" alt="back">
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HearderTop/HearderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  export default {
    data(){
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components:{
      HeaderTop,
      ShopList
    },
    mounted(){
      // 发送请求
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },
    computed:{
      ...mapState(['address','categorys','userInfo']),

      /*
      根据categorys一维数组生成一个2维数组
      小数组中的元素归属最大是8
      * */
      categorysArr(){
        const {categorys} = this
        // 准备空的2维数组
        const arr = []
        // 准备一个小数组，最大长度为8
        let minArr = []
        // 遍历categorys
        categorys.forEach(c =>{
          // 如果当前小数组已经满了，创建一个新的
          if(minArr.length === 8){
            minArr = []
          }
          // 如果minArr是空的，将小数组保存到大数组中
          if(minArr.length === 0){
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })
        return arr
      }

    },
    watch:{
      categorys(value){   // categorys数组有数据，在异步更新界面之前执行
        this .$nextTick(()=>{ // 该回调函数就是 一旦完成界面更新，立即调用（此条语句要写在数据更新之后）
          // 创建一个swiper实例对象，来实现轮播
          new Swiper('.swiper-container',{
            loop:true, // 循环轮播
            pagination:{
              el:'.swiper-pagination'
            }
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
