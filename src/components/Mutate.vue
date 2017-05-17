<template>
  <div class="right-content">
    <location imgClass="mutate-small" currentPage="变异"></location>

    <div class="detailShow" id="geneList">
      <div class="searchBorder" id="search_gene">
        <input type="text" v-model="mutateInput" class="form-control input_hasImg" placeholder="11:119052976:C:T"
               @keyup.enter="onEnter">
        <button class="search-btn myBtn" @click="onEnter"></button>
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
    data: function () {
      return {
        mutateInput: ''
      }
    },
    methods: {
      onEnter: function () {
        if (!this.mutateInput) {
          alert('变异位点不能为空')
        } else {
          this.$router.push({path: '/mutateDetail', query: {query: decodeURI(this.mutateInput)}})
        }
      }
    }
  }
</script>

<style scoped>
  .gene-small {
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
