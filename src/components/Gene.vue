<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="gene-small" currentPage="基因"></location>
    <!--基因列表-->
    <div class="detailShow" id="geneList">
      <search :inputValue='inputValue' @onEnter="onEnter"></search>

      <table class="table table-striped myTable">
        <thead>
        <tr>
          <th style="min-width: 60px">基因ID</th>
          <th style="">基因名</th>
          <th style="">别名</th>
          <th style="">常用转录本</th>
          <th style="min-width: 130px">mimNumber(基因)</th>
          <th style="">Panel</th>
          <th style="">疾病</th>
          <th style="">5X平均覆盖度%</th>
        </tr>
        </thead>
        <tbody id="gene_t">
        <tr v-for="(row , rowIndex) in list_gene" :key="row.geneId">
          <td>
            <!--<a class="color-a" :href="'../knowledge/geneDetail.html?&geneId='+row.geneId" target="_blank" title="查看详情">{{row.geneId}}</a>-->
            <router-link class="po" target="_blank" :to="{ path: '/geneDetail', query: { geneId: row.geneId}}">{{row.geneId}}
            </router-link>
          </td>
          <td>{{row.symbol}}</td>
          <td>{{row.synonymsStr}}</td>
          <td>{{row.tags.transcript}}</td>
          <td><span v-show='!!row.dbXrefs.MIM' class="text-danger">*</span>{{row.dbXrefs.MIM}}</td>
          <td>
            <router-link v-if="row.panels.length != 0" v-for="panelItem in row.panels" :key="panelItem.panel.name_cn"
                         class="block" target="_blank"
                         :to="{path:'/panel',query:{p:panelItem.panel.code,sp:panelItem.subpanel.code}}">
              {{panelItem.subpanel.code}}-{{panelItem.subpanel.name_cn}}({{panelItem.panel.code}}-{{panelItem.panel.name_cn}})
            </router-link>
          </td>
          <td>
            <div v-for="diseaseSingle in row.phenotypeMap">
              <div v-if="diseaseSingle.inheritances.gene.length!=0">
                <a class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                   :data-original-title="diseaseSingle.inheritances.gene.join(',')">[{{diseaseSingle.inheritances.gene_ab.join(',')}}]</a>
                {{diseaseSingle.phenotype}}
                <!--<a :href="'../knowledge/geneOmDetail.html?&omId='+diseaseSingle.omim.mimNumber"-->
                <!--class="color-a">({{diseaseSingle.omim.mimNumber}})</a>-->
                <router-link target="_blank" :to="{path:'/geneOmDetail',query:{omId:diseaseSingle.omim.mimNumber}}">
                  ({{diseaseSingle.omim.mimNumber}})
                </router-link>
              </div>
              <div v-else>
                <a class="po font-700 a-color" data-toggle="tooltip" data-placement="top"
                   :data-original-title="diseaseSingle.inheritances.phenotype.join(',')">[{{diseaseSingle.inheritances.phenotype_ab.join(',')}}]</a>
                {{diseaseSingle.phenotype}}
                <!--<a :href="'../knowledge/geneOmDetail.html?&omId='+diseaseSingle.omim.mimNumber"-->
                <!--class="color-a">({{diseaseSingle.omim.mimNumber}})</a>-->
                <router-link target="_blank" :to="{path:'/geneOmDetail',query:{omId:diseaseSingle.omim.mimNumber}}">
                  ({{diseaseSingle.omim.mimNumber}})
                </router-link>
              </div>
            </div>
          </td>
          <td>
            <div v-for="single in row.cov5">
              {{single|getCov5}}
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <pagenation :count="count" :reset="reset" @getCurrent="getCurrent"></pagenation>

    </div>
  </div>
</template>

<script>
  import topLocation from './global/location'
  import search from './global/search'
  import pagenation from './global/pagenation'
  export default {
    components: {
      'location': topLocation,
      'search': search,
      'pagenation':pagenation
    },
    name: 'gene',
    data: function () {
      return {
        list_gene: [],
        inputValue: this.$route.query.query ? this.$route.query.query : '',
        loading: true,

        count:1,
        current:1,
        reset:0
      }
    },
    created: function () {
      this.geneAjax();
    },
    methods: {
      getCurrent:function (data) {
        this.current = data;
        this.reset = 0;
        this.geneAjax();
      },
      fillData: function (resp) {
        const results = resp.results;
        this.count = resp.count;
        $.each(results, function (i, value) {
          value.synonymsStr = value.synonyms.join("|");
          value.cov5 = [];
          $.each(value.tags.cov5, function (k, data) {
            value.cov5.push(k + ' : ' + data);
          });
        });
        this.list_gene = results;
        this.loading = false
      },
      geneAjax: function () {
        let _vue = this;
        this.loading = true;
        this.list_gene = [];
        let url = 'knowledge/gene/?page=' + this.current;
        url = this.$route.query.query ? url + '&query=' + this.$route.query.query : url;
        this.$axios({
          method: "get",
          url: url,
        }).then(function (resp) {
          _vue.fillData(resp.data);
        });
      },
      onEnter: function (data) {
        this.inputValue = data;
        this.$route.query.query = this.inputValue;
        console.log(this.$route.query.query);
        this.$route.query.p = 1;
        this.current = 1; //保证请求page为1
        this.reset = 1; //重置当前页面为1
        this.geneAjax();
      },
    },
    filters:{
      getCov5:function (cov5) {
        const index= cov5.indexOf(':');
        let first = cov5.substring(0,index);
        let last = parseFloat(cov5.substring(index+1,cov5.length));
        if(last === 1){
          return cov5
        }else{
          last = last.toFixed(4);
          return first+': '+last;
        }

      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
  }
</script>

<style scoped>
  .table-gene.table > tbody > tr > td,
  .table-gene.table > tbody > tr > th,
  .table-gene.table > tfoot > tr > td,
  .table-gene.table > tfoot > tr > th,
  .table-gene.table > thead > tr > td,
  .table-gene.table > thead > tr > th {
    vertical-align: middle;
  }

  .myTable {
    margin-top: 40px;
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

  .po {
    cursor: pointer;
  }
</style>
