// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://biomeddb.zhu-ying.win:9999/';
axios.defaults.headers = {'X-USERNAME': localStorage.uname, 'X-PASSWORD': localStorage.password};
Vue.prototype.analyzeUrl = 'http://analyze.zhu-ying.win:9999/';

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});

