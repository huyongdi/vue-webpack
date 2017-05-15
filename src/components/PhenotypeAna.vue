<template>
  <div class="right-content">
    <div class="locationShow">
      <div class="navTitle">
        <span class="phenoType-small"></span>
        <span class="navTitle-span">基因</span>
      </div>
      <div class="detailTitle">
        <span>您现在的位置：</span>
        <span>数据库</span>&nbsp;>&nbsp;<span id="database-title">表型分析</span>
      </div>
    </div>
    <div class="detailShow" id="">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <div class="anaTitle">输入HPO表型(逗号隔开)</div>
          <div id="must">
            <div class="ana-subTitle">与以下表型相关基因(必填)</div>
            <div class="myRow">
              <input class="noW-fControl col-lg-7" type="text" v-model="inputMust"
                     @keyup="getMust()" @blur="hideMustUl" data-id=""/>
              <label class="checkbox-inline label-one">
                <input type="checkbox" id="must_sub" value="option2"> 关联子表型
              </label>
              <label class="checkbox-inline">
                <input type="checkbox" value="111" id="must_orphanet" @click.stop="">
                扩展orphanet信息
              </label>
            </div>
            <ul class="list-group show-ul" id="mustUl">
              <li class="list-group-item show-li" v-for="mustStr in mustData"
                  @mousedown.stop="mustLiClick(mustStr.cn,mustStr.en,mustStr.hpoId)">
                {{mustStr.liStr}}
              </li>
            </ul>
          </div>
          <div id="optional">
            <div class="ana-subTitle">同时去除以下表型相关基因(选填)</div>
            <div class="myRow">
              <input class="noW-fControl col-lg-7" type="text" v-model="inputOptional"
                     @keyup="getOptional()" @blur="hideOpUl" data-id=""/>
              <label class="checkbox-inline label-one">
                <input type="checkbox" id="optional_sub" value="option2"> 关联子表型
              </label>
              <label class="checkbox-inline">
                <input type="checkbox" id="optional_orphanet" value=""
                       @click.stop=""> 扩展orphanet信息
              </label>
              <div>
                <ul class="list-group show-ul" id="optionalUl">
                  <li class="list-group-item show-li" v-for="optionalStr in optionalData"
                      @mousedown.stop="optionalLiClick(optionalStr.cn,optionalStr.en,optionalStr.hpoId)">
                    {{optionalStr.liStr}}
                  </li>
                </ul>
              </div>
              <button type="button" class="btn btn-success anaBtn" id="ana_search" @click.stop="search">搜索</button>
            </div>
          </div>
        </div>
      </div>

      <table class="table myTable table-gene table-striped hide" id="pheno_table">
        <thead>
        <tr>
          <th>基因ID</th>
          <th>基因名</th>
          <th>别名</th>
          <th>表型</th>
        </tr>
        </thead>
        <tbody id="pheno_t">
        <tr v-for="result in results">
          <td>{{result.geneId}}</td>
          <td>{{result.symbol}}</td>
          <td>{{result.synonyms.join('|')}}</td>
          <td>
            <span class="show-hpos" v-for="hpo in result.hpos">{{hpo.hpoId}}({{hpo.name_cn}})</span>
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
</template>

<script>
  export default {
    data: function () {
      return {
        mustData: [],
        inputMust: '',
        ajaxArr_must: [],
        optionalData: [],
        inputOptional: '',
        ajaxArr_opt: [],
        loading: false,
        results:''
      }
    },
    methods: {
      search: function () {
        this.loading = true;
        $("#pheno_table").removeClass('hide');
        const ajaxMust = [];
        const ajaxOpt = [];
        const _vue = this;

        //判断输入框里面有几个值，data-id保存的字符串，只取后面几个
        const mustInputArr = this.inputMust.split('，');
        const optInputArr = this.inputOptional.split('，');
        $.each(mustInputArr, function (i, value) {
          $.each(_vue.ajaxArr_must, function (n, data) {
            if (value === data.name) {
              ajaxMust.push(data.id)
            }
          })
        });



        console.log(optInputArr)
        console.log(this.ajaxArr_opt)
        $.each(optInputArr, function (i, value) {
          $.each(_vue.ajaxArr_opt, function (n, data) {
            if (value === data.name) {
              ajaxOpt.push(data.id)
            }
          })
        });

        this.$axios({
          url: 'knowledge/phenomini/',
          method:'post',
          data:{
            'include': ajaxMust,
            'exclude': ajaxOpt,
            'include_sub': $("#must_sub").prop("checked"),
            'exclude_sub': $("#optional_sub").prop("checked"),
          }
        }).then(function (resp) {
          _vue.loading = false;
          _vue.results = resp.data;
        });
      },
      getMust: function () {
        if (!this.inputMust) { //没有值的时候不做操作
          return;
        }
        let inputValue = this.inputMust;
        const lastIndex = inputValue.lastIndexOf('，');
        inputValue = inputValue.substring(lastIndex + 1, inputValue.length);
        let mustUrl = '';
        if ($("#must_orphanet").prop("checked")) {
          mustUrl = 'knowledge/hpo/?query=' + inputValue + '&orpha=true'
        } else {
          mustUrl = 'knowledge/hpo/?query=' + inputValue + '&orpha=false'
        }

        const _vue = this;
        this.$axios({
          url: mustUrl,
          type: 'get'
        }).then(function (resp) {
          $("#mustUl").removeClass('hide');
          const results = resp.data.results;
          const mustArr = [];
          $.each(results, function (i, value) {
            let obj = {};
            obj.liStr = value.titles.chinese ? value.hpoId + ' ' + value.titles.chinese +
              '(' + value.titles.english + ')' : value.hpoId + value.value.titles.english;
            obj.cn = value.titles.chinese;
            obj.en = value.titles.english;
            obj.hpoId = value.hpoId;
            mustArr.push(obj);
          });
          _vue.mustData = mustArr;
        });
      },
      mustLiClick: function (cnStr, enStr, id) {
        const _ul = $("#mustUl");
        let toBeValue = cnStr ? cnStr : enStr; //待填充到输入框的字符串
        let oldValue = this.inputMust; //输入框的旧值

        //id保存在输入框的data-id里面,并且判断重复
        if (this.inputMust.indexOf(toBeValue) >= 0) {
          alert('请不要重复添加!');
          return false;
        }
        this.ajaxArr_must.push({
          id: id,
          name: toBeValue
        });
        if (oldValue.indexOf('，') < 0) { //输入框里面没有逗号 也就是第一次准备填值
          this.inputMust = toBeValue + '，';
        } else { //去除最后一个逗号之后的字符串
          const last = oldValue.lastIndexOf('，'); //最后一个逗号的位置
          oldValue = oldValue.substring(0, last + 1);
          this.inputMust = oldValue + toBeValue + '，';
        }
        _ul.addClass('hide');
      },
      getOptional: function () {
        if (!this.inputOptional) {
          return;
        }
        let inputValue = this.inputOptional;
        const lastIndex = inputValue.lastIndexOf('，');
        inputValue = inputValue.substring(lastIndex + 1, inputValue.length);
        let optionalUrl = '';
        if ($("#optional_orphanet").prop("checked")) {
          optionalUrl = 'knowledge/hpo/?query=' + inputValue + '&orpha=true'
        } else {
          optionalUrl = 'knowledge/hpo/?query=' + inputValue + '&orpha=false'
        }

        const _vue = this;
        this.$axios({
          url: optionalUrl,
          type: 'get'
        }).then(function (resp) {
          const results = resp.data.results;
          const optionalArr = [];
          $.each(results, function (i, value) {
            let obj = {};
            obj.liStr = value.titles.chinese ? value.hpoId + ' ' + value.titles.chinese + '(' + value.titles.english + ')'
              : value.hpoId + value.value.titles.english;
            obj.cn = value.titles.chinese;
            obj.en = value.titles.english;
            obj.hpoId = value.hpoId;
            optionalArr.push(obj);
          });
          _vue.optionalData = optionalArr;
        });
      },
      optionalLiClick: function (cnStr, enStr, id) {
        const _ul = $("#optionalUl");
        let toBeValue = cnStr ? cnStr : enStr; //待填充到输入框的字符串
        let oldValue = this.inputOptional; //输入框的旧值
        //id保存在输入框的data-id里面,并且判断重复
        if (this.inputOptional.indexOf(toBeValue) >= 0) {
          alert('请不要重复添加!');
          return false;
        }
        this.ajaxArr_opt.push({
          id: id,
          name: toBeValue
        });
        if (oldValue.indexOf('，') < 0) { //输入框里面没有逗号 也就是第一次准备填值
          this.inputOptional = toBeValue + '，';
        } else { //去除最后一个逗号之后的字符串
          const last = oldValue.lastIndexOf('，'); //最后一个逗号的位置
          oldValue = oldValue.substring(0, last + 1);
          this.inputOptional = oldValue + toBeValue + '，';
        }
        _ul.addClass('hide');
      },
      hideMustUl: function () {
        $("#mustUl").addClass('hide');
      },
      hideOpUl: function () {
        $("#optionalUl").addClass('hide');
      }
    }
  }
</script>

<style scoped>
  .phenoType-small {
    float: left;
    width: 32px;
    height: 32px;
    background: url(../img/hpo-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }

  .anaTitle {
    margin-bottom: 30px;
    font-size: 16px;
  }

  .ana-subTitle {
    margin-top: 20px;
    font-weight: bold;
    font-size: 13px;
  }

  .anaBtn {
    float: right;
    margin-top: 20px;
  }

  .show-li {
    cursor: pointer;
  }

  .show-li:hover {
    background-color: #00a1e9;
  }

  .show-ul {
    width: 100%;
    position: absolute;
    z-index: 100;
  }

  .noW-fControl {
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  #must .myRow {
    height: 35px;
  }

  #optional label, #must label {
    margin-top: 6px;
  }

  .label-one {
    margin-left: 20px;
  }

  .show-hpos {
    display: block;
  }

  #pheno_table {
    margin-top: 40px;
  }
</style>
