<template>
  <nav class="navBar">
    <div class="content">
      <div class="navbar-header">
        <a class="navbar-brand " href="../home/home.html">
          <span class="topNav-logo"></span>
        </a>
      </div>
      <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <p class="topNav-words navbar-left navbar-text">医学大数据平台<br>Medical Big Data Platform</p>
        </div>
        <div class="login-content">
          <span class="login-in" id="home_toLogin">
            <a :class="{'hide':this.uname}">登&nbsp;&nbsp;&nbsp;录</a>
            <a :class="{'hide':!this.uname}" @click="out">{{this.uname}}</a>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'header',
    data: function () {
      return {
        uname: ''
      }
    },
    created: function () {
      this.uname = localStorage.uname;
      if (!this.uname) {
        this.$router.push({path: '/login'})
      }
    },
    methods: {
      out: function () {
        if (confirm('确定要退出登录吗？')) {
          localStorage.removeItem('uname');
          localStorage.removeItem('password');
          this.$router.push({path: '/login'})
        }
      }
    }
  }
</script>

<style scoped>
  .navBar {
    height: 60px;
    text-align: center;
    width: 100%;
  }

  .topNav-logo {
    width: 204px;
    height: 29px;
    display: inline-block;
    background-size: 204px 29px;
    background: url(../../img/grandbox-logo.png) no-repeat center;
  }

  .navBar .navbar-header {
    margin: 0 0 0 25px;
  }

  .topNav-words {
    color: #777;
    line-height: 15px;
    min-width: 184px;
  }

  .login-in {
    width: 75px;
    display: inline-block;
    text-align: center;
    line-height: 60px;
    color: #707070;
    border-top: 3px solid #e5e5e5;
    cursor: pointer;
  }

  .login-in:hover {
    border-top: 3px solid #37a5d5;
  }

  .login-content {
    float: right;
    margin-right: 200px;
  }

  .content {
    margin-left: 56px;
    background-color: #e5e5e5;
  }

  .login-content a {
    text-decoration: none;
  }

</style>




