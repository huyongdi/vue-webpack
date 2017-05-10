import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Gene from '@/components/Gene'
import GeneDetail from '@/components/GeneDetail'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/gene',
      name: 'gene',
      component: Gene
    },
    {
      path: '/geneDetail',
      name: 'geneDetail',
      component: GeneDetail
    },
  ]
})
