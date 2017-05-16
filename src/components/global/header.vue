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
        <div class="login-content dropdown">
          <span class="login-in dropdown-toggle" aria-haspopup="true" aria-expanded="true" data-toggle="dropdown" id="home_toLogin">
            <a :class="{'hide':this.uname}">登&nbsp;&nbsp;&nbsp;录</a>
            <a :class="{'hide':!this.uname}">{{this.uname}}</a>
          </span>
          <ul class="dropdown-menu" aria-labelledby="home_toLogin">
            <li><a href="#" @click.stop.prevent="out">退出登录</a></li>
            <!--<li><a href="#" @click.stop.prevent="changePassword">修改密码</a></li>-->
            <!--<li role="separator" class="divider"></li>-->
          </ul>
        </div>
      </div>

      <div class="modal fade" tabindex="-1" role="dialog" id="change">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">修改密码</h4>
            </div>
            <div class="modal-body">
              <p>One fine body&hellip;</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

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
      },
      changePassword:function () {
        $("#change").modal("show");
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

  .login-content:hover > .login-in{
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

  .modal{
    text-align: left;
  }
</style>




