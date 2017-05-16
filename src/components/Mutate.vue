<template>
  <div class="right-content">
    <div class="locationShow">
      <div class="navTitle">
        <span class="gene-small"></span>
        <span class="navTitle-span">变异</span>
      </div>
      <div class="detailTitle">
        <span>您现在的位置：</span>
        <span>数据库</span>&nbsp;>&nbsp;<span id="database-title">变异</span>
      </div>
    </div>

    <div class="detailShow" id="geneList">

      <div class="searchBorder" id="search_gene">
        <input type="text" v-model="mutateInput" class="form-control input_hasImg" placeholder="11:119052976:C:T" @keyup.enter="onEnter">
        <button class="search-btn myBtn" @click="onEnter"></button>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
      data:function () {
        return{
            mutateInput:''
        }
      },
      methods:{
        onEnter:function () {
          if(!this.mutateInput){
            alert('变异位点不能为空')
          }else{
            this.$router.push({path: '/mutateDetail',query:{query:decodeURI(this.mutateInput)}})
          }
        }
      }
  }
</script>

<style scoped>
  .gene-small{
    float: left;
    width: 32px;
    height: 32px;
    background: url(../img/mutate-blue.png) no-repeat center;
    background-size: 100% 100%;
    margin-top: 5px;
  }
  .detailShow {
    background-color: #fff;
    padding: 20px;
  }

  .searchBorder {
    border: 1px solid #ccc;
    width: 460px;
    height: 45px;
    left: 50%;
    margin-left: -230px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .detailShow .input_hasImg {
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
</style>
