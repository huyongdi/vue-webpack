<template>
  <div class="nav-content">
    <ul class="nav navbar-nav navbar-center">
      <li class="leftNav-img-each home">
        <span class="leftNav-img leftNav-img-home"></span>
        <div class="showDiv homeDiv hide">
          <a class="text-content" href="">首&nbsp;&nbsp;&nbsp;页</a>
        </div>
      </li>

      <!--分析页面开始-->
      <li class="leftNav-img-each analyze-data">
        <span class="leftNav-img leftNav-img-data"></span>
        <div class="showDiv hide">
          <a class="text-content singleA border-rig-d3" target="_blank"
             href="http://grandbox.zhu-ying.win:8888/analyze/sample/datafile.html">数据列表</a>
          <a class="text-content singleA border-bot-d3 border-rig-d3" target="_blank"
             href="http://grandbox.zhu-ying.win:8888/analyze/sample/capture.html">捕获区域</a>
        </div>
      </li>
      <li class="leftNav-img-each">
        <span class="leftNav-img leftNav-img-analyze"></span>
        <div class="showDiv analyze-div hide">
          <ul class="analyze-ul">
            <li class="leftNav-analyze-title">分析流程</li>
            <li v-for="pipelineVue in list.pipeline" class="text-content leftNav-analyze-a"
                :title=pipelineVue.comment>
              <a target="_blank" :href=pipelineVue.href_vue class="leftNav-analyze-link">{{pipelineVue.name}}</a>
            </li>
          </ul>
          <ul class="analyze-ul">
            <li class="leftNav-analyze-title">分析软件</li>
            <li v-for="softwareVue in list.software" class="text-content leftNav-analyze-a"
                :title=softwareVue.comment>
              <a target="_blank" :href=softwareVue.href_vue class="leftNav-analyze-link">{{softwareVue.name}}</a>
            </li>
          </ul>
          <ul class="analyze-ul">
            <li class="leftNav-analyze-title">实用工具</li>
            <li v-for="toolVue in list.tool" class="text-content leftNav-analyze-a" :title=toolVue.comment>
              <a target="_blank" :href=toolVue.href_vue class="leftNav-analyze-link">{{toolVue.name}}</a>
            </li>
          </ul>
        </div>
      </li>
      <li class="leftNav-img-each analyze-job">
        <span class="leftNav-img leftNav-img-task"></span>
        <div class="showDiv hide">
          <a class="text-content singleA border-bot-d3 border-rig-d3" target="_blank"
             href="http://grandbox.zhu-ying.win:8888/analyze/application/job/job.html">任&nbsp;&nbsp;&nbsp;务</a>
        </div>
      </li>
      <!--分析页面结束-->

      <li class="leftNav-img-each analyze-gene">
        <span class="leftNav-img leftNav-img-gene"></span>
        <div class="showDiv hide border-bot-d3 border-rig-d3">
          <a class="text-content" href="#">基&nbsp;&nbsp;&nbsp;因</a>
        </div>
      </li>
      <li class="leftNav-img-each">
        <span class="leftNav-img leftNav-img-panel"></span>
        <div class="showDiv hide border-bot-d3 border-rig-d3">
          <a class="text-content" href="#">产&nbsp;&nbsp;&nbsp;品</a>
        </div>
      </li>
      <li class="leftNav-img-each hpo">
        <span class="leftNav-img leftNav-img-hpo"></span>
        <div class="showDiv   hide">
          <a class="text-content singleA border-rig-d3" href="#">表型分析</a>
          <a class="text-content border-bot-d3 border-rig-d3 singleA" target="_blank" href="http://chinahpo.org" style="border-top: none">中文HPO</a>
        </div>
      </li>
      <li class="leftNav-img-each analyze-mutate">
        <span class="leftNav-img leftNav-img-mutate"></span>
        <div class="showDiv border-rig-d3 border-bot-d3 hide">
          <a class="text-content" href="#">变&nbsp;&nbsp;&nbsp;异</a>
        </div>
      </li>

    </ul>
  </div>
</template>
<script>
  import api from '../../../config/config'
  export default {
    data: function () {
      return {
        list: {
          pipeline: [],
          software: [],
          tool: []
        }
      }
    },
    beforeCreate: function () {
      const _vue = this;
      this.$axios({
        headers: {'X-USERNAME': this.uname, 'X-PASSWORD': this.password},
        method: "get",
        url: api.analyzeUrl + 'application/app/',
      }).then(function (resp) {
        $.each(resp.data.results, function (i, data) {
          if (data.code === 'grandmgd') {
            data.href_vue = 'http://grandbox.zhu-ying.win:8888/analyze/application/grandmgd/singleGene-test.html'
          } else if (data.code === 'grandmito') {
            data.href_vue = 'http://grandbox.zhu-ying.win:8888/analyze/application/grandmito/grandmito-list.html'
          } else {
            data.href_vue = 'javascript:void(0)'
          }
          if (data.category === 'pipeline') {
            _vue.list.pipeline.push(data);
          } else if (data.category === 'software') {
            _vue.list.software.push(data);
          } else if (data.category === 'tool') {
            _vue.list.tool.push(data);
          }
        });

      });
    }
  }
</script>

<style scoped>
  .nav a, .nav a:link, .nav a:visited, .nav a:hover, .nav a:active {
    text-decoration: none;
    color: inherit;
  }

  .nav-content {
    width: 56px;
    height: 100%;
    margin-top: -60px;
    position: absolute;
    background-color: #258dc1;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .nav {
    width: 100%;
  }

  .leftNav-img-each {
    display: block;
    padding: 8px 0;
    background-color: #1a8ec0;
    cursor: pointer;
    float: none;
    border-top: 1px solid #4fb1e3;
    border-bottom: 1px solid #116c98;
  }

  .nav .leftNav-img {
    width: 32px;
    height: 32px;
    display: inline-block;
    position: relative;
  }

  .showDiv {
    position: absolute;
    top: 0;
    left: 56px;
    height: 54px;
    width: 130px;
    line-height: 54px;
    background-color: #fff;
    border-top: 1px solid #d3d3d3;
  }

  .analyze-div {
    width: 460px;
    height: 130px;
    border-bottom: 1px solid #d3d3d3;
    border-right: 1px solid #d3d3d3;
  }

  .text-content:hover {
    font-size: 16px;
  }

  .homeDiv {
    background-color: #00a1e9;
    color: #fff;
  }

  .singleA {
    display: block;
  }

  .border-rig-d3 {
    border-right: 1px solid #d3d3d3;
  }

  .border-bot-d3 {
    border-bottom: 1px solid #d3d3d3;
  }

  .leftNav-img-home {
    background-size: 30px 29px;
    background: url(../../img/baseLeft_home.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-home {
    background: url(../../img/baseLeft_home.png) no-repeat center;
  }

  .leftNav-img-data {
    background-size: 32px 32px;
    background: url(../../img/baseLeft-database-white.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-data {
    background: url(../../img/baseLeft-database-blue.png) no-repeat center;
  }

  .leftNav-img-task {
    background-size: 32px 32px;
    background: url(../../img/aside-task-white.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-task {
    background: url(../../img/aside-task-blue.png) no-repeat center;
  }

  .leftNav-img-analyze {
    background-size: 28px 30px;
    background: url(../../img/baseLeft-analyze-white.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-analyze {
    background: url(../../img/baseLeft-analyze-blue.png) no-repeat center;
  }

  .leftNav-img-gene{
    background-size: 32px 32px;
    background: url(../../img/gene-white.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-gene {
    background: url(../../img/gene-blue.png) no-repeat center;
  }

  .leftNav-img-panel{
    background-size: 32px 32px;
    background: url(../../img/panel-white.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-panel {
    background: url(../../img/panel-blue.png) no-repeat center;
  }

  .leftNav-img-hpo{
    background-size: 32px 32px;
    background: url(../../img/hpo-white.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-hpo {
    background: url(../../img/hpo-blue.png) no-repeat center;
  }

  .leftNav-img-mutate{
    background-size: 32px 32px;
    background: url(../../img/mutate-white.png) no-repeat center;
  }

  .leftNav-img-each:hover > .leftNav-img-mutate {
    background: url(../../img/mutate-blue.png) no-repeat center;
  }

  .leftNav-img-each:hover {
    background-color: #fff;
  }

  .leftNav-img-each.home:hover {
    background-color: #00a1e9;
  }

  .leftNav-img-each:hover > .showDiv {
    display: block !important;
  }

  .nav .home {
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    margin-bottom: 15px;
  }

  .analyze-data,.analyze-gene {
    border-top: 1px solid #fff;
  }

  .analyze-mutate{
    border-bottom: 1px solid #fff;
  }

  .analyze-job {
    border-bottom: 1px solid #fff;
    margin-bottom: 15px;
  }

  .analyze-ul {
    float: left;
    margin-left: -20px;
    text-align: left;
    width: 170px;
  }

  .leftNav-analyze-title {
    line-height: 35px;
    font-weight: 700;
    font-size: 16px;
  }

  .leftNav-analyze-a {
    line-height: 25px;
  }

</style>
