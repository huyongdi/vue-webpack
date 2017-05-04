<template>
    <form class="form" id="form-search">
        <div class="form-group">
            <div class="col-md-2 col-sm-2 col-xs-3">
                <select v-model="queryType" class="form-control">
                    <option value="hpo">HPO</option>
                    <option value="omim">OMIM</option>
                    <option value="orphanet">ORPHANET</option>
                </select>
            </div>
            <div class="col-md-7 col-sm-6 col-xs-6" >
                <input @focus="swich_status(true)" v-model="queryContent" type="text" class="form-control" id="query" placeholder="请输入" autocomplete="off" />
                <ul v-if="isView" class="query-result list-group ">
                    <li v-if="isLoading" class="list-group-item">

                    </li>
                    <li v-else v-for="result in queryResults" class="list-group-item" @click="swich_status(false)">
                        <router-link :to="{ path: 'database', query: { type: queryType, search:result.hpoId }}">
                            {{ result.hpoId }} {{ result.name_cn }}({{ result.name_en }})
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-3">
                <button  class="btn btn-md btn-default">提交</button>
            </div>
        </div>
    </form>
</template>
<script>
    import config from '../../../config/config'
    export default {
        name: 'search',
        data: function(){
            return {
                queryType: this.$route.query.type ? this.$route.query.type : 'hpo',
                queryContent:this.$route.query.search ? this.$route.query.search : '',
                queryResults:[],
                isView:false,
                isLoading:false
            }
        },
        methods: {
            swich_status:function(isView){
                this.isView=isView
            },
            query:function () {
                let obj = this
                obj.isLoading = true
                this.$axios({
                    headers: {'Authorization': config.API.token},
                    method: "get",
                    url: config.API.url+"knowledge/"+obj.queryType+"/?query="+obj.queryContent,
                    data: {
                        query:obj.queryContent
                    },
                    responseType: 'json'
                }).then(function (response) {
                    obj.queryResults = response.data.results
                    //console.log(response.data.results)
                    obj.isLoading = false
                });
            }
        },
        watch: {
            queryContent: "query",
            $route:function(){
                this.queryContent=this.$route.query.search,
                this.queryContent=this.$route.query.search
            }

        }

    }
</script>

<style scoped>
#form-search .form-group > div{padding: 0px}
.query-result{
    background-color: #fff;
    position: absolute;
    z-index: 9999;
    width:100%;
}
.spinner {
  margin: 50px auto 0;
  width: 150px;
  text-align: center;
}
.spinner > div {
  width: 30px;
  height: 30px;
  background-color: #258dc1;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bounceDelay 1.4s infinite ease-in-out;
  animation: bounceDelay 1.4s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
@-webkit-keyframes bounceDelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0.0)
  }
  40% {
    -webkit-transform: scale(1.0)
  }
}
@keyframes bounceDelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  }
  40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
