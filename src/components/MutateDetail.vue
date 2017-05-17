<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="mutate-small" currentPage="变异详情"></location>

    <div class="detailShow mutate" id="mutate">
      <div class="gene-information">
        <span class="gene-information-title">基本信息</span>
        <div class="gene-content">
          <div class="myRow">
            <span>变异：</span>
            <span>{{basicResp.position}}({{basicResp.ref}}/{{basicResp.alt}})</span>
          </div>
        </div>
      </div>
      <div class="gene-information">
        <span class="gene-information-title">人群频率</span>
        <div class="gene-content">
          <div class="frequency-chart" id="frequency-chart"></div>
        </div>
      </div>

      <div class="gene-information" id="DBnsfp">
        <span class="gene-information-title">DBnsfp</span>
        <div class="gene-content row">
          <div class="mit-chart col-lg-4" id="mit-chart"></div>
          <div class="mit-table col-lg-8 row" id="snv_forecast">
            <div class="col-lg-6">
              <table class="table">
                <thead>
                <tr>
                  <th>数据库</th>
                  <th>score</th>
                  <th>pred</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Mcap</td>
                  <td>
                    <span v-if="mitData.mcap">{{mitData.mcap.score ? mitData.mcap.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.mcap">{{mitData.mcap.pred ? mitData.mcap.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>SIFT</td>
                  <td>
                    <span v-if="mitData.sift">{{mitData.sift.score ? mitData.sift.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.sift">{{mitData.sift.pred ? mitData.sift.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>Polyphen2_hdiv</td>
                  <td>
                    <span v-if="mitData.po2">{{mitData.po2.hdiv_score ? mitData.po2.hdiv_score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.po2">{{mitData.po2.hdiv_pred ? mitData.po2.hdiv_pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>Polyphen2_hvar</td>
                  <td>
                    <span v-if="mitData.po2">{{mitData.po2.hvar_score ? mitData.po2.hvar_score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.po2">{{mitData.po2.hvar_pred ? mitData.po2.hvar_pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>FATHMM</td>
                  <td>
                    <span v-if="mitData.fathmm">{{mitData.fathmm.score ? mitData.fathmm.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.fathmm">{{mitData.fathmm.pred ? mitData.fathmm.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>GERP</td>
                  <td>{{mitData.gerp ? mitData.gerp : '-' }}</td>
                  <td> -</td>
                </tr>
                <tr>
                  <td>Deafness</td>
                  <td>
                    {{deData ? deData : '-'}}
                  </td>
                  <td> -</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-lg-6">
              <table class="table">
                <thead>
                <tr>
                  <th>数据库</th>
                  <th>score</th>
                  <th>pred</th>
                </tr>
                </thead>
                <thead>
                <tr>
                  <td>LRT</td>
                  <td>
                    <span v-if="mitData.lrt">{{mitData.lrt.score ? mitData.lrt.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.lrt">{{mitData.lrt.score ? mitData.lrt.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>PROVEAN</td>
                  <td>
                    <span v-if="mitData.provean">{{mitData.provean.score ? mitData.provean.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.provean">{{mitData.provean.pred ? mitData.provean.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>MutationTaster</td>
                  <td>
                    <span
                      v-if="mitData.mutationtaster">{{mitData.mutationtaster.score ? mitData.mutationtaster.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span
                      v-if="mitData.mutationtaster">{{mitData.mutationtaster.pred ? mitData.mutationtaster.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>MutationAssessor</td>
                  <td>
                    <span
                      v-if="mitData.mutationasseaaor">{{mitData.mutationasseaaor.score ? mitData.mutationasseaaor.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span
                      v-if="mitData.mutationasseaaor">{{mitData.mutationasseaaor.pred ? mitData.mutationasseaaor.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>MetaLR</td>
                  <td>
                    <span v-if="mitData.fathmm">{{mitData.fathmm.score ? mitData.fathmm.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.fathmm">{{mitData.fathmm.pred ? mitData.fathmm.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>MetaSVM</td>
                  <td>
                    <span v-if="mitData.metasvm">{{mitData.metasvm.score ? mitData.metasvm.score : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                  <td>
                    <span v-if="mitData.metasvm">{{mitData.metasvm.pred ? mitData.metasvm.pred : '-'}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>REVEL</td>
                  <td>{{mitData.revel ? mitData.revel : '-'}}</td>
                  <td> -</td>
                </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="gene-information hide" id="HGMD">
        <span class="gene-information-title">HGMD（2014-2）</span>
        <span></span>
        <div class="gene-content">
          <table class="table">
            <thead>
            <tr>
              <th>基本信息</th>
              <th>疾病信息</th>
              <th>数据库</th>
            </tr>
            </thead>
            <tbody id="snv_hgmd">
            <tr>
              <td>hgmdNumber:&nbsp;{{hgmdData.hgmdNumber}}</td>
              <td>disease:&nbsp;{{hgmdData.disease}}</td>
              <td>uniprot:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.uniprot}}</span></td>
            </tr>
            <tr>
              <td>hgnc:&nbsp;{{hgmdData.hgnc}}</td>
              <td>citation:&nbsp;{{hgmdData.citation}}</td>
              <td>rsid:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.rsid}}</span></td>
            </tr>
            <tr>
              <td>hgvs:&nbsp;{{hgmdData.hgvs}}</td>
              <td>comments:&nbsp;{{hgmdData.comments}}</td>
              <td>ensembl:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.ensembl}}</span></td>
            </tr>
            <tr>
              <td>snv_raw:&nbsp;<span
                v-if="hgmdData.snv_raw">{{hgmdData.snv_raw.chrom}}:{{hgmdData.snv_raw.start}}-{{hgmdData.snv_raw.end}}({{hgmdData.snv_raw.ref}}/{{hgmdData.snv_raw.alt}}){{hgmdData.snv_raw.strand}}</span>
              </td>
              <td>confidence:&nbsp;{{hgmdData.confidence}}</td>
              <td>omim:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.omim}}</span></td>
            </tr>
            <tr>
              <td>密码子改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.codon}}</span></td>
              <td>feature:&nbsp;{{hgmdData.feature}}</td>
              <td>pmid:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.pmid}}</span></td>
            </tr>
            <tr>
              <td>核苷酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.nucleotide}}</span></td>
              <td>mutType:&nbsp;{{hgmdData.mutType}}</td>
              <td>hgmdAcc:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.hgmdAcc}}</span></td>
            </tr>
            <tr>
              <td>氨基酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.aminoacid}}</span></td>
              <td>varType:&nbsp;{{hgmdData.varType}}</td>
              <td>entrez:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.entrez}}</span></td>
            </tr>
            <tr>
              <td colspan="3">genoSeq:&nbsp;{{hgmdData.genoSeq}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information hide" id="clinvar">
        <span class="gene-information-title">Clinvar（2017-01-30）</span>
        <span></span>
        <div class="gene-content" id="snv_clinvar">
          <div class="row">
            <span class="col-lg-6">CLNACC: {{clinvarData.clnacc}}</span>
          </div>
          <div class="row">
            <span class="col-lg-6">CLINSIG: {{clinvarData.clinsig}}</span>
          </div>
          <div class="row">
            <span class="col-lg-12">CLNDBN: {{clinvarData.clndbn}}</span>
          </div>
          <div class="row">
            <span class="col-lg-12">CLNDSDB: {{clinvarData.clndsdb}}</span>
          </div>
          <div class="row">
            <span class="col-lg-12">CLNDSDBID: {{clinvarData.clndsdbid}}</span>
          </div>
        </div>
      </div>

      <div class="gene-information hide" id="gwas">
        <span class="gene-information-title">GWAS（2015-01-21）</span>
        <span></span>
        <div class="gene-content" id="SNV_GWAS">
          <div class="row">
            <span class="col-lg-4">disease: {{gwasData.disease}}</span>
            <span class="col-lg-4">orVal: {{gwasData.orVal}}</span>
            <span class="col-lg-4">beta: {{gwasData.beta}}</span>
          </div>
          <div class="row">
            <span class="col-lg-4">pubmed: {{gwasData.pubmed}}</span>
            <span class="col-lg-4">rsid: {{gwasData.rsid}}</span>
            <span class="col-lg-4">pVal: {{gwasData.pVal}}</span>
          </div>
        </div>
      </div>

      <div class="gene-information hide" id="mit">
        <span class="gene-information-title">线粒体</span>
        <span></span>
        <div class="gene-content">
          <table class="table">
            <thead>
            <tr>
              <th>Mitomap</th>
              <th>Mitimpact</th>
              <th>Mitimpact dbnsfp</th>
            </tr>
            </thead>
            <tbody id="snv_mit">
            <tr>
              <td>allele:&nbsp;{{MitomapData.allele}}</td>
              <td>mitimpactId:&nbsp;{{MitimpactData.mitimpactId}}</td>
              <td>EFIN_SP:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span>{{MitimpactData.dbnsfp.EFIN_SP.score}}(score)</span>&nbsp;
                  <span>{{MitimpactData.dbnsfp.EFIN_SP.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>aa_change:&nbsp;{{MitomapData.aa_change}}</td>
              <td>ensemblId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ensemblId}}</span>
              </td>
              <td>EFIN_HD:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span>{{MitimpactData.dbnsfp.EFIN_HD.score}}(score)</span>&nbsp;
                  <span>{{MitimpactData.dbnsfp.EFIN_HD.pred}}(pred)</span>
              </span>
              </td>
            </tr>
            <tr>
              <td>homo:&nbsp;{{MitomapData.homo}}</td>
              <td>ncbiId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ncbiId}}</span></td>
              <td>Polyphen2:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span>{{MitimpactData.dbnsfp.Polyphen2.score}}(score)</span>&nbsp;
                  <span>{{MitimpactData.dbnsfp.Polyphen2.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>hete:&nbsp;{{MitomapData.hete}}</td>
              <td>symbol:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.symbol}}</span></td>
              <td>SIFT:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span>{{MitimpactData.dbnsfp.SIFT.score}}(score)</span>&nbsp;
                  <span>{{MitimpactData.dbnsfp.SIFT.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>status:&nbsp;{{MitomapData.status}}</td>
              <td>aa_change:&nbsp;{{MitimpactData.aa_change}}</td>
              <td>FATHMM:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span>{{MitimpactData.dbnsfp.FATHMM.score}}(score)</span>&nbsp;
                  <span>{{MitimpactData.dbnsfp.FATHMM.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>locus:&nbsp;{{MitomapData.locus}}</td>
              <td>disease:&nbsp;{{MitimpactData.disease}}</td>
              <td>PROVEAN:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                  <span>{{MitimpactData.dbnsfp.PROVEAN.score}}(score)</span>&nbsp;
                  <span>{{MitimpactData.dbnsfp.PROVEAN.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>disease:&nbsp;{{MitomapData.disease}}</td>
              <td>status:&nbsp;{{MitimpactData.status}}</td>
              <td>MutationAssessor:&nbsp;&nbsp;
                <span v-if="MitimpactData.dbnsfp">
                   <span>{{MitimpactData.dbnsfp.MutationAssessor.score}}(score)</span>&nbsp;
                  <span>{{MitimpactData.dbnsfp.MutationAssessor.pred}}(pred)</span>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="gene-information hide" id="cutAread">
        <span class="gene-information-title">剪切区域</span>
        <span></span>
        <div class="gene-content" id="snv_dbSpi">
          <div class="dbSpiTitle">DBscsnv</div>
          <div class="row">
            <span class="col-lg-6">ada_score:
              <span v-if="dbData">{{dbData.ada_score ? dbData.ada_score : ' - '}}</span>
              <span v-else=""> - </span>
            </span>
            <span class="col-lg-6">rf_score:
               <span v-if="dbData">{{dbData.rf_score ? dbData.rf_score : '-'}}</span>
              <span v-else=""> - </span>
            </span>
          </div>
          <div class="dbSpiTitle">Spidex</div>
          <div class="row">
            <span class="col-lg-6">max_tissue:
              <span v-if="spiData">{{spiData.max_tissue ? spiData.max_tissue : '-'}}</span>
              <span v-else=""> - </span>
            </span>
            <span class="col-lg-6">zscore:
              <span v-if="spiData">{{spiData.zscore ? spiData.zscore : '-'}}</span>
              <span v-else=""> - </span>
            </span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import topLocation from './global/location'
  const echarts = require('echarts');
  export default {
    components: {
      'location': topLocation,
    },
    data: function () {
      return {
        basicResp: '',
        mitData: '',
        deData: '',
        hgmdData: '',
        clinvarData: '',
        gwasData: '',
        MitomapData: '',
        MitimpactData: '',
        dbData: '',
        spiData: '',
        type_0: 0,
        type_1: 0,
        type_2: 0,
        loading:true
      }
    },
    created: function () {
      const _vue = this;
      this.$axios({
        url: 'database/snv/search/?query=' + this.$route.query.query,
        method: 'get'
      }).then(function (resp) {
        console.log(resp);
        _vue.basicResp = resp.data;
        _vue.dbfreq();//绘制人群频率
        _vue.dbnfspPie(); //绘制dbnfsp左侧饼图
        _vue.dbnfspTable(); //填充dbnfsp右侧列表
        _vue.fillHgmd();//填充hgmd
        _vue.fillClinvar(); //填充clinvar
        _vue.fillGwas();//填充gwas
        _vue.fillMito();//填充线粒体
        _vue.fillCut();//填充剪切区域
      })
    },
    methods: {
      fillCut: function () {
        if (this.basicResp.splicing.DBscsnv || this.basicResp.splicing.Spidex) {
          $("#cutAread").removeClass('hide');
          this.dbData = this.basicResp.splicing.DBscsnv;
          this.spiData = this.basicResp.splicing.Spidex;
          this.loading =false
        }
      },
      fillMito: function () {
        if (this.basicResp.mito.MITOMAP || this.basicResp.mito.Mitimpact) { //线粒体部分
          $("#mit").removeClass('hide');
          if (this.basicResp.mito.MITOMAP) {
            this.MitomapData = this.basicResp.mito.MITOMAP;
          }
          if (this.basicResp.mito.Mitimpact) {
            this.MitimpactData = this.basicResp.mito.Mitimpact;
          }
        }
      },
      fillGwas: function () {
        if (this.basicResp.gwas) {
          $("#gwas").removeClass('hide');
          this.gwasData = this.basicResp.gwas;
        }
      },
      fillClinvar: function () {
        if (this.basicResp.clinvar) {
          $("#clinvar").removeClass('hide');
          this.clinvarData = this.basicResp.clinvar;
        }
      },
      fillHgmd: function () {
        if (this.basicResp.hgmd) {
          $("#HGMD").removeClass('hide');
          let data = _vue.basicResp.hgmd;
          data.hgvs = data.hgvs.join(' , ');
          data.citation = data.citation.join(' , ');
          data.dbid.uniprot = data.dbid.uniprot.join(' , ');
          data.dbid.pmid = data.dbid.pmid.join(' , ');
          this.hgmdData = data;
        }
      },
      dbfreq: function () {
        let mtdb_data;
        let exac_data = this.basicResp.freq.ExAC ? this.basicResp.freq.ExAC : {
          "all": 0, //ExAC所有人群频率
          "afr": 0, //ExAC非洲人群频率
          "amr": 0, //ExAC美洲人群频率
          "eas": 0, //ExAC东亚人群频率
          "sas": 0, //ExAC南亚人群频率
          "fin": 0, //ExAC芬兰人群频率
          "nfe": 0, //ExAC非芬兰欧洲人群频率
          "oth": 0  //ExAC其他人群频率
        };
        let g100_data = this.basicResp.freq.OneKG ? this.basicResp.freq.OneKG : {
          "all": 0, //千人所有人群频率
          "afr": 0, //千人非洲人群频率
          "amr": 0, //千人美洲人群频率
          "eas": 0, //千人东亚人群频率
          "sas": 0, //千人南亚人群频率
          "eur": 0  //千人欧洲人群频率
        };
        let esp_data = this.basicResp.freq.ESP6500 ? this.basicResp.freq.ESP6500 : {
          "all": 0, //ESP6500si所有人群频率
          "aa": 0,  //ESP6500si_AA人群频率
          "ea": 0   //ESP6500si_EE人群频率
        };
        let grandFreq = this.basicResp.freq.GrandFreq ? this.basicResp.freq.GrandFreq : 0;
        mtdb_data = this.basicResp.mito.MTDB ? this.basicResp.mito.MTDB : 0;
        this.dataBaseCharts('frequency-chart', {
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisLabel: {rotate: -30, 'interval': 0},
              data: [{
                value: '本地',
                textStyle: {color: 'red'}
              }, {
                value: 'ExAC东亚',
                textStyle: {color: 'red'}
              }, '\nExAC所有', 'ExAC非洲', '\nExAC美洲', 'ExAC南亚', '\nExAC芬兰', 'ExAC非芬兰欧洲', '\nExAC其他',
                {
                  value: '千人东亚',
                  textStyle: {color: 'red'}
                }, '\n千人所有', '千人非洲', '\n千人美洲', '千人南亚', '\n千人欧洲',
                'ESP6500si所有', '\nESP6500si_AA', 'ESP6500si_EE', {
                  value: 'MTDB',
                  textStyle: {color: 'red'}
                },
              ]
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '频率'
            }
          ],
          series: [
            {
              name: '人群频率',
              type: 'bar',
              data: [{value: grandFreq, itemStyle: {normal: {color: '#258dc1'}}}, {
                value: exac_data.eas,
                itemStyle: {normal: {color: '#258dc1'}}
              },
                {value: exac_data.all, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: exac_data.afr,
                  itemStyle: {normal: {color: '#258dc1'}}
                },
                {value: exac_data.amr, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: exac_data.sas,
                  itemStyle: {normal: {color: '#258dc1'}}
                },
                {value: exac_data.fin, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: exac_data.nfe,
                  itemStyle: {normal: {color: '#258dc1'}}
                },
                {value: exac_data.oth, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: g100_data.all,
                  itemStyle: {normal: {color: '#258dc1'}}
                },
                {value: g100_data.afr, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: g100_data.amr,
                  itemStyle: {normal: {color: '#258dc1'}}
                },
                {value: g100_data.eas, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: g100_data.sas,
                  itemStyle: {normal: {color: '#258dc1'}}
                },
                {value: g100_data.eur, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: esp_data.all,
                  itemStyle: {normal: {color: '#258dc1'}}
                },
                {value: esp_data.aa, itemStyle: {normal: {color: '#258dc1'}}}, {
                  value: esp_data.ea,
                  itemStyle: {normal: {color: '#258dc1'}}
                }, {value: mtdb_data, itemStyle: {normal: {color: '#258dc1'}}}
              ],
              markLine: {
                data: [{
                  name: 'Y 轴值为 0.01的水平线',
                  yAxis: 0.01
                }, {
                  name: 'Y 轴值为 0.05的水平线',
                  yAxis: 0.05
                }
                ]
              }
            }
          ],
          barWidth: '20%'
        });
      },
      dbnfspTable: function () {
        let forecast = {
          gerp: this.basicResp.prediction.GERP,
          revel: this.basicResp.prediction.REVEL.score.join(',')
        };
        forecast.mcap = {
          score: this.basicResp.prediction.Mcap.score,
          pred: this.basicResp.prediction.Mcap.pred
        };
        forecast.sift = {
          score: this.basicResp.prediction.SIFT.score,
          pred: this.basicResp.prediction.SIFT.pred
        };
        forecast.po2 = {
          hdiv_score: this.basicResp.prediction.Polyphen2.hdiv_score,
          hdiv_pred: this.basicResp.prediction.Polyphen2.hdiv_pred,
          hvar_score: this.basicResp.prediction.Polyphen2.hvar_score,
          hvar_pred: this.basicResp.prediction.Polyphen2.hvar_pred,
        };
        forecast.lrt = {
          score: this.basicResp.prediction.LRT.score,
          pred: this.basicResp.prediction.LRT.pred
        };
        forecast.fathmm = {
          score: this.basicResp.prediction.FATHMM.score,
          pred: this.basicResp.prediction.FATHMM.pred
        };
        forecast.provean = {
          score: this.basicResp.prediction.PROVEAN.score,
          pred: this.basicResp.prediction.PROVEAN.pred
        };
        forecast.mutationtaster = {
          score: this.basicResp.prediction.PROVEAN.score,
          pred: this.basicResp.prediction.PROVEAN.pred
        };
        forecast.mutationasseaaor = {
          score: this.basicResp.prediction.MutationTaster.score,
          pred: this.basicResp.prediction.MutationTaster.pred
        };
        forecast.metalr = {
          score: this.basicResp.prediction.MetaLR.score,
          pred: this.basicResp.prediction.MetaLR.pred
        };
        forecast.metasvm = {
          score: this.basicResp.prediction.MetaSVM.score,
          pred: this.basicResp.prediction.MetaSVM.pred
        };
        this.mitData = forecast;//填充表格 snv_forecast
        this.deData = this.basicResp.deafness;//填充表格 snv_forecast
      },
      dbnfspPie: function () {
        this.doPie(this.basicResp.prediction.Mcap);
        this.doPie(this.basicResp.prediction.SIFT.pred);
        this.doPie(this.basicResp.prediction.Polyphen2.hdiv_pred);
        this.doPie(this.basicResp.prediction.LRT.pred);
        this.doPie(this.basicResp.prediction.FATHMM.pred);
        this.doPie(this.basicResp.prediction.PROVEAN.pred);
        this.doPie(this.basicResp.prediction.PROVEAN.pred);
        this.doPie(this.basicResp.prediction.MutationTaster.pred);
        this.doPie(this.basicResp.prediction.MetaLR.pred);
        this.doPie(this.basicResp.prediction.MetaSVM);
        this.dataBaseCharts('mit-chart', {
          title: {
            text: '有害性预测统计',
            subtext: '共十个数据库',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Tolerated', 'Damaging', 'Probably damaging', 'Undefined']
          },
          series: [
            {
              name: '预测统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.type_0, name: 'Tolerated', itemStyle: {normal: {color: '#FF3333'}}},
                {value: this.type_1, name: 'Damaging', itemStyle: {normal: {color: '#FFFF66'}}},
                {value: this.type_2, name: 'Probably damaging', itemStyle: {normal: {color: '#66CC33'}}},
                {value: this.type_3, name: 'Undefined', itemStyle: {normal: {color: '#666666'}}},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      doPie: function (value) {
        if ('D/A/H'.indexOf(value) >= 0) {
          this.type_0 += 1;
        } else if ('P/M'.indexOf(value) >= 0) {
          this.type_1 += 1;
        } else if ('T/L/N/B/U'.indexOf(value) >= 0) {
          this.type_2 += 1;
        }
      },
      dataBaseCharts: function (eleId, option) {
        const myChart = echarts.init(document.getElementById(eleId));
        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  .gene-information {
    margin-top: 20px;
  }

  .gene-information-title {
    font-size: 16px;
  }

  .gene-content {
    padding: 20px 50px;
  }

  .frequency-chart {
    width: 100%;
    height: 400px;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .mit-chart {
    height: 400px;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .dbSpiTitle{
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 2px;
  }
</style>
