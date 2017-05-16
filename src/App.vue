<!--suppress ALL -->
<template>
  <div id="app">
    <nav-header v-if="notLogin"></nav-header>
    <nav-footer v-if="notLogin"></nav-footer>
    <router-view></router-view>
  </div>
</template>
<script>

  import header from './components/global/header'
  import footer from './components/global/footer'
  export default {
    name: 'app',
    components: {
      'nav-header': header,
      'nav-footer': footer
    },
    data:function () {
      return{
        notLogin:'',
        inGene:''
      }
    },
    created:function () { //刷新当前页面时候判断需不需要加载头部
      this.notLogin = localStorage.uname
    },
    watch:{
      '$route' (to, from) { //路由变化的时候判断需不需要加载头部
          this.notLogin = localStorage.uname
      }
    }
  }
</script>

<style>
  html {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;
    position: relative;
  }

  .f16 {
    font-size: 16px;
    font-family: "Microsoft YaHei", serif;
  }

  ul li {
    list-style: none;
  }

  .right-content {
    width: 100%;
    padding: 20px 30px 30px 100px;
    background-color: #f5f5f5;
  }

  .navTitle {
    height: 41px;
    line-height: 41px;
  }

  .navTitle-span {
    float: left;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    margin-left: 15px;
  }

  .detailTitle {
    margin-top: 10px;
    background-color: #eeeeee;
    padding: 5px 10px;
    font-family: "Microsoft YaHei", serif;
  }

  .detailShow {
    padding: 20px;
  }

  .myBtn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 13px;
    color: #fff;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: 3px;
  }

  .myTable {
    font-size: 12px;
    border-collapse: separate;
    border: 1px solid #ddd;
  }

  .myTable th {
    background-color: #f0f4f7;
  }

  .myTable.table > thead > tr > th {
    border-bottom: none;
  }

  .po{
    cursor: pointer;
  }

  .font-12{
    font-size: 12px;
  }

  .inline-block{
    display: inline-block;
  }

  .fl{
    float: left;
  }

  .block{
    display: block;
  }

  .none{
    display: none;
  }

  a.a-color,a.a-color:focus,a.a-color:hover{
    color: inherit;
  }

  .font-700{
    font-weight: 700;
  }

  .myRow{
    margin-left: 0;
    margin-right: 0;
  }

  .font-14{
    font-size: 14px;
  }

  /*加载动画*/

  .spinner {
    margin: 50px auto 0;
    width: 150px;
    text-align: center;
  }

  .spinner > div {
    width: 30px;
    height: 30px;
    background-color: #258dc1;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bounceDelay 1.4s infinite ease-in-out;
    animation: bounceDelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes bounceDelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0.0)
    }
    40% {
      -webkit-transform: scale(1.0)
    }
  }

  @keyframes bounceDelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    }
    40% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }

</style>
