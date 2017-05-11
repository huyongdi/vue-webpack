<template>
    <div class="right-content">
        <div class="locationShow">
          <div class="navTitle">
            <span class="panel-small"></span>
            <span class="navTitle-span">Panel</span>
          </div>
          <div class="detailTitle">
            <span>您现在的位置：</span>
            <span>数据库</span>&nbsp;>&nbsp;<span id="database-title">panel</span>
          </div>
        </div>
        <!--panel列表-->
        <div class="detailShow" id="panelList">

          <div class="searchBorder" id="search_panel">
            <input type="text" class="form-control input_hasImg" placeholder="" @keyup.enter="onEnter"
                   ref="searchInput" id="searchPanel_input">
            <button class="search-btn myBtn" @click="onEnter"></button>
          </div>

          <div class="allPanel">
            <ul class="nav panelList" id="allPanel">
              <li class="panelOne" v-for="(panel,index) in panels" v-on:click="getSubPanel(index)">
                <a class="panelTitle" role="button" href="#"> <!--v-bind:href="'#'+panel.code"-->
                  <span class="arrows arrowsUp"></span>
                  <span class="panelShow" v-bind:data-panel="panel.code">{{panel.name_cn}}</span>
                </a>
                <ul class="subPanelContent" v-bind:id="'panel_'+index" style="display: none" v-bind:data-panelcode="panel.code">
                  <li class="subPanel" v-for="subPanel in panel.SubPanel" v-bind:data-link="subPanel"></li>
                </ul>
              </li>
            </ul>

        <!--    <div class="geneDetail">
              <table class="table table-striped myTable table-gene">
                <thead>
                <tr>
                  <th>系统</th>
                  <th>panel</th>
                  <th>疾病</th>
                  <th>疾病亚型</th>
                  <th>基因NCBI ID</th>
                  <th>基因symbol</th>
                  &lt;!&ndash;<th class="geneAlias">基因别名</th>&ndash;&gt;
                  <th>遗传方式</th>
                </tr>
                </thead>
                <tbody id="panel_t" class="hide">
                <tr v-for="subPanel in list_subPanel">
                  <td>{{listSystem}}</td>
                  <td>{{listPanel}}</td>
                  <td>
                    <span v-if="subPanel.diseaseData">{{subPanel.diseaseData.parent}}</span>
                  </td>
                  <td>
                                <span v-if="subPanel.diseaseData">
                                <a href="#" data-toggle="tooltip" data-placement="top" title=""
                                   v-bind:data-original-title="subPanel.diseaseData.name_en">
                                    {{subPanel.diseaseData.name_cn}}
                                </a>
                                </span>
                  </td>
                  <td>
                    <div v-for="gene in subPanel.genes">{{gene.geneId}}</div>
                  </td>
                  <td>
                    <div v-for="gene in subPanel.genes">
                      &lt;!&ndash;<a href="../knowledge/gene.html" data-toggle="tooltip" data-placement="top" title="" v-bind:data-geneId="gene.geneId"&ndash;&gt;
                      <a  target="_blank" :href="'../knowledge/gene.html?query='+gene.geneId" data-toggle="tooltip" data-placement="top" title="" v-bind:data-geneId="gene.geneId"
                          v-bind:data-original-title="gene.synonymsTitle">
                        {{gene.symbol}}
                      </a>
                    </div>
                  </td>

                  <td>
                                <span v-if="subPanel.diseaseData">
                                    <span v-for="(inheritanceOne,index) in subPanel.diseaseData.inheritance">
                                        <span v-if="index !==subPanel.diseaseData.inheritance.length-1">{{inheritanceOne}},</span>
                                        <span v-else>{{inheritanceOne}}</span>
                                    </span>
                                </span>
                  </td>
                </tr>
                </tbody>
              </table>

              <div class="spinner" id="loading_panel">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>

            </div>-->
          </div>

      <!--    <div id="app" class="text-center" v-show="!!allPage">
            <nav>
              <ul class="pagination">
                &lt;!&ndash;上一页逻辑&ndash;&gt;
                <li v-if='current == 1' class='disabled'><span class='color-a'>&laquo;上一页</span></li>
                <li v-else @click='current&#45;&#45; && goTo(current&#45;&#45;)'><span class='color-a'>&laquo;上一页</span></li>
                &lt;!&ndash;中间页码&ndash;&gt;
                <li v-for="index in pages" @click="goTo(index)" :class="{'active':current == index}"><span class="color-a">{{index}}</span></li>
                &lt;!&ndash;下一页逻辑&ndash;&gt;
                <li v-if="allPage == current || allPage == 0" class="disabled"><span class="color-a">下一页&raquo;</span></li>
                <li @click="current++ && goTo(current++)" :class="{'disabled':allPage == current || allPage == 0}"><span class="color-a">下一页&raquo;</span></li>
                &lt;!&ndash;跳转逻辑&ndash;&gt;
                <li class=""><span class="color-a toPage">第<input v-model="beforeCurrent" @keyup.enter="goTo()">页/共{{allPage}}页</span></li>
              </ul>
            </nav>
          </div>-->
        </div>
    </div>
</template>

<script>
  import API from '../../config/config'
  export default {
      name:'panel',
      data:function () {
        return{
          panels:''
        }
      },
      created:function () {
        const _vue = this;
        this.$axios({
          headers: {'X-USERNAME': localStorage.uname, 'X-PASSWORD': localStorage.password},
          method:'get',
          url:API.url+'product/'
        }).then(function (resp) {
          _vue.$axios({
            headers: {'X-USERNAME': localStorage.uname, 'X-PASSWORD': localStorage.password},
            method:'get',
            url:resp.data.panel
          }).then(function (resp_panel) {

          })
        })
      }
  }
</script>

<style scoped>
  .panel-small {
    float: left;
    width: 32px;
    height: 32px;
    background: url(../img/panel-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }

  .baseRight .input_hasImg {
    border-right: none;
  }

  .allPanel {
    margin-top: 40px;
  }

  .panelList {
    width: 13%;
    float: left;
    margin-right: 2%;
  }

  .geneDetail {
    width: 85%;
    float: left;
  }

  .pagination{
    margin-left: 7%;
  }

  .panelList li {
    list-style: none;
  }

  .panelList .panelTitle{
    background-color: #eee;
  }

  .panelList .panelTitle:hover {
    background-color: #f0f4f7;
  }

  .panelList .subPanel{
    cursor: pointer;
    padding: 2px 0;
  }

  .panelList .subPanel:hover{
    color: #258dc1;
  }
  .onSubPanel{
    color: #258dc1;
  }

  .arrows{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-bottom: -3px;
    margin-right: 5px;
  }
  .arrowsDown{
    background: url(../img/arrow-down.png);
    background-size: 16px 16px;
  }

  .arrowsUp{
    background: url(../img/arrow-up.png);
    background-size: 16px 16px;
  }

  .geneAlias{
    width: 25%;
  }

  .table-gene.table > tbody > tr > td,
  .table-gene.table > tbody > tr > th,
  .table-gene.table > tfoot > tr > td,
  .table-gene.table > tfoot > tr > th,
  .table-gene.table > thead > tr > td,
  .table-gene.table > thead > tr > th {
    vertical-align: middle;
  }

  .table-task th {
    background-color: #f0f4f7;
  }

  .table-task.table > thead > tr > th {
    border-bottom: none;
  }

  .search-btn {
    display: inline-block;
    width: 36px;
    height: 36px;
    background: url("../img/data-sreach-bc.png") no-repeat center;
    background-size: 36px 36px;
    margin: 0 0 4px 8px;
  }

  .searchBorder {
    border: 1px solid #dedfe0;
    width: 460px;
    height: 45px;
  }

  .detailShow .input_hasImg {
    display: inline-block;
    width: 400px;
    border: none;
    height: 43px;
    outline: none;
    box-shadow: none;
  }

  .pagination li span.toPage {
    padding: 4px;
  }

  .pagination li span.toPage input {
    width: 35px;
    text-align: center;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
