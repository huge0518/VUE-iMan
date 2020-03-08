<template>
  <div class="register">
    <div class="app-logo">
      <div class="logo"></div>
    </div>

    <div>
      <van-cell-group>
        <van-field
          v-model="user.value"
          type="text"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="user.errorMessage"
          @input="validUsername()"
        />
        <van-field
          v-model="pwd1.value"
          :type="pwd1.type"
          label="密码"
          placeholder="请输入密码"
          :right-icon="pwd1.icon"
          :error-message="pwd1.errorMessage"
          @click-right-icon="checkPassword('pwd1')"
          @input="validPwd()"
        />
        <van-field
          v-model="pwd2.value"
          :type="pwd2.type"
          label="确认密码"
          placeholder="请输入确认密码"
          :right-icon="pwd2.icon"
          :error-message="pwd2.errorMessage"
          @click-right-icon="checkPassword('pwd2')"
          @input="validEqual(pwd1.value, pwd2.value)"
        />
      </van-cell-group>
      <div class="register-form">
        <van-button
          class="register-btn"
          :loading="isLoading"
          type="info"
          block
          loading-text="注册中..."
          text="注册"
          @click="register()"
          :disabled="!isValid"
        />
      </div>
      <div class="login">
        <router-link class="login-text" to="/login">已有账号？登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { validForm } from "../tool/validForm";

export default {
  name: "register",

  data() {
    return {
      //用户名
      user: {
        value: "",
        errorMessage: ""
      },

      //密码
      pwd1: {
        type: "password",
        value: "",
        icon: "closed-eye",
        errorMessage: ""
      },

      //确认密码
      pwd2: {
        type: "password",
        value: "",
        icon: "closed-eye",
        errorMessage: ""
      },

      //注册加载中
      isLoading: false,

      //控制注册按钮的状态
      isValid: false
    };
  },

  methods: {
    //验证用户名
    validUsername() {
      let isValid = validForm.validUsername(this.user.value);
      // this.$store.commit('registerModule/validUsername', isValid)
      this.user.errorMessage = isValid
        ? ""
        : "用户名支持4-8个(字母数字_)组合，必须字母开头";

        this.passForm()
    },

    //验证密码
    validPwd() {
      let isValid = validForm.validPwd(this.pwd1.value);
      this.pwd1.errorMessage = isValid
        ? ""
        : "密码支持6-16个(字母数字_)组合，必须含有大小写字母";

        this.passForm()
    },

    //查看密码
    checkPassword(key) {
      let isOpen = this[key].type === "password";
      this[key].type = isOpen ? "text" : "password";
      this[key].icon = isOpen ? "eye-o" : "closed-eye";
    },

    //验证两值相等
    validEqual(v1, v2) {
      let isValid = validForm.validEqual(v1, v2);

      this.pwd2.errorMessage = isValid ? "" : "两次密码不一致";

      this.passForm()
    },

    //passForm
    passForm() {
      this.isValid =
        this.user.errorMessage == "" &&
        this.user.value != "" &&
        this.pwd1.errorMessage == "" && this.pwd1.value != "" &&
        this.pwd2.errorMessage == "" && this.pwd2.value != "" &&
        this.pwd1.value == this.pwd2.value;
    },


    //注册
      register() {

        let self = this;

        //注册
        let randomTime = Math.random() * 5 * 1000;

        setTimeout(function () {

           //获取所有用户信息
          let users = localStorage.getItem('users');

          users = users ? JSON.parse(users) : [];

          

          //判断当前用户是否存在
          for (let i = 0; i < users.length; i++) {
            if (users[i].username == self.user.value) {
              self.$toast({
                duration: 2000,
                message: '该用户已存在'
              })
              return;
            }
          }

          self.$toast({
            duration: 2000,
            message: '注册成功'
          })


          let time = new Date().getTime();

          //记录用户信息
          let userInformation = {
            //用户名
            username: self.user.value,

            //密码
            pwd: self.pwd1.value,

            //注册时间
            time
          };

          //将当前用户信息推进users
          users.push(userInformation);

          //写入本地存储，模拟数据库
          localStorage.setItem('users', JSON.stringify(users));


          //跳转到登录页面
          self.$router.push({name: 'login'});

        }, randomTime)


      },
  }
};
</script>

<style lang="less" scoped>
.app-logo {
  height: 200px;
  position: relative;
  background: url("../assets/images/bg.jpeg");
  background-size: cover;
  .logo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    // transform: translate(-50%, -50%);
    background-color: #fff;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3);
  }
}
  .register-form {
    padding: 10px;
  }
  .register-btn {
    margin-top: 50px;
  }
  .login {
    margin-top: 20px;
    text-align: center;
  }
  .login-text {
    color: #666;
    text-align: center;

  }

</style>