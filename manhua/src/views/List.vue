<template>
  <div class="list">
    <div class="system-nav"></div>
    <div class="nav clearfix">
      <span class="user" @click="back()">
        <img class="auto-img" src="../assets/icons/back2.png" alt />
      </span>
      <span>{{name}}</span>
    </div>

    <div class="content-box" ref="contentBox" @scroll="lazyLoad()">
      <div class="content">
        <div class="new-item" ref="item" v-for="(item,index) in manhuaData" :key="index" @touchstart="toDetail({name: 'detail', params: {url: item.url}})">
          <div class="img-box">
            <img class="auto-img" :src="item.cover" />
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
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      name: "",
      url: "",
      manhuaData: [],

      num:1,

      isHas: true,
      //存放滚动时产生的定时器
      timers: []
    };
  },

  mounted() {
    //开启加载提示
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    let Params =this.$route.params.url.split("/")
    console.log(this.$route.params)

    this.url =Params[0]

    this.name = Params[1]

    this.axios({
      method: "GET",
      url: "http://api.pingcc.cn/?mhlb=" + this.url
    })
      .then(result => {
        this.$toast.clear();
        console.log("result==>", result);
        this.manhuaData = result.data.list.slice(1, 98);
      })
      .catch(err => {
        this.$toast.clear();
      });
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    //懒加载数据
    lazyLoad() {
      let self = this;

      

      if (!self.isHas) {
        return;
      }

      let timer = setTimeout(function() {
        for (let i = 1; i < self.timers.length; i++) {
          clearTimeout(self.timers[i]);
        }



        //获取底部最后一个元素
        let lastItem =
          self.$refs.item[self.$refs.item.length - 1];

        //获取底部最后一个元素 距离可视区域顶部的距离
        let ItemStyle = lastItem.getBoundingClientRect();
        let top = ItemStyle.top;
        //

        let songItemHeight = ItemStyle.height;

        //

        let isPass = innerHeight  - songItemHeight + 50 >= top;

        console.log(isPass);

        if (self.isHas) {

            self.num +=1

          if (isPass) {
            //开启加载提示
            self.$toast.loading({
              duration: 0,
              message: "加载中..."
            });

            //请求歌
            self
              .axios({
                method: "GET",
                url:
                  "http://api.pingcc.cn/?mhlb=" + self.url + "-" + self.num
              })
              .then(result => {
                self.$toast.clear();
                console.log("result==>", result);

                //再截取歌曲
                let sliceSong = result.data.list.slice(1,99);


                if (sliceSong.length < 98) {
                  self.isHas = false;
                  console.log("没用更多了");
                }

                for (let i = 0; i < sliceSong.length; i++) {
                  self.manhuaData.push(sliceSong[i]);
                }
              })
              .catch(err => {
                console.log("err");
              });
          }
        }

        self.timers = [];
      }, 1000);

      self.timers.push(timer);
    },
    //点击进入漫画详情
    toDetail(o){
      this.$router.push(o);
    }
  }
};
</script>

<style lang="less" scoped>
.list {
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
    margin-top: 10px;

    .content {
      width: 100%;
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
</style>