<template>
    <div class="right-content">
      <div class="locationShow">
        <div class="navTitle">
          <span class="gene-small"></span>
          <span class="navTitle-span">基因</span>
        </div>
        <div class="detailTitle">
          <span>您现在的位置：</span>
          <span>数据库</span>&nbsp;>&nbsp;<span id="database-title">基因</span>
        </div>
      </div>
     <!-- 点击基因名的单个基因信息
      <div class="detailShow" id="geneBasicDetail">
        <div class="gene-information" id="basicInfo">
          <span class="gene-information-title">基本信息</span>
          <div class="gene-content">
            <div class="row myRow">
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
                <span v-if="geneData.tags">
                                {{geneData.tags.transcript}}
                            </span>
              </div>
            </div>
            <div class="row myRow">
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
            <div class="row myRow">
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
                <span v-if="geneData.tags">{{geneData.tags.isImprinted?'是':'否'}}</span>
              </div>
              <div class="col-md-3 font-12 myCol">
                <span>其他名称：</span>
                <span v-if="geneData.nomenclatureAuthoritys">{{geneData.nomenclatureAuthoritys.fullname}}</span>
              </div>
            </div>
          </div>
        </div>
        &lt;!&ndash;<div v-for="gene in subPanel.genes">&ndash;&gt;
        &lt;!&ndash;&lt;!&ndash;<a href="../knowledge/gene.html" data-toggle="tooltip" data-placement="top" title="" v-bind:data-geneId="gene.geneId"&ndash;&gt;&ndash;&gt;
        &lt;!&ndash;<a  target="_blank" :href="'../knowledge/gene.html?query='+gene.geneId" data-toggle="tooltip" data-placement="top" title="" v-bind:data-geneId="gene.geneId"&ndash;&gt;
        &lt;!&ndash;v-bind:data-original-title="gene.synonymsTitle">&ndash;&gt;
        &lt;!&ndash;{{gene.symbol}}&ndash;&gt;
        &lt;!&ndash;</a>&ndash;&gt;
        &lt;!&ndash;</div>&ndash;&gt;

        <div id="omim_content" class="">
          <div class="gene-information">
            <span class="gene-information-title">OMIM信息</span>
            <div v-for="omSingle in omimData">
              <div class="gene-content">
                <div class="row myRow">
                  <div class="col-md-6 font-12 myCol">
                    <span>OMIM：</span>
                    &lt;!&ndash;<span>{{phenotypeSingle.disOmimData.prefix}}{{phenotypeSingle.disOmimData.mimNumber}}
                        ({{phenotypeSingle.disOmimData.prefix}}{{phenotypeSingle.disOmimData.preTitle}})</span>&ndash;&gt;
                    <span>{{omSingle.omim.titles.preferred}}{{omSingle.omim.mimNumber}}
                                        ({{omSingle.omim.prefix}}{{omSingle.omim.titles.preferred}})</span>
                  </div>
                  <div class="col-md-3 font-12 myCol">
                    <span>中文标题：</span>
                    <span>{{omSingle.omim.titles.chinese}}</span>
                  </div>
                </div>
                <div class="row font-12 myRow">
                  <span>副标题：</span>
                  &lt;!&ndash;<span>{{phenotypeSingle.disOmimData.preTitle}};{{phenotypeSingle.disOmimData.altTitle}}</span>&ndash;&gt;
                  <span v-for="altSingle in omSingle.omim.titles.alternative">
                                    {{altSingle}}
                                </span>
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
                        <a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="omSingle.inheritances.gene.join(',')">{{omSingle.inheritances.gene_ab.join(',')}}</a>
                      </div>
                      <div v-else>
                        <a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="omSingle.inheritances.phenotype.join(',')">{{omSingle.inheritances.phenotype_ab.join(',')}}</a>
                      </div>
                    </td>
                    <td>
                      <a @click="showOmim" class="lookOmim">查看OMIM信息</a>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div class="panel panel-default hide" id="detail_content">
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
                        <div  v-for="singleData in data">{{singleData.clinicalPhenotye}}
                        </div>
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

        <div class="spinner hide" id="loading_panelList">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>-->
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
