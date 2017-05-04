// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
})
//dsfsdfjsljfsldjflsdajfsldkjfsdfdsf 
/*
Vue.prototype.api = {}

    data:{
        api:{
            search:{
                url: 'https://api.omim.org/api/entry/search',
                limit: 20,
                start: 0,
                content: ''
                https://api.omim.org/api/entry/search?search=duchenne&start=0&limit=20&include=all&apiKey=dl_MyeVURpaFcDwQt5PucA&format=json
            }
        }
    }*/
