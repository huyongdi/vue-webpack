<template>
  <div class="locationShow">
    <div class="navTitle">
      <span :class="imgClass"></span>
      <span class="navTitle-span">{{currentPage}}</span>
    </div>
    <div class="detailTitle">
      <span>您现在的位置：</span>
      <span>数据库</span>&nbsp;>&nbsp;<span id="database-title">{{currentPage}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        props:['imgClass','currentPage']
    }
</script>
<style scoped>
  .gene-small{
    float: left;
    width: 32px;
    height: 32px;
    background: url(../../img/gene-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }
  .panel-small {
    float: left;
    width: 32px;
    height: 32px;
    background: url(../../img/panel-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }
  .phenoType-small {
    float: left;
    width: 32px;
    height: 32px;
    background: url(../../img/hpo-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }
  .mutate-small{
    float: left;
    width: 32px;
    height: 32px;
    background: url(../../img/mutate-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }
</style>
