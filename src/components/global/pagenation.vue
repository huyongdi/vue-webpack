<template>
  <div class="text-center">
    <nav>
      <ul class="pagination">
        <!--上一页逻辑-->
        <li v-if='this.current == 1' class='disabled'><span class='color-a'>&laquo;上一页</span></li>
        <li v-else @click='this.current-- && goTo(this.current--)'><span class='color-a'>&laquo;上一页</span></li>
        <!--中间页码-->
        <li v-for="index in pages" @click="goTo(index)" :class="{'active':this.current == index}">
          <span class="po">{{index}}</span>
        </li>
        <!--下一页逻辑-->
        <li v-if="this.allPage == this.current || this.allPage == 0" class="disabled">
          <span class="">下一页&raquo;</span>
        </li>
        <li @click="this.current++ && goTo(this.current++)" class="po"
            :class="{'disabled':this.allPage == this.current || this.allPage == 0}">
          <span>下一页&raquo;</span></li>
        <!--跳转逻辑-->
        <li class="">
          <span class="color-a toPage">第
            <input v-model="this.beforeCurrent" @keyup.enter="goTo()">页/共{{this.allPage}}页</span>
        </li>
        我是current：{{current}}
        我是beforeCurrent：{{beforeCurrent}}
        我是count：{{count}}
        我是count：{{this.count}}
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    props: ['current', 'beforeCurrent', 'count'],
    data: function () {
//      return {
//        showItem: 10,
//        allPage: this.count?Math.ceil(this.count / 20):1,
//        current:1,
//        beforeCurrent:1,
//      }
    },
    methods: {
      goTo: function (page) {
        let index = this.beforeCurrent;
        if (index > this.allPage || !/^\d+$/.test(index)) {
          alert('请输入正确的页码！');
          return
        }
        this.current = page ? page : index;
        this.beforeCurrent = page ? page : this.beforeCurrent;
        this.geneAjax();
      }
    },
    computed: {
      allPage:function () {
        return this.count?Math.ceil(this.count / 20):1
      },
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
  }
</script>

<style scoped>
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
</style>
