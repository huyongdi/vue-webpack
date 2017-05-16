<template>
    <div class="right-content">

      <div class="locationShow">
        <div class="navTitle">
          <span class="database-small"></span>
          <span class="navTitle-span">变异详情</span>
        </div>
        <div class="detailTitle">
          <span>您现在的位置：</span>
          <span>数据库</span>&nbsp;>&nbsp;<span>变异详情</span>
        </div>
      </div>

     <!-- <div class="detailShow mutate" id="mutate">
        <div class="gene-information">
          <span class="gene-information-title">基本信息</span>
          <div class="gene-content">
            <div class="row myRow">
              <span>变异：</span>
              <span id="svnName"></span>
            </div>
          </div>
        </div>

        <div class="gene-information">
          <span class="gene-information-title">人群频率</span>
          <div class="gene-content">
            <div class="frequency-chart" id="frequency-chart"></div>
          </div>
        </div>

        <div class="gene-information hide" id="DBnsfp">
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
                  <thead>
                  <tr>
                    <td>Mcap</td>
                    <td><span>{{mitData.mcap.score?mitData.mcap.score:'-'}}</span></td>
                    <td><span>{{mitData.mcap.pred?mitData.mcap.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>SIFT</td>
                    <td><span>{{mitData.sift.score?mitData.sift.score:'-'}}</span></td>
                    <td><span>{{mitData.sift.pred?mitData.sift.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>Polyphen2_hdiv</td>
                    <td><span>{{mitData.po2.hdiv_score?mitData.po2.hdiv_score:'-'}}</span></td>
                    <td><span>{{mitData.po2.hdiv_pred?mitData.po2.hdiv_pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>Polyphen2_hvar</td>
                    <td><span>{{mitData.po2.hvar_score?mitData.po2.hvar_score:'-'}}</span></td>
                    <td><span>{{mitData.po2.hvar_pred?mitData.po2.hvar_pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>FATHMM</td>
                    <td><span>{{mitData.fathmm.score?mitData.fathmm.score:'-'}}</span></td>
                    <td><span>{{mitData.fathmm.pred?mitData.fathmm.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>GERP</td>
                    <td>{{mitData.gerp?mitData.gerp: '-' }}</td>
                    <td> -</td>
                  </tr>
                  <tr>
                    <td>Deafness</td>
                    <td>
                      {{deData?deData:'-'}}
                    </td>
                    <td> -</td>
                  </tr>
                  </thead>
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
                    <td><span>{{mitData.lrt.score?mitData.lrt.score:'-'}}</span></td>
                    <td><span>{{mitData.lrt.pred?mitData.lrt.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>PROVEAN</td>
                    <td><span>{{mitData.provean.score?mitData.provean.score:'-'}}</span></td>
                    <td><span>{{mitData.provean.pred?mitData.provean.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>MutationTaster</td>
                    <td><span>{{mitData.mutationtaster.score?mitData.mutationtaster.score:'-'}}</span></td>
                    <td><span>{{mitData.mutationtaster.pred?mitData.mutationtaster.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>MutationAssessor</td>
                    <td><span>{{mitData.mutationasseaaor.score?mitData.mutationasseaaor.score:'-'}}</span>
                    </td>
                    <td><span>{{mitData.mutationasseaaor.pred?mitData.mutationasseaaor.pred:'-'}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>MetaLR</td>
                    <td><span>{{mitData.fathmm.score?mitData.fathmm.score:'-'}}</span></td>
                    <td><span>{{mitData.fathmm.pred?mitData.fathmm.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>MetaSVM</td>
                    <td><span>{{mitData.metasvm.score?mitData.metasvm.score:'-'}}</span></td>
                    <td><span>{{mitData.metasvm.pred?mitData.metasvm.pred:'-'}}</span></td>
                  </tr>
                  <tr>
                    <td>REVEL</td>
                    <td>{{mitData.revel?mitData.revel:'-'}}</td>
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
                <td>snv_raw:&nbsp;<span v-if="hgmdData.snv_raw">{{hgmdData.snv_raw.chrom}}:{{hgmdData.snv_raw.start}}-{{hgmdData.snv_raw.end}}({{hgmdData.snv_raw.ref}}/{{hgmdData.snv_raw.alt}}){{hgmdData.snv_raw.strand}}</span>
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
                <td>EFIN_SP:&nbsp;&nbsp;<span v-if="MitimpactData.dbnsfp">
                                <span>{{MitimpactData.dbnsfp.EFIN_SP.score}}(score)</span>&nbsp;
                                <span>{{MitimpactData.dbnsfp.EFIN_SP.pred}}(pred)</span>
                            </span></td>
              </tr>
              <tr>
                <td>aa_change:&nbsp;{{MitomapData.aa_change}}</td>
                <td>ensemblId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ensemblId}}</span>
                </td>
                <td>EFIN_HD:&nbsp;&nbsp;<span v-if="MitimpactData.dbnsfp">
                                <span>{{MitimpactData.dbnsfp.EFIN_HD.score}}(score)</span>&nbsp;
                                <span>{{MitimpactData.dbnsfp.EFIN_HD.pred}}(pred)</span>
                            </span></td>
              </tr>
              <tr>
                <td>homo:&nbsp;{{MitomapData.homo}}</td>
                <td>ncbiId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ncbiId}}</span></td>
                <td>Polyphen2:&nbsp;&nbsp;<span v-if="MitimpactData.dbnsfp">
                                <span>{{MitimpactData.dbnsfp.Polyphen2.score}}(score)</span>&nbsp;
                                <span>{{MitimpactData.dbnsfp.Polyphen2.pred}}(pred)</span>
                            </span></td>
              </tr>
              <tr>
                <td>hete:&nbsp;{{MitomapData.hete}}</td>
                <td>symbol:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.symbol}}</span></td>
                <td>SIFT:&nbsp;&nbsp;<span v-if="MitimpactData.dbnsfp">
                                <span>{{MitimpactData.dbnsfp.SIFT.score}}(score)</span>&nbsp;
                                <span>{{MitimpactData.dbnsfp.SIFT.pred}}(pred)</span>
                            </span></td>
              </tr>
              <tr>
                <td>status:&nbsp;{{MitomapData.status}}</td>
                <td>aa_change:&nbsp;{{MitimpactData.aa_change}}</td>
                <td>FATHMM:&nbsp;&nbsp;<span v-if="MitimpactData.dbnsfp">
                                <span>{{MitimpactData.dbnsfp.FATHMM.score}}(score)</span>&nbsp;
                                <span>{{MitimpactData.dbnsfp.FATHMM.pred}}(pred)</span>
                            </span></td>
              </tr>
              <tr>
                <td>locus:&nbsp;{{MitomapData.locus}}</td>
                <td>disease:&nbsp;{{MitimpactData.disease}}</td>
                <td>PROVEAN:&nbsp;&nbsp;<span v-if="MitimpactData.dbnsfp">
                                <span>{{MitimpactData.dbnsfp.PROVEAN.score}}(score)</span>&nbsp;
                                <span>{{MitimpactData.dbnsfp.PROVEAN.pred}}(pred)</span>
                            </span></td>
              </tr>
              <tr>
                <td>disease:&nbsp;{{MitomapData.disease}}</td>
                <td>status:&nbsp;{{MitimpactData.status}}</td>
                <td>MutationAssessor:&nbsp;&nbsp;<span v-if="MitimpactData.dbnsfp">
                                <span>{{MitimpactData.dbnsfp.MutationAssessor.score}}(score)</span>&nbsp;
                                <span>{{MitimpactData.dbnsfp.MutationAssessor.pred}}(pred)</span>
                            </span></td>
                &lt;!&ndash;<td>entrez:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.entrez}}</span></td>&ndash;&gt;
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
              <<<<<<< HEAD
              <span class="col-lg-6">ada_score:{{dbData.ada_score}}</span>
              <span class="col-lg-6">rf_score:{{dbData.rf_score}}</span>
            </div>
            <div class="dbSpiTitle">Spidex</div>
            <div class="row">
              <span class="col-lg-6">max_tissue:{{spiData.max_tissue}}</span>
              <span class="col-lg-6">zscore:{{spiData.zscore}}</span>
              =======
              <span class="col-lg-6">ada_score:
                            <span v-if="dbData">{{dbData.ada_score?dbData.ada_score:' - '}}</span>
                            <span v-else=""> - </span>
                        </span>
              <span class="col-lg-6">rf_score:
                            <span v-if="dbData">{{dbData.rf_score?dbData.rf_score:'-'}}</span>
                            <span v-else=""> - </span>
                        </span>
            </div>
            <div class="dbSpiTitle">Spidex</div>
            <div class="row">
                        <span class="col-lg-6">max_tissue:
                            <span v-if="spiData">{{spiData.max_tissue?spiData.max_tissue:'-'}}</span>
                            <span v-else=""> - </span>
                        </span>
              <span class="col-lg-6">zscore:
                            <span v-if="spiData">{{spiData.zscore?spiData.zscore:'-'}}</span>
                            <span v-else=""> - </span>
                        </span>
              >>>>>>> tmp
            </div>
          </div>
        </div>

      </div>-->

    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
.database-small{
  float: left;
  width: 32px;
  height: 32px;
  background: url(../img/mutate-blue.png) no-repeat center;
  background-size: 100% 100%;
  margin-top: 5px;
}
</style>
