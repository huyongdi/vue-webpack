<template>
    <div id="app">
        <nav-header></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
    import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
    import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
    import header from './components/global/header'
    import footer from './components/global/footer'
    import API from '../config/config'
    export default {
        name: 'app',
        components:{
            'nav-header':header,
            'nav-footer':footer
        }
    }
    
</script>

<style>
/*     #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
html, body, #app{ width:100%; height:100%;}
</style>
