<template>
  <div class="manhua">
    <div class="system-nav"></div>
    <div class="nav clearfix">
      <span class="user" @click="back()">
        <img class="auto-img" src="../assets/icons/back2.png" alt />
      </span>
      <span>{{name}}</span>
    </div>

    <div class="content-box" ref="contentBox">
      <div class="content">
        <div class="item" v-for="(item, index) in nanhuaData" :key="index">
          <img class="auto-img" :src="item.img" alt />
        </div>
      </div>
    </div>
    <div class="zhuanzhang">
      <div class="prev" @click="prev()">上一章</div>
      <div class="next" @click="next()">下一章</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manhua",
  data() {
    return {
      url: "",
      name: "",
      nanhuaData: [],

      num: ""
    };
  },

  created() {
    //开启加载提示
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    this.url = this.$route.params.url;
    console.log("this.url", this.url);

    this.name = this.$route.params.name;

    this.num = parseInt(this.url.split("/").splice(-1));

    this.axios({
      method: "GET",
      url: "http://api.pingcc.cn/?mhurl2=" + this.url
    })
      .then(result => {
        this.$toast.clear();
        console.log("result==>", result);
        this.nanhuaData = result.data.list;
      })
      .catch(err => {
        this.$toast.clear();
      });
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    next() {
      let self = this;
      this.num += 1;
      let length = this.url.split("/").length;
      let newUrlArr = this.url.split("/").slice(0, length - 1);

      let newUrl = newUrlArr.join("/") + "/" + this.num + ".html";

      console.log(newUrl);
      //开启加载提示
      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        method: "GET",
        url: "http://api.pingcc.cn/?mhurl2=" + newUrl
      })
        .then(result => {
          this.$toast.clear();
          self.$refs.contentBox.scrollTo(0, 0);

          console.log("result==>", result);
          this.nanhuaData = result.data.list;
        })
        .catch(err => {
          this.$toast.clear();
        });
    },
    prev() {
      let self = this;
      this.num -= 1;
      let length = this.url.split("/").length;
      let newUrlArr = this.url.split("/").slice(0, length - 1);

      let newUrl = newUrlArr.join("/") + "/" + this.num + ".html";

      console.log(newUrl);
      //开启加载提示
      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      this.axios({
        method: "GET",
        url: "http://api.pingcc.cn/?mhurl2=" + newUrl
      })
        .then(result => {
          this.$toast.clear();
          self.$refs.contentBox.scrollTo(0, 0);

          console.log("result==>", result);
          this.nanhuaData = result.data.list;
        })
        .catch(err => {
          this.$toast.clear();
        });
    }
  }
};
</script>

<style lang="less" scoped>
.manhua {
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
  .content-box {
    width: 100%;
    height: calc(100% - 68px);
    overflow-y: auto;

    .content {
      width: 100%;

    }

  }

  .zhuanzhang{
    overflow: hidden;
    width: 100%;
    .prev {
      text-align: center;
      border: 1px solid #000;
      height: 30px;
      line-height: 30px;
      width: 50%;
      box-sizing: border-box;
      float: left;
    }
    .next {
      text-align: center;
      border: 1px solid #000;

      height: 30px;
      line-height: 30px;
      width: 50%;
      box-sizing: border-box;
      float: left;

    }
  }
}
</style>