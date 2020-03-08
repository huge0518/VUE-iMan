<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
//定义全局样式
#app {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}
body{
  background-color: #f5f5f5;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix::after{
  display: block;
  content: '';
  clear: both;
}
.auto-img{
  width: 100%;
  display: block;
}
.one-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
p{
  margin: 0;
}
</style>
