<template>
    <div class="home-bg">
        <div class="container  home-container">
            <div class="row">
                <div class="col-md-10 col-md-offset-2">
                    <form-search></form-search>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import search from './global/search'
    export default {
        name: 'Home',
        components:{
            'form-search':search
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home-container{
        padding-top: 400px;
    }
    .home-bg{
        width: 100%;
        height: 100%;
        background: url('../../static/images/bg.jpg') no-repeat center center fixed; background-size: cover;
    }
    
</style>
