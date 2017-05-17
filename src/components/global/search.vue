<template>
  <div class="searchBorder" id="search_gene">
    <input type="text" class="form-control input_hasImg" v-model="childValue" @keyup.enter="sendValue">
    <button class="search-btn myBtn" @click.stop="sendValue"></button>
  </div>
</template>

<script>
  export default {
    props: ['inputValue'],
    data: function () {
      return { childValue: this.inputValue }
    },
    methods: {
      sendValue: function () {
        this.$emit('onEnter',this.childValue) //函数名和父元素的@onEnter一致
      }
    }
  }
</script>

<style scoped>
  .searchBorder {
    border: 1px solid #ccc;
    width: 460px;
    height: 45px;
  }

  .searchBorder .input_hasImg {
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
    background: url(../../img/data-sreach-bc.png) no-repeat center;
    background-size: 36px 36px;
    margin: 0 0 2px 8px;
  }
</style>
