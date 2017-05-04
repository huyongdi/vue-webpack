<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fuild">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    中文HPO
                </a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li role="presentation" class='active'><a href="#">搜索</a></li>
                    <li role="presentation"><a href="#">CHPO Wiki</a></li>
                    <li role="presentation"><a href="#">HPO官网</a></li>
                    <li role="presentation"><a href="#">下载</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        name: 'header'
    }
</script>

<style>
    .navbar-default{ background: #454545; margin:0px;}
    .navbar-nav > li{ padding-left: 25px}
    .navbar-default .navbar-brand{
        /* background-color: #454545;
        border-color: #343434; */
        padding-left: 50px;
        color:#fff;
    }
    .navbar-default .navbar-nav > li > a,
    .navbar-default .navbar-nav > li > a:hover, 
    .navbar-default .navbar-nav > li > a:focus, 
    .navbar-default .navbar-nav > li.active > a { background-color: #454545; color:#fff; border-bottom: solid 3px  #454545;}

    .navbar-default .navbar-nav > li.active > a, 
    .navbar-default .navbar-nav > li.active > a:hover, 
    .navbar-default .navbar-nav > li.active > a:focus { background-color: #454545; color:#fff; border-bottom-color: #fff }
    
    .navbar-default .navbar-nav > li.active > a, 
    .navbar-default .navbar-nav > li > a:hover, 
    .navbar-default .navbar-nav > li > a:focus{ border-bottom-color: #fff }
</style>




