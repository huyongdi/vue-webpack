<template>
  <div class="right-content">
    <div class="base-section">
      <span class="base-section-title">构建安全、稳定的基因大数据分析管理系统</span>
    </div>
    <div class="middle-content">
      <div class="container">
        <div class="row">
          <div class=" col-xs-4 col-sm-4 col-md-4">
            <a href="#" class="homeContent-li">
              <span class="middle-content-img middle-content-img-manage"></span>
              <h4><strong>管理系统</strong></h4>
              <span class="middle-content-detail">提供方便且高效的数据管理方法，个性化的实时样本管理，</span>
              <span class="middle-content-detail">简化日常工作流程，更加有效地管理和捕获数据并改进沟通。</span>
              <span class="middle-content-detail">根据最新信息制定决策</span>
            </a>
          </div>
          <div class=" col-xs-4 col-sm-4 col-md-4">
            <a href="#" class="homeContent-li">
              <span class="middle-content-img middle-content-img-data"></span>
              <h4><strong>数&nbsp;据</strong></h4>
              <span class="middle-content-detail">上传和管理临床、样本、数据信息，</span>
              <span class="middle-content-detail">能够可靠管理数据、资源和工作流程，</span>
              <span class="middle-content-detail">极大减少工作成本。</span>
            </a>
          </div>
          <div class=" col-xs-4 col-sm-4 col-md-4">
            <a href="#" class="homeContent-li">
              <span class="middle-content-img middle-content-img-report"></span>
              <h4><strong>报&nbsp;告</strong></h4>
              <span class="middle-content-detail">查看检测分析报告，</span>
              <span class="middle-content-detail">快速调取检测报告，一键导出。</span>
            </a>
          </div>

          <div class=" col-xs-4 col-sm-4 col-md-4">
            <a href="#" class="homeContent-li">
              <span class="middle-content-img middle-content-img-analyze"></span>
              <h4><strong>分&nbsp;析</strong></h4>
              <span class="middle-content-detail">可视化分析测序数据，</span>
              <span class="middle-content-detail">同步分析流程，监控分析数据，提高检测验证、</span>
              <span class="middle-content-detail">样本生物分析和结果报告的效率。</span>
            </a>
          </div>
          <div class=" col-xs-4 col-sm-4 col-md-4">
            <a href="#" class="homeContent-li">
              <span class="middle-content-img middle-content-img-task"></span>
              <h4><strong>任&nbsp;务</strong></h4>
              <span class="middle-content-detail">管理和监控分析任务，实时准确的跟踪分析结果，</span>
              <span class="middle-content-detail">有效地提高工作效率，实现精细化管理。</span>
            </a>
          </div>
          <div class=" col-xs-4 col-sm-4 col-md-4">
            <a href="#" class="homeContent-li">
              <span class="middle-content-img middle-content-img-analyze"></span>
              <h4><strong>数&nbsp;据&nbsp;库</strong></h4>
              <span class="middle-content-detail">管理和监控分析任务，实时准确的跟踪分析结果，</span>
              <span class="middle-content-detail">有效地提高工作效率，实现精细化管理。</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .middle-content {
    margin-left: 55px;
  }

  .homeContent-li {
    height: 210px;
    display: block;
    padding: 4px;
    line-height: 1.42857143;
    text-align: center;
    margin: 80px 0 30px 0;
    border: 1px solid transparent;
    -webkit-transition: border .2s ease-in-out;
    -o-transition: border .2s ease-in-out;
    transition: border .2s ease-in-out;
  }

  .homeContent-li:hover {
    border: 3px solid #fff;
  }

  .middle-content-img {
    width: 140px;
    height: 100px;
    display: inline-block;
  }

  .middle-content a,
  .middle-content a:link,
  .middle-content a:visited,
  .middle-content a:hover,
  .middle-content a:active {
    text-decoration: none;
  }

  .leftNav a {
    color: inherit;
  }

  .middle-content h4 {
    display: block;
    margin-top: 20px;
    color: #626262;
  }

  .middle-content-detail {
    font-size: 12px;
    display: block;
    word-break: keep-all;
    white-space: nowrap;
    color: #7d7d7d;
  }

  .middle-content-img-manage {
    background-size: 129px 81px;
    background: url(../img/home-manage.png) no-repeat center;
  }

  .middle-content-img-data {
    background-size: 69px 71px;
    background: url(../img/home-data.png) no-repeat center;
  }

  .middle-content-img-report {
    background-size: 75px 94px;
    background: url(../img/home-report.png) no-repeat center;
  }

  .middle-content-img-analyze {
    background-size: 129px 85px;
    background: url(../img/home-analyze.png) no-repeat center;
  }

  .middle-content-img-task {
    background-size: 87px 98px;
    background: url(../img/home-task.png) no-repeat center;
  }

  .base-section {
    height: 160px;
    line-height: 160px;
    background: #1d6c93 url(../img/baseRight_bc.png) no-repeat right;
  }

  .base-section-title {
    color: #fff;
    font-size: 18px;
    font-family: "HYQiHei", serif;
    display: inline-block;
    margin-left: 300px;
  }

</style>
