<!--suppress ALL -->
<template>
  <div id="app">
    <nav-header></nav-header>
    <nav-footer></nav-footer>
    <router-view></router-view>
  </div>
</template>
<script>
  import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
  import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

  import API from '../config/config'
  import header from './components/global/header'
  import footer from './components/global/footer'
  export default {
    components: {
      'nav-header': header,
      'nav-footer': footer
    },
  }
</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #app{
    height: 100%;
  }
  .f16{
    font-size: 16px;
    font-family: "Microsoft YaHei", serif;
  }
  ul li{
    list-style: none;
  }
  .right-content{
    width: 100%;
    padding-left: 56px;
  }
</style>
