<template>
  <!-- model:指定表单数据对象 -->
  <!-- ref:获取dom元素，用于表单验证 -->
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="手机号码"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="手机验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" v-model="form.checkPassword" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    // 确认密码
    const validatePass = (relu, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", // 登录用户名/手机
        password: "", // 登录密码
        checkPassword: "", // 确认密码
        nickname: "", // 昵称
        captcha: "" // 手机验证码
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 判断号码非空
      if (!this.form.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 判断号码格式
      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 发送请求验证码请求
      this.$axios({
        url: `/captchas`,
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`手模拟手机验证码为:${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    // 提交注册
    handleRegSubmit() {
      console.log(this.form, "提交注册");
      this.$refs["form"].validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;
          this.$axios({
            url: `/accounts/register`,
            method: "POST",
            data: props
          }).then(res => {
            console.log(res, data);
          });
          alert("提交注册请求成功");
        }
      });
      // this.$refs.form.validate(valid => {
      //   // 验证通过
      //   if (valid) {
      //     // 调用actions的登录方法
      //     this.$store.dispatch("user/login", this.form);
      //     console.log(this);
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

