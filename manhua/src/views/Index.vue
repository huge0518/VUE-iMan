<template>
  <div class="index">
    <div class="system-nav"></div>
    
<!-- 二级路由 -->
    <div class="erji">
      
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- 底部导航 -->
    <van-tabbar class="tab-bar" v-model="tabbarActive">
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :name="item.name"
        :icon="item.icon"
        @click="togglePage({name: item.name})"
      >{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarActive: "home",
      tabbarData: [
        {
          name: "home",
          icon: "home-o",
          title: "首页"
        },
        {
          name: "classify",
          icon: "coupon-o",
          title: "分类"
        },
        {
          name: "search",
          icon: "search",
          title: "搜索"
        },
        {
          name: "mine",
          icon: "manager-o",
          title: "我的"
        }
      ]
    };
  },

  methods: {
    togglePage(o) {
      this.$router.push(o);
    }
  },
};
</script>

<style lang="less" scoped>
.index {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  header {
    position: sticky;
    top: 0;
  }
  .system-nav {
    height: 24px;
    background-color: #1989fa;
  }
  .erji{
     height:calc(100% - 24px - 50px);
  overflow: hidden;
  }

  .child-list {
    font-size: 16px;
    height: 40px;
    background-color: white;
    display: flex;
    padding: 0 15px;
  }

  .child-list > span {
    display: block;
    color: #36d7b6;
    font-weight: 800;
    line-height: 40px;
    margin-left: auto;
    &.active {
      border-bottom: 4px solid #36d7b6;
      box-sizing: border-box;
    }
  }

  .child-list > span:first-child {
    margin-left: 0;
  }
}
</style>