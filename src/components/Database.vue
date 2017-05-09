<template>
    <div class="container database-container">

        <div class="row">
            <div class="col-md-2 logo">
                <a href="#"><img src="../../static/images/logo.png" alt=""></a>
            </div>
            <div class="col-md-8">
                <form-search></form-search>
            </div>
        </div>
        <div v-if="isLoading" class="row">
            Now you see me
        </div>
        <div v-else v-for="result in searchResults" class="row">
                <div class="col-md-12">
                    <h4 class="text-waring">{{result.hpoId}}</h4>
                    <p>
                        主分类：<span v-for="ctg in result.category">{{ctg}}</span>
                        <a class="btn btn-default" target="_blank"  href="'http://compbio.charite.de/hpoweb/showterm?id='+result.hpoId">来源</a>
                        <a class="btn btn-default" target="_blank"  href="">相关条目</a>
                    </p>
                    <p>名称：{{result.name_en}}</p>
                    <p>翻译：{{result.name_cn}}</p>
                    <p>定义：{{result.definition_en}}</p>
                    <p>翻译：{{result.definition_cn}}</p>

                </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config/config'
    import search from './global/search'
    export default {
//        name: 'Database',
        components:{
            'form-search':search
        },
        data:function(){
            return {
                searchResults:[],
                searchType:"",
                searchContent:"",
                isLoading:true
            }
        },
        methods:{
            get_params:function(){
                this.searchType = this.$route.query.type
                this.searchContent = this.$route.query.search
                this.isLoading = true
            },
            pageContent:function(){
                //alert(this.$route.query.type)
                //alert(this.searchContent)
                this.get_params()
                let obj = this
                this.$axios({
                    headers: {'Authorization': config.API.token},
                    method: "get",
                    url: config.API.url+"knowledge/"+obj.searchType+"/?search="+obj.searchContent,
                    responseType: 'json'
                }).then(function (response) {
                    obj.searchResults = response.data.results
                    //console.log(response.data.results)
                    obj.isLoading = false
                });

            }
        },
        created:function(){
            this.pageContent()
        },
        watch:{
            $route:"pageContent"
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .database-container {margin: 54px;}
    .database-container .logo{
        line-height: 59px;

    }
</style>
