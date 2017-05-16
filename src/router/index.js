import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Gene from '@/components/Gene'
import GeneDetail from '@/components/GeneDetail'
import Panel from '@/components/Panel'
import Login from '@/components/Login'
import PhenoType from '@/components/PhenotypeAna'
import GeneOmDetail from '@/components/GeneOmDetail'
import Mutate from '@/components/Mutate'
import MutateDetail from '@/components/MutateDetail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
    {
      path: '/geneOmDetail',
      name: 'geneOmDetail',
      component: GeneOmDetail
    },
    {
      path: '/panel',
      name: 'panel',
      component: Panel
    },
    {
      path: '/phenoType',
      name: 'phenoType',
      component: PhenoType
    },
    {
      path: '/mutate',
      name: 'mutate',
      component: Mutate
    },
    {
      path: '/mutateDetail',
      name: 'mutateDetail',
      component: MutateDetail
    },
  ]
})
