<template>
  <div class="right-content">
    <location imgClass="mutate-small" currentPage="变异"></location>
    <div class="detailShow">
      <search :inputValue='mutateInput' placeholder='11:119052976:C:T' @onEnter="onEnter"></search>
    </div>
  </div>
</template>

<script>
  import topLocation from './global/location'
  import search from './global/search.vue'
  export default {
    components: {
      'location': topLocation,
      'search': search,
    },
    data: function () {
      return {
        mutateInput: ''
      }
    },
    methods: {
      onEnter: function (data) {
        this.mutateInput = data;
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
  .detailShow {
    background-color: #fff;
    padding: 20px;
  }

  .searchBorder {
    left: 50%;
    margin-left: -230px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
