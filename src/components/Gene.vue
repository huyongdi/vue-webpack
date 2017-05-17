<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="gene-small" currentPage="基因"></location>
    <!--基因列表-->
    <div class="detailShow" id="geneList">
      <div class="searchBorder" id="search_gene">
        <input type="text" class="form-control input_hasImg" placeholder="" v-model="inputValue" @keyup.enter="onEnter">
        <button class="search-btn myBtn" @click.stop="onEnter"></button>
      </div>

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

      <div class="text-center" v-show="!!allPage">
        <nav>
          <ul class="pagination">
            <!--上一页逻辑-->
            <li v-if='current == 1' class='disabled'><span class='color-a'>&laquo;上一页</span></li>
            <li v-else @click='current-- && goTo(current--)'><span class='color-a'>&laquo;上一页</span></li>
            <!--中间页码-->
            <li v-for="index in pages" @click="goTo(index)" :class="{'active':current == index}"><span
              class="po">{{index}}</span></li>
            <!--下一页逻辑-->
            <li v-if="allPage == current || allPage == 0" class="disabled"><span class="">下一页&raquo;</span></li>
            <li @click="current++ && goTo(current++)" class="po"
                :class="{'disabled':allPage == current || allPage == 0}">
              <span>下一页&raquo;</span></li>
            <!--跳转逻辑-->
            <li class=""><span class="color-a toPage">第<input v-model="beforeCurrent" @keyup.enter="goTo()">页/共{{allPage}}页</span>
            </li>
          </ul>
        </nav>
      </div>


    </div>
  </div>
</template>

<script>
  import topLocation from './global/location'
  export default {
    components: {
      'location': topLocation,
    },
    name: 'gene',
    data: function () {
      return {
        list_gene: [],
        inputValue: this.$route.query.query ? this.$route.query.query : '',
        current: 1,
        beforeCurrent: 1,
        showItem: 10,
        allPage: 1,
        loading: true
      }
    },
    created: function () {
      this.geneAjax();
    },
    methods: {
      fillData: function (resp) {
        const results = resp.results;
        $.each(results, function (i, value) {
          value.synonymsStr = value.synonyms.join("|");
          value.cov5 = [];
          $.each(value.tags.cov5, function (k, data) {
            value.cov5.push(k + ' : ' + data);
          });
        });
        this.list_gene = results;
        this.allPage = Math.ceil(resp.count / 20);
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
      onEnter: function () {
        this.$route.query.query = this.inputValue;
        console.log(this.$route.query.query)
        this.$route.query.p = 1;
        this.current = 1;
        this.geneAjax();
      },
      goTo: function (page) {
        let index = this.beforeCurrent;
        if (index > this.allPage || !/^\d+$/.test(index)) {
          alert('请输入正确的页码！');
          return
        }
        this.current = page ? page : index;
        this.beforeCurrent = page ? page : this.beforeCurrent;
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
    computed: {
      pages: function () { //计算属性
        let pag = [],
          i = null;
        if (this.current < this.showItem) {
          i = Math.min(this.showItem, this.allPage);
          while (i) {
            pag.unshift(i--); //把一个元素添加到数组的开头
          }
        } else {
          let middle = this.current - this.showItem / 2;//从哪里开始
          i = this.showItem;
          if (middle > (this.allPage - this.showItem)) {
            middle = (this.allPage - this.showItem) + 1
          }
          while (i--) {
            pag.push(middle++);
          }
        }
        return pag
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
  }
</script>

<style scoped>
  .input_hasImg {
    display: inline-block;
    width: 400px;
    border: none;
    height: 43px;
    outline: none;
    box-shadow: none;
  }

  .search-btn {
    display: inline-block;
    width: 36px;
    height: 36px;
    background: url(../img/data-sreach-bc.png) no-repeat center;
    background-size: 36px 36px;
    margin: 0 0 4px 8px;
  }

  .table-gene {
    margin-top: 40px;
  }

  .searchBorder {
    border: 1px solid #dedfe0;
    width: 460px;
    height: 45px;
  }

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
