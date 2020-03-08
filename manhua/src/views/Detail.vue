<template>
  <div class="detail">
    <div class="system-nav"></div>
    <div class="nav clearfix">
      <span class="user" @click="back()">
        <img class="auto-img" src="../assets/icons/back2.png" alt />
      </span>
      <span>{{name}}</span>
    </div>

    <!-- 内容 -->

    <div
      class="content"
      :style="{'background-image': 'linear-gradient(to bottom, rgba(245,245,245, 0), rgba(245,245,245, .85) 50%, rgba(245,245,245, 1) 60%),url(' + cover + ')'}"
    >
      <div class="content-inner">
        <div class="msg-box clearfix">
          <div class="img-text">
            <div class="img-box fl">
              <img class="auto-img" :src="manhuaData.cover" alt />
            </div>
            <div class="text-box fr">
              <div class="title one-text">
                <span>{{manhuaData.name}}</span>
              </div>
              <div class="tag">
                <span>类型：{{manhuaData.tag}}</span>
              </div>
              <div class="author">
                <span>作者：{{manhuaData.author}}</span>
              </div>
              <div class="time">
                <span>更新：{{manhuaData.time}}</span>
              </div>
            </div>
          </div>

          <div class="dec-box">
            <div class="dec-title">漫画概述</div>
            <div class="dec">
              <span>{{manhuaData.introduce}}</span>
            </div>
          </div>
        </div>

        <!-- 目录 -->
        <div class="mu-box">
          <div class="mu-title">章节目录</div>
          <div class="mu">
              <div class="mu-item" v-for="(item, index) in muData" :key="index" @touchstart="toManhua({name: 'manhua', params: {url: item.url,name: name}})">
                  <span>{{item.num}}</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      manhuaData: "",
      cover: "",
      muData:"",
      name:""
    };
  },

  created() {
    //开启加载提示
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    let url = this.$route.params.url;

    this.axios({
      method: "GET",
      url: "http://api.pingcc.cn/?mhurl1=" + url
    })
      .then(result => {
        this.$toast.clear();
        console.log("result==>", result);

        this.manhuaData = result.data.data;
        this.cover = result.data.data.cover;
        this.muData = result.data.list
        this.name = result.data.data.name
      })
      .catch(err => {
        this.$toast.clear();
      });
  },

  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },

    //点击进入漫画详情
    toManhua(o){
      this.$router.push(o);
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  height: 100%;
  .system-nav {
    height: 24px;
    background-color: #1989fa;
  }
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

  .content {
    width: 100%;
    height: calc(100% - 68px);
    overflow-y: auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .content-inner {
      padding: 10px;
      .msg-box {
        width: 100%;
        background-color: #fff;
        margin-top: 70px;
        border-radius: 10px;
        position: relative;
        .img-text {
          overflow: hidden;
          height: 130px;
          .img-box {
            border-radius: 10px;
            overflow: hidden;
            position: absolute;
            top: -20px;
            left: 10px;
            width: 30%;
          }
          .text-box {
            width: 63%;
            padding: 5px;
            .title {
              width: 70%;
              font-size: 16px;
              margin: 5px 0;
            }
            .tag {
              margin: 5px 0;
            }
            .author {
              margin: 5px 0;
            }
            .time {
              margin: 5px 0;
            }
          }
        }
        .dec-box {
          padding: 10px;
          .dec-title {
            font-size: 16px;
            margin-bottom: 6px;
          }
        }
      }
      .mu-box {
        background-color: #fff;
        margin-top: 10px;
        border-radius: 10px;
        padding: 10px;
        .mu-title{
            font-size: 16px;
        }
        .mu{
            .mu-item{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #eee;
            }
        }
      }
    }
  }
}
</style>