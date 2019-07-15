<template>
  <!-- model:指定表单数据对象 -->
  <!-- ref:获取dom元素，用于表单验证 -->
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名、手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-form-item>
      <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      this.$refs.form.validate(valid => {
        // 验证通过
        if (valid) {
          // 调用actions的登录方法
          this.$store.dispatch("user/login", this.form);
          console.log(this);
        }
      });
      // if (this.status == 200) {
      //   this.$message.success("登录成功"); // 弹框，登录成功   不会！！
      // }
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>

