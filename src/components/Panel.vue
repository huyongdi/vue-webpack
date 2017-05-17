<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="panel-small" currentPage="Panel"></location>
    <!--panel列表-->
    <div class="detailShow" id="panelList">
      <search :inputValue='inputValue' @onEnter="onEnter"></search>
      <div class="allPanel">
        <ul class="nav panelList" id="allPanel">
          <li v-if="panel.subpanels.length != 1" :data-panelcode="panel.code" class="panelOne"
              v-for="(panel,index) in panels" @click="subPanelShow">
            <a class="panelTitle" role="button" @click.prevent="">
              <span class="arrows arrowsUp"></span>
              <span class="panelShow" :data-panel="panel.code">{{panel.name_cn}}</span>
            </a>
            <ul class="subPanelContent hide hideUl" :data-panelcode="panel.code">
              <li class="subPanel" v-for="subPanel in panel.subpanels" @click.prevent="showRight"
                  :data-subpanelcode=subPanel.code>
                {{subPanel.name_cn}}
              </li>
            </ul>
          </li>
          <li v-else @click="showRight" class="panelOne" :data-subpanelcode=panel.subpanels[0].code>
            <a class="panelTitle" role="button" @click.prevent="">
              <span class="arrows arrowsUp"></span>
              <span class="panelShow" :data-panel="panel.code">{{panel.name_cn}}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="geneDetail" id="panel_t">
        <table class="table table-striped myTable table-gene">
          <thead>
          <tr>
            <th>系统</th>
            <th>panel</th>
            <th>疾病</th>
            <th>疾病亚型</th>
            <th>基因NCBI ID</th>
            <th>基因symbol</th>
            <th>遗传方式</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="single in list_subPanel">
            <td>{{single.subpanel.panel.code}} - {{single.subpanel.panel.name_cn}}</td>
            <td>{{single.subpanel.code}} - {{single.subpanel.name_cn}}</td>
            <td>
              <span>{{single.disease.parent}}</span>
            </td>
            <td>
              <span>
                 <a href="#" data-toggle="tooltip" data-placement="top" class="a-color" @click.prevent=""
                    data-original-title="single.disease.name_en">
                 {{single.disease.name_cn}}
                 </a>
               </span>
            </td>
            <td>
              <div v-for="gene in single.genes">{{gene.geneId}}</div>
            </td>
            <td>
              <div v-for="gene in single.genes">
                <router-link class="po" target="_blank" :to="{ path: '/gene', query: { query: gene.geneId}}"
                             data-toggle="tooltip" data-placement="top" :data-geneId="gene.geneId"
                             :data-original-title="gene.synonyms.join('|')">{{gene.symbol}}
                </router-link>
              </div>
            </td>
            <td>
                 <span>
                       <span v-for="(inheritanceOne,index) in single.disease.inheritance">
                           <span v-if="index !==single.disease.inheritance.length-1">{{inheritanceOne}},</span>
                           <span v-else>{{inheritanceOne}}</span>
                       </span>
                 </span>
            </td>
          </tr>
          </tbody>
        </table>

      </div>

      <pagenation :count="count" :reset="reset" @getCurrent="getCurrent"></pagenation>

    </div>
  </div>
</template>

<script>
  import topLocation from './global/location'
  import search from './global/search.vue'
  import pagenation from './global/pagenation'

  export default {
    components: {
      'location': topLocation,
      'search': search,
      'pagenation':pagenation
    },
    name: 'panel',
    data: function () {
      return {
        subpanelDisease: '',
        subPanelUrl: '',
        panels: '',
        list_subPanel: [],
        loading: true,
        subPanelCode: 0,
        inputValue: this.$route.query.sp ? this.$route.query.sp : '',
        isFirst: 0,

        count:1,
        current: 1,
        reset: 1,
      }
    },
    updated: function () {
      const _vue = this;
      $('[data-toggle="tooltip"]').tooltip();
      if (this.isFirst) { //只有第一次更新视图的时候（左边更新影响的）需要这样请求列表
        /*如果从基因页面跳转过来的*/
        if (this.$route.query.sp) {
          const pCodeParam = this.$route.query.p;
          const spCodeParam = this.$route.query.sp;
          $(".panelOne").each(function () {
            const pCode = $(this).data("panelcode");
            if (pCode === pCodeParam) {
              $(this).find('.arrows').removeClass('arrowsUp').addClass('arrowsDown');
              $(this).find('.hideUl').removeClass('hide')
            }
            $(this).find('.subPanel').each(function () {
              const spCode = $(this).data('subpanelcode');
              if (spCode === spCodeParam) {
                $(this).addClass('onSubPanel');
                _vue.subPanelCode = spCodeParam;
                _vue.$axios({
                  url: _vue.subpanelDisease + '?subpanel=' + spCodeParam
                }).then(function (resp) {
                  _vue.count = resp.data.count;
                  _vue.list_subPanel = resp.data.results;
                  _vue.loading = false;
                  _vue.isFirst = 0;
                });
              }
            })
          });
          return;
        }
        const $first = $("#allPanel").find(".panelOne").first().find('.hideUl').find('.subPanel').first();
        const firstSubpanelCode = $first.data("subpanelcode");
        $first.addClass('onSubPanel');
        this.subPanelCode = firstSubpanelCode;
        this.$axios({
          url: this.subpanelDisease + '?subpanel=' + firstSubpanelCode
        }).then(function (resp) {
          _vue.count = resp.data.count;
          _vue.list_subPanel = resp.data.results;
          _vue.loading = false;
          _vue.isFirst = 0;
        });
      }
    },
    created: function () {
      const _vue = this;
      this.$axios({
        method: 'get',
        url: 'product/'
      }).then(function (resp) {
        _vue.subpanelDisease = resp.data.subpaneldisease;
        _vue.$axios({
          method: 'get',
          url: resp.data.panel
        }).then(function (resp_panel) {
          _vue.panels = resp_panel.data.results;
          _vue.isFirst = 1;
        })
      })
    },
    methods: {
      getCurrent:function (data) {
        this.current = data;
        this.$route.query.page=data;
        this.reset = 0;
        this.getSubpanelList()
      },
      subPanelShow: function (event) {
        const $hide = $(event.target).closest('li').find('.hideUl');
        const $img = $(event.target).closest('li').find('.arrows');
        if ($hide.hasClass('hide')) {
          $hide.removeClass('hide');
          $img.removeClass('arrowsUp').addClass('arrowsDown')
        } else {
          $hide.addClass('hide');
          $img.removeClass('arrowsDown').addClass('arrowsUp')
        }
      },
      showRight: function (event) {
        this.inputValue = '';
        this.subPanelCode = $(event.target).closest('li').data('subpanelcode');
        $('.onSubPanel').removeClass('onSubPanel');
        $(event.target).closest('li').addClass('onSubPanel');
        this.$route.query.page = 1;
        this.current = 1;
        this.reset = 1;
        this.getSubpanelList();
      },
      getSubpanelList: function () {
        const _vue = this;
        this.list_subPanel = [];
        this.loading = true;
        this.subPanelUrl = this.inputValue ? this.subpanelDisease + '?query=' + decodeURI(this.inputValue) :
          this.subpanelDisease + '?subpanel=' + this.subPanelCode,
          this.subPanelUrl = this.$route.query.page ? this.subPanelUrl + '&page=' + this.$route.query.page : this.subPanelUrl;
        this.$axios({
          url: this.subPanelUrl,
          method: 'get'
        }).then(function (resp) {
          _vue.count =resp.data.count;
          _vue.list_subPanel = resp.data.results;
          _vue.loading = false;
        });
      },
      onEnter: function (data) {
        this.inputValue = data;
        this.$route.query.page = 1;
        this.current = 1;
        this.reset = 1;
        $(".onSubPanel").removeClass('onSubPanel');
        this.getSubpanelList();
      }
    },
  }
</script>

<style scoped>

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
