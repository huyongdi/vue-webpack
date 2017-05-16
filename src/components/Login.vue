<template>
  <div class="login-all">
    <div class="login-all-z row">
      <div class="loginAndTitle col-md-4 col-md-offset-4">
        <div class="login-header">
          <img src="../img/login-logo.png">
          <img class="login-title" src="../img/login-title.png">
        </div>

        <div class="login-title-content row" id="login_content">
          <form class="form-horizontal" role="form" id="login_form">
            <input type='hidden' name='csrfmiddlewaretoken' value='' id="csrf"/>
            <div class="form-group">
              <label for="inputName" class="col-sm-2 control-label col-sm-offset-1">账号</label>
              <div class="col-sm-6">
                <input type="" name="username" class="form-control" id="inputName" v-model="inputName"
                       placeholder="请输入登录账号">
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="col-sm-2 control-label col-sm-offset-1">密码</label>
              <div class="col-sm-6">
                <input type="password" id="inputPassword" name="password" class="form-control" v-model="inputPassword"
                       placeholder="请输入登录密码">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                  <label>
                    <!--<input type="checkbox">记住密码-->
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-4 col-sm-4">
                <button type="submit" class="btn btn-default login-submit" @click.stop.prevent="login">登&nbsp;&nbsp;录
                </button>
              </div>
            </div>
          </form>
          <div id="getForm" class="hide">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        inputName: '',
        inputPassword: ''
      }
    },
    created: function () {
      if (localStorage.uname) {
        this.$router.go(-1);
      }
    },
    methods: {
      login: function () {
        const _vue = this;
        this.$axios({
          url: 'user/login/',
          method: 'post',
          data: {
            username: this.inputName,
            password: this.inputPassword
          }
        }).then(function () {
          localStorage.uname = _vue.inputName;
          localStorage.password = _vue.inputPassword;
          _vue.$router.go(-1);
        }).catch(function () {
          alert('用户名或密码错误')
        })
      }
    }
  }
</script>

<style scoped>
  .login-all {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    background: url("../img/login-bc.png");
  }

  .login-all-z {
    height: 100%;
    width: 100%;
    z-index: 10;
  }

  .loginAndTitle {
    margin-top: 100px;
  }

  .login-header img {
    display: block;
    margin: 0 auto;
  }

  .login-header .login-title {
    margin-top: 30px;
  }

  .login-all .login-title-content {
    background-color: #edf2f6;
    height: 310px;
    width: 100%;
    border-radius: 10px;
    padding: 50px 0 40px 0;
  }

  @media screen and (max-height: 1000px) {
    .login-all .login-title-content {
      margin: 100px 0 0 0;
    }

    .loginAndTitle {
      margin-top: 150px;
    }

  }

  @media screen and (max-height: 768px) {
    .login-all .login-title-content {
      margin: 80px 0 0 0;
    }

    .loginAndTitle {
      margin-top: 50px;
    }
  }

  .login-submit {
    color: #fff;
    border-radius: 4px;
    width: 158px;
    height: 35px;
    background: -webkit-linear-gradient(#75a5c6, #46689f); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#75a5c6, #46689f); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#75a5c6, #46689f); /* Firefox 3.6 - 15 */
    background: linear-gradient(#75a5c6, #46689f); /* 标准的语法 */
    display: inline-block;
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    margin: 0 auto;
  }

  .login-submit.active, .login-submit:active {
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125)
  }

  .login-submit:active {
    background-image: none;
    outline: 0;
    color: #333;
  }

  .login-create {
    cursor: pointer;
  }

  .login-create,
  .login-create:link,
  .login-create:visited,
  .login-create:hover,
  .login-create:active {
    text-decoration: none;
  }

</style>
