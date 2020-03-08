<template>
  <div class="classify">
     <div class="nav clearfix">
      <span>漫画分类</span>
    </div>
    <div class="classify-box">
      <div class="item" v-for="(item, index) in classifyData" :key="index" @touchstart="toDetail({name: 'list', params: {url: item.url}})">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:"classify",
data(){
  return{
    classifyData:[
      {
        name:"少年热血",
        url:"shaonianrexue/少年热血"
      },
      {
        name:"武侠格斗",
        url:"wuxiagedou/武侠格斗"
      },
      {
        name:"恐怖灵异",
        url:"kongbulingyi/恐怖灵异"
      },
      {
        name:"耽美人生",
        url:"danmeirensheng/耽美人生"
      },
      {
        name:"少女爱情",
        url:"shaonvaiqing/少女爱情"
      },
      {
        name:"恋爱生活",
        url:"lianaishenghuo/恋爱生活"
      },
      {
        name:"生活漫画",
        url:"shenghuomanhua/生活漫画"
      },
      {
        name:"科幻魔幻",
        url:"kehuanmohuan/科幻魔幻"
      },
      {
        name:"竞技体育",
        url:"jingjitiyu/竞技体育"
      },
      {
        name:"爆笑喜剧",
        url:"baoxiaoxiju/爆笑喜剧"
      },
      {
        name:"侦探推理",
        url:"zhentantuili/侦探推理"
      },
    ]
  }
},
methods:{
  //点击进入漫画详情
    toDetail(o){
      this.$router.push(o);
    }
}
}
</script>

<style lang="less" scoped>
 .nav {
    padding: 0 10px;
    height: 44px;
    background-color: #1989fa;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
    color: #fff;

   
  }

  .classify-box{
    width: 100%;
    overflow: hidden;
    margin-top: 10px;
    .item{
      float: left;
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 33.3%;
      border: 1px solid #eee;
      box-sizing: border-box;

    }
  }
</style>