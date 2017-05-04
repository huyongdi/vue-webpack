import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Database from '@/components/Database'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/database',
            name: 'database',
            component: Database
        }
    ]
})
