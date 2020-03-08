<template>
  <div class="login">
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
          @input=" validPwd()"
        />
      </van-cell-group>
      <div class="register-form">
        <van-button
          class="register-btn"
          :loading="isLoading"
          type="info"
          block
          loading-text="登录中..."
          text="登录"
          @click="login()"
          :disabled="!isValid"
        />
      </div>
      <div class="login">
        <router-link class="login-text" to="/register">没有账号？注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { validForm } from "../tool/validForm";

export default {
  name: "login",
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

      //登录加载中
      isLoading: false,

      //控制登录按钮的状态
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

      this.passForm();
    },

    //验证密码
    validPwd() {
      let isValid = validForm.validPwd(this.pwd1.value);
      this.pwd1.errorMessage = isValid
        ? ""
        : "密码支持6-16个(字母数字_)组合，必须含有大小写字母";

      this.passForm();
    },

    //查看密码
    checkPassword(key) {
      let isOpen = this[key].type === "password";
      this[key].type = isOpen ? "text" : "password";
      this[key].icon = isOpen ? "eye-o" : "closed-eye";
    },

    //passForm
    passForm() {
      this.isValid =
        this.user.errorMessage == "" &&
        this.user.value != "" &&
        this.pwd1.errorMessage == "" &&
        this.pwd1.value != "";
    },

    //登录
    login() {
      this.isLoading = true;

      let randomTime = Math.random() * 5 * 1000;

      setTimeout(() => {
        //获取所有用户
        let users = localStorage.getItem("users");

        users = users ? JSON.parse(users) : [];

        if (users.length === 0) {
          this.$toast({
            duration: 2000,
            message: "该用户不存在"
          });
          this.isLoading = false;
          return;
        }

        //查找用户
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == this.user.value) {
            //如果该用户存在
            //匹配密码
            if (users[i].pwd == this.pwd1.value) {
              this.$toast({
                duration: 2000,
                message: "登录成功"
              });
              this.isLoading = false;

              //跳转到首页
              //记录用户登录状态
              let user = {
                isLogin: true,
                username: this.user.value
              };

              localStorage.setItem("user", JSON.stringify(user));

              return this.$router.push({ name: "home" });
            } else {
              this.$toast({
                duration: 2000,
                message: "用户名或者密码不正确"
              });
              this.isLoading = false;
              return;
            }
          }
        }

        //用户不存在
        this.$toast({
          duration: 2000,
          message: "该用户不存在"
        });
        this.isLoading = false;
      }, randomTime);
    }
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
}
</style>