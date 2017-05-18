<template>
  <div class="right-content">
    <loading v-if="loading"></loading>
    <location imgClass="gene-small" currentPage="基因"></location>
    <!--点击基因名的单个基因信息-->
    <div class="detailShow" id="geneBasicDetail">
      <div class="gene-information" id="basicInfo">
        <span class="gene-information-title">基本信息</span>
        <div class="gene-content">
          <div class="row">
            <div class="col-md-3 font-12 myCol">
              <span>基因ID：</span>
              <span>{{geneData.geneId}}</span>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>基因名：</span>
              <span>{{geneData.symbol}}</span>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>同义名：</span>
              <span v-if="geneData.synonyms">{{geneData.synonyms.join('|')}}</span>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>常用转录本：</span>
              <span v-if="geneData.tags">{{geneData.tags.transcript}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 font-12 myCol">
              <span>mimNumber：</span>
              <span v-if="geneData.dbXrefs">{{geneData.dbXrefs.MIM}}</span>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>Panel：</span>
              <span v-for="singlePanel in geneData.panels">
                    <span v-if="singlePanel.panel">{{singlePanel.panel.name_cn}}({{singlePanel.panel.code}})</span>
              </span>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>位置：</span>
              <span v-if="geneData.location">{{geneData.location.loc}}</span>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>基因类型：</span>
              <span v-if="geneData.information">{{geneData.information.type}}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3 font-12 myCol">
              <span class="fl">数据库：</span>
              <div class="inline-block" v-if="geneData.dbXrefs">
                <div v-show="geneData.dbXrefs.MIM">MIM:{{geneData.dbXrefs.MIM}}</div>
                <div v-show="geneData.dbXrefs.Vega">Vega:{{geneData.dbXrefs.Vega}}</div>
                <div v-show="geneData.dbXrefs.HGNC">HGNC:{{geneData.dbXrefs.HGNC}}</div>
                <div v-show="geneData.dbXrefs.HPRD">HPRD:{{geneData.dbXrefs.HPRD}}</div>
                <div v-show="geneData.dbXrefs.Ensembl">Ensembl:{{geneData.dbXrefs.Ensembl}}</div>
              </div>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>印记基因：</span>
              <span v-if="geneData.tags">{{geneData.tags.isImprinted ? '是' : '否'}}</span>
            </div>
            <div class="col-md-3 font-12 myCol">
              <span>其他名称：</span>
              <span v-if="geneData.nomenclatureAuthoritys">{{geneData.nomenclatureAuthoritys.fullname}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="gene-information">
        <span class="gene-information-title">OMIM信息</span>
        <div v-for="omSingle in omimData">
          <div class="gene-content">
            <div class="row">
              <div class="col-md-6 font-12 myCol">
                <span>OMIM：</span>
                <span>{{omSingle.omim.titles.preferred}}{{omSingle.omim.mimNumber}}
                                            ({{omSingle.omim.prefix}}{{omSingle.omim.titles.preferred}})</span>
              </div>
              <div class="col-md-3 font-12 myCol">
                <span>中文标题：</span>
                <span>{{omSingle.omim.titles.chinese}}</span>
              </div>
            </div>
            <div class="row font-12 nopadding">
              <span>副标题：</span>
              <span v-for="altSingle in omSingle.omim.titles.alternative">{{altSingle}}</span>
            </div>
            <div class="pheno-list font-12">疾病信息:</div>
            <table class="table table-bordered font-12">
              <thead>
              <tr>
                <th>Location</th>
                <th>Phenotype</th>
                <th>Phenotype OMIM</th>
                <th>Inheritance</th>
                <th>操作</th>
              </tr>
              </thead>
              <tbody id="synopsis_table">
              <tr>
                <td>{{location}}</td>
                <td>{{omSingle.phenotype}}</td>
                <td>{{omSingle.omim.mimNumber}}</td>
                <td>
                  <div v-if="omSingle.inheritances.gene.length!=0">
                    <a class="po" data-toggle="tooltip" data-placement="top"
                       :data-original-title="omSingle.inheritances.gene.join(',')">{{omSingle.inheritances.gene_ab.join(',')}}</a>
                  </div>
                  <div v-else>
                    <a class="po" data-toggle="tooltip" data-placement="top"
                       :data-original-title="omSingle.inheritances.phenotype.join(',')">{{omSingle.inheritances.phenotype_ab.join(',')}}</a>
                  </div>
                </td>
                <td>
                  <a @click="showOmim" class="lookOmim">查看OMIM信息</a>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="panel panel-default detail_content hide">
              <div class="panel-heading">OMIM:{{omSingle.omim.mimNumber}}</div>
              <table class="table">
                <thead>
                <tr>
                  <th>#</th>
                  <th>ClinicalPhenotye</th>
                  <th>HPO</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="data in sortSyn(omSingle.omim.clinicalSynopsis)">
                  <td>{{data.name}}</td>
                  <td>
                    <div v-for="singleData in data">{{singleData.clinicalPhenotye}}</div>
                  </td>
                  <td>
                    <div v-for="singleData in data">
                      <span v-if="singleData.hpo">{{singleData.hpo}}({{singleData.hpoName}})</span>
                      <span v-else> - </span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
    name: 'geneDetail',
    data: function () {
      return {
        geneId: this.$route.query.geneId,
        omimData: [],
        geneData: '',
        location: '',
        loading: true,
        sortArr: ["inheritance", "growth", "growthHeight", "growthWeight", "growthOther",
          "headAndNeck", "headAndNeckHead", "headAndNeckFace", "headAndNeckEars", "headAndNeckEyes",
          "headAndNeckNose", "headAndNeckMouth", "headAndNeckTeeth", "headAndNeckNeck", "cardiovascular",
          "cardiovascularHeart", "cardiovascularVascular", "respiratory", "respiratoryNasopharynx", "respiratoryLarynx",
          "respiratoryAirways", "respiratoryLung", "chest", "chestExternalFeatures", "chestRibsSternumClaviclesAndScapulae", "chestBreasts",
          "chestDiaphragm", "abdomen", "abdomenExternalFeatures", "abdomenLiver", "abdomenPancreas", "abdomenBiliaryTract", "abdomenSpleen", "abdomenGastrointestinal", "genitourinary",
          "genitourinaryExternalGenitaliaMale",
          "genitourinaryExternalGenitaliaFemale",
          "genitourinaryInternalGenitaliaMale",
          "genitourinaryInternalGenitaliaFemale",
          "genitourinaryKidneys",
          "genitourinaryUreters",
          "genitourinaryBladder",
          "skeletal",
          "skeletalSkull",
          "skeletalSpine",
          "skeletalPelvis",
          "skeletalLimbs",
          "skeletalHands",
          "skeletalFeet",
          "skinNailsHair",
          "skinNailsHairSkin",
          "skinNailsHairSkinHistology",
          "skinNailsHairSkinElectronMicroscopy",
          "skinNailsHairNails",
          "skinNailsHairHair",
          "muscleSoftTissue",
          "neurologic",
          "neurologicCentralNervousSystem",
          "neurologicPeripheralNervousSystem",
          "neurologicBehavioralPsychiatricManifestations",
          "voice",
          "metabolicFeatures",
          "endocrineFeatures",
          "hematology",
          "immunology",
          "neoplasia",
          "prenatalManifestations",
          "prenatalManifestationsMovement",
          "prenatalManifestationsAmnioticFluid",
          "prenatalManifestationsPlacentaAndUmbilicalCord",
          "prenatalManifestationsMaternal",
          "prenatalManifestationsDelivery",
          "laboratoryAbnormalities",
          "miscellaneous",
          "molecularBasis",
        ]
      }
    },
    mounted: function () {
      const _vue = this;
      this.$axios({
        method: "get",
        url: 'knowledge/gene/' + this.geneId + '/',
      }).then(function (resp) {
        _vue.geneData = resp.data;
        _vue.location = resp.data.location.loc;
        const clinicalSynopsisArr = [];
        let count = 0; //记录后台clinicalSynopsis对象的属性个数
        $.each(resp.data.phenotypeMap, function (n1, data1) { //整个OMIM信息的数组
          $.each(data1.omim.clinicalSynopsis, function (n2, data2) { //疾病信息列表的值
            data2.name = n2;
            count += 1;
            $.each(data2, function (n3, data3) {
              if (data3.hpo) {
                _vue.$axios({
                  method: "get",
                  url: 'knowledge/hpo/' + data3.hpo + '/',
                }).then(function (resp) {
                  data3.hpoName = resp.data.titles.chinese;
                  if (n3 === data2.length-1) { //如果clinicalSynopsis对象某个属性遍历完了
                    clinicalSynopsisArr.push(data2);
                    if (clinicalSynopsisArr.length === count) { //如果clinicalSynopsis对象所有属性遍历完了
                      data1.omim.clinicalSynopsis = clinicalSynopsisArr;
                      _vue.omimData.push(data1);
                      _vue.loading = false;
                    }
                  }
                })
              } else {
                if (n3 === data2.length-1) { //如果clinicalSynopsis对象某个属性遍历完了
                  clinicalSynopsisArr.push(data2);
                  if (clinicalSynopsisArr.length === count) { //如果clinicalSynopsis对象所有属性遍历完了
                    data1.omim.clinicalSynopsis = clinicalSynopsisArr;
                    _vue.omimData.push(data1);
                    _vue.loading = false;
                  }
                }
              }
            })
          });
        });
      })
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    methods: {
      showOmim: function (event) {
        $(event.target).closest('table').next().slideToggle().removeClass('hide');
      },
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) {
          if (value.name === 'dateCreated') { //剔除数据
            return;
          }
          $.each(_vue.sortArr, function (k, data) {
            if (value.name === data) {
              value.code = k;
            }
          });
          arr.push(value)
        });
        arr = arr.sort(function (a, b) {
          return a.code - b.code
        });
        return arr
      }
    }
  }
</script>

<style scoped>
  /*单个基因页面样式*/
  .gene-small {
    float: left;
    width: 32px;
    height: 32px;
    background: url(../img/gene-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }

  .gene-information {
    margin: 20px 0;
  }

  .nopadding {
    padding: 0 15px;
  }

  .gene-information-title {
    font-size: 16px;
  }

  .gene-content {
    background-color: #fafafa;
    padding: 20px 50px;
  }

  .gene-content .myCol {
    margin: 5px 0;
  }

  #geneBasicDetail {
    min-height: 0;
  }

  .lookOmim {
    text-decoration: none;
    cursor: pointer;
  }

  .pheno-list {
    margin: 10px 0 5px 0;
  }
  .panel-default{
    font-size: 12px;
  }
</style>
