<template>
  <div class="home">
    <div class="nav clearfix">
      <span class="user">
        <img class="auto-img" src="../assets/icons/user.png" alt />
      </span>
      <span>i-漫画</span>
    </div>

    <div class="content">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img class="auto-img" src="../assets/images/sw.jpeg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img class="auto-img" src="../assets/images/sw2.jpeg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img class="auto-img" src="../assets/images/sw3.jpeg" alt />
        </van-swipe-item>
      </van-swipe>

      <!-- 最新漫画 -->
      <div class="home-new">
        <div class="home-new-title">
          <span class="fl">最近更新</span>
          <span class="fr" @touchstart="toDetail({name: 'list', params: {url: 'new/最近更新'}})">更多</span>
        </div>
        <div class="home-new-content">
          <div class="new-box">
            <div class="new-item" v-for="(item,index) in newData" :key="index" :data-id="item.url" @touchstart="toDetail({name: 'detail', params: {url: item.url}})">
              <div class="img-box">
                <img class="auto-img" :src="item.cover" alt />
                <div class="mask">
                  <span>{{item.time}}</span>
                </div>
              </div>
              <div class="name-box one-text">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 热门漫画 -->
      <div class="home-new">
        <div class="home-new-title">
          <span class="fl">热门漫画</span>
          <span class="fr" @touchstart="toDetail({name: 'list', params: {url: 'hot/热门漫画'}})">更多</span>
        </div>
        <div class="home-new-content">
          <div class="new-box">
            <div class="new-item" v-for="(item,index) in hotData" :key="index" :data-id="item.url" @touchstart="toDetail({name: 'detail', params: {url: item.url}})">
              <div class="img-box">
                <img class="auto-img" :src="item.cover" alt />
                <div class="mask">
                  <span>{{item.time}}</span>
                </div>
              </div>
              <div class="name-box one-text">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 国产漫画 -->
      <div class="home-new">
        <div class="home-new-title">
          <span class="fl">国产漫画</span>
          <span class="fr" @touchstart="toDetail({name: 'list', params: {url: 'guochan/国产漫画'}})">更多</span>
        </div>
        <div class="home-new-content">
          <div class="new-box">
            <div class="new-item" v-for="(item,index) in gouchanData" :key="index" :data-id="item.url" @touchstart="toDetail({name: 'detail', params: {url: item.url}})">
              <div class="img-box">
                <img class="auto-img" :src="item.cover" alt />
                <div class="mask">
                  <span>{{item.time}}</span>
                </div>
              </div>
              <div class="name-box one-text">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      
      </div>

       <!-- 日韩漫画 -->
      <div class="home-new">
        <div class="home-new-title">
          <span class="fl">日韩漫画</span>
          <span class="fr" @touchstart="toDetail({name: 'list', params: {url: 'rihan/日韩漫画'}})">更多</span>
        </div>
        <div class="home-new-content">
          <div class="new-box">
            <div class="new-item" v-for="(item,index) in rihanData" :key="index" :data-id="item.url" @touchstart="toDetail({name: 'detail', params: {url: item.url}})">
              <div class="img-box">
                <img class="auto-img" :src="item.cover" alt />
                <div class="mask">
                  <span>{{item.time}}</span>
                </div>
              </div>
              <div class="name-box one-text">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newData: [],
      hotData: [],
      gouchanData:[],
      rihanData:[]
    };
  },

  mounted() {
    //请求新漫画
    this.axios({
      method: "GET",
      url: "http://api.pingcc.cn/?mhlb=new"
    })
      .then(result => {
        this.newData = result.data.list.slice(1, 7);
      })
      .catch(err => {
        console.log("err");
      });

      //请求热门漫画
    this.axios({
      method: "GET",
      url: "http://api.pingcc.cn/?mhlb=hot"
    })
      .then(result => {
        this.hotData = result.data.list.slice(1, 7);
      })
      .catch(err => {
        console.log("err");
      });

        //请求热门漫画
    this.axios({
      method: "GET",
      url: "http://api.pingcc.cn/?mhlb=guochan"
    })
      .then(result => {
        this.gouchanData = result.data.list.slice(1, 7);
      })
      .catch(err => {
        console.log("err");
      });

       //请求热门漫画
    this.axios({
      method: "GET",
      url: "http://api.pingcc.cn/?mhlb=rihan"
    })
      .then(result => {
        console.log(result);
        this.rihanData = result.data.list.slice(1, 7);
        console.log(this.newData);
      })
      .catch(err => {
        console.log("err");
      });
  },

  methods:{
    //点击进入漫画详情
    toDetail(o){
      this.$router.push(o);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height:100%;
  .nav {
    padding: 0 10px;
    height: 44px;
    background-color: #1989fa;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
    color: #fff;
    position: relative;

    .user {
      position: absolute;
      left: 0px;
      display: block;
      width: 25px;
      height: 100%;

      img {
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }

  .content{
    height:calc( 100%  - 44px );
    overflow-y: auto;

    .my-swipe {
    height: 180px;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      // line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
      height: 150px;
    }
  }

  .home-new {
    padding: 0 10px 10px;
    // margin-top: 10px;
    background-color: #fff;
    .home-new-title {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      > span:nth-child(1) {
        color: #070707;
        font-size: 18px;
      }

      > span:nth-child(2) {
        color: #92835a;
        font-size: 14px;
      }
    }
    .home-new-content {
      margin-top: 10px;
      .new-box {
        width: 100%;
        overflow: hidden;
        
        & > div:nth-child(3n) {
          margin-right: 0;
        }
        .new-item {
          width: 31%;
          margin-right: 3.3%;
          float: left;
          margin-bottom: 10px;
          overflow: hidden;
          .img-box {
            width: 100%;
            position: relative;
            height: 150px;
            .mask {
              color: #fff;
              height: 20px;
              width: 100%;
              line-height: 20px;
              position: absolute;
              left: 0;
              bottom: 0px;
              background: rgba(0, 0, 0, 0.5);
              span {
                margin: 0 5px;
              }
            }
          }
          .name-box {
            overflow: hidden;
            width: 100%;
            text-align: center;
            font-size: 14px;
            margin-top: 3px;
          }
        }
      }
    }
  }
  }

  
}
</style>