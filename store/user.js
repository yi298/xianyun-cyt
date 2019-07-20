// nuxt已经把store（vuex）关联到应用，只需要维护各个模块，

/*  暴露三个属性：
state:存数据 、 mutations:同步设置修改state的数据 、 actions：异步设置修改state的数据*/
export const state = () => {
  return {
    userInfo: {
      token: "",
      user: {
        // nickname: "yi298"
      }
    }
  };
};
// mutations:同步设置修改state的数据    通过mutation修改state的数据
export const mutations = {
  // 设置用户数据
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  // 清除用户数据
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    };
  }
};

// actions：异步设置修改state的数据
export const actions = {
  // 负责登录的请求
  login({ commit }, data) {
    // 登录的接口
    this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    })
      .then(res => {
        // 把数据保存到 Vuex 里面，user是模块名字
        commit("setUserInfo", res.data);
        // alert("登录成功")
        // .then(() => {
        //   this.$message.success("登录成功"); // 弹框，登录成功   不会！！
        //   this.$router.push("/"); //点击“登录”，登录成功时跳转
        // });
      })
      .catch(error => {
        console.log(error, "请求失败");
      });
  },

  // 注册
  // register(){}

  // 发送手机验证码
  sendCode(store, phoneNumber) {
    return this.$axios({
      url: `/captchas`,
      method: "POST",
      data: {
        tel: phoneNumber
      }
    }).then(res => {
      const { code } = res.data;
      return code;
    });
  }
};
