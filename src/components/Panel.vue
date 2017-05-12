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

      <div class="allPanel" id="allPanel">
        <ul class="nav panelList">
          <li class="panelOne" v-for="(panel,index) in panels" @click="getSubPanel(index)">
            <a class="panelTitle" role="button" href="javascript:void(0)">
              <span class="arrows arrowsUp"></span>
              <span class="panelShow" :data-panel="panel.code">{{panel.name_cn}}</span>
            </a>
            <ul class="subPanelContent none" :id="'panel_'+index" :data-panelcode="panel.code">
              <li class="subPanel" v-for="subPanel in panel.SubPanel" :data-link="subPanel"
                  @click.stop='clickLi'></li>
            </ul>
          </li>
        </ul>

        <div class="geneDetail">
          <table class="table table-striped myTable table-gene">
            <thead>
            <tr>
              <th>系统</th>
              <th>panel</th>
              <th>疾病</th>
              <th>疾病亚型</th>
              <th>基因NCBI ID</th>
              <th>基因symbol</th>
              <!--<th class="geneAlias">基因别名</th>-->
              <th>遗传方式</th>
            </tr>
            </thead>
            <tbody id="panel_t">
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
                  <a target="_blank" :href="'../knowledge/gene.html?query='+gene.geneId" data-toggle="tooltip"
                     data-placement="top" title="" v-bind:data-geneId="gene.geneId"
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
          <div class="spinner" v-if="loading">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
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
  export default {
    name: 'panel',
    data: function () {
      return {
        panels: '',
        listSystem: '',
        listPanel: '',
        list_subPanel: [],
        loading: true
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    created: function () {
      const _vue = this;
      this.$axios({
        method: 'get',
        url: 'product/'
      }).then(function (resp) {
        _vue.$axios({
          method: 'get',
          url: resp.data.panel
        }).then(function (resp_panel) {
          _vue.fillList_parent(resp_panel)
        })
      })
    },
    methods: {
      fillList_parent: function (resp_panel) {
        const _vue = this;
        _vue.panels = resp_panel.data.results;
        const subPanelUrl = resp_panel.data.results[0].SubPanel[0];
        let subPanelName = '';
        //由于要初始化列表里面panel的值，那么需要知道第一个panel里面subPanel的信息
        _vue.$axios({
          method: 'get',
          url: subPanelUrl
        }).then(function (resp_subPanel) {
          subPanelName = resp_subPanel.data.name_cn;
          const $content = $("#allPanel");
          const $panel_show = $content.find("li").first().find(".panelShow");
          const $subPanel_show = $content.find("li").first().find(".subPanelContent").find("li").first();
          $subPanel_show.addClass('onSubPanel');

          _vue.listSystem = $content.find("li").first().find(".panelShow").data("panel") + '-' + $panel_show.html();
          _vue.listPanel = resp_subPanel.data.code + '-' + subPanelName;

          _vue.fillList_child(resp_subPanel)

        });
      },
      fillList_child: function (resp_subPanel, sublist_url) {
        const _vue = this;
        _vue.$axios({
          method: 'get',
          url: sublist_url ? sublist_url : 'product/subpaneldisease/?subpanel=' + resp_subPanel.data.code
        }).then(function (resp_subPanelList) {
          let subPanelLIst = resp_subPanelList.data.results;
          $.each(subPanelLIst, function (i, value) { //确保申明变量，才能实现双向绑定
            value.diseaseData = [];
          });
          $.each(subPanelLIst, function (n, data) {
            $.each(data.genes, function (a, b) {
              b.synonymsTitle = b.synonyms.join(' | ')
            })
          });
          _vue.list_subPanel = subPanelLIst;
          $.each(_vue.list_subPanel, function (i, value) {
            _vue.$axios({
              url: value.disease,
              method: 'get',
            }).then(function (resp_disease) {
              value.diseaseData = resp_disease.data
            })
          });
          _vue.loading = false;
        });
      },
      onEnter: function () {
      },
      getSubPanel: function (index) {
        const _vue = this;
        const $hide = $("#panel_" + index);
        $hide.slideToggle('fast', function () {
          if ($hide.css("display") === "block") { //暂开的时候
            $hide.parent().find("a").find('.arrows').removeClass('arrowsUp').addClass('arrowsDown');
            $hide.find("li").each(function () {
              const $this = $(this);
              _vue.$axios({
                method: 'get',
                url: $(this).data("link")
              }).then(function (respSubPanel) {
                $this.html(respSubPanel.data.name_cn);
              });
            })
          } else {
            $hide.parent().find("a").find('.arrows').removeClass('arrowsDown').addClass('arrowsUp');
          }
        });
      },
      clickLi: function (event) {
        $(".onSubPanel").removeClass('onSubPanel');
        $(event.target).addClass('onSubPanel');
        const url = $(event.target).data("link");
        const index = url.indexOf("subpanel/");
        const subPanelGene = url.substring(index + 9, url.length - 1);
        const sublist_url = 'product/subpaneldisease/?subpanel=' + subPanelGene;
        const $panel_show = $(event.target).parent().parent().find('.panelShow');
        this.listSystem = $panel_show.data("panel") + '-' + $panel_show.html();
        this.listPanel = subPanelGene + '-' + $(event.target).html();
        this.fillList_child('', sublist_url)
      }
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

  .pagination {
    margin-left: 7%;
  }

  .panelList li {
    list-style: none;
  }

  .panelList .panelTitle {
    background-color: #eee;
  }

  .panelList .panelTitle:hover {
    background-color: #f0f4f7;
  }

  .panelList .subPanel {
    cursor: pointer;
    padding: 2px 0;
  }

  .panelList .subPanel:hover {
    color: #258dc1;
  }

  .onSubPanel {
    color: #258dc1;
  }

  .arrows {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-bottom: -3px;
    margin-right: 5px;
  }

  .arrowsDown {
    background: url(../img/arrow-down.png);
    background-size: 16px 16px;
  }

  .arrowsUp {
    background: url(../img/arrow-up.png);
    background-size: 16px 16px;
  }

  .geneAlias {
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
