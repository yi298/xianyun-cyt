<template>
  <div class="container">
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- 菜单 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录注册 -->
      <div>
        <div v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
        </div>
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <!-- $axios.defaults.baseURL --ajax固定写法 -->
              <img
                :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                alt
              />
              {{ $store.state.user.userInfo.user.nickname }}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    // 清空store和本地存储
    handleLogout() {
      console.log("用户退出"); //组件里，点击事件需要加“.nactive”
      // 点击退出时调用的方法
      this.$store.commit("user/clearUserInfo");
      this.$message.success("退出成功"); // 弹框，退出成功
      this.$router.push('/user/login');//点击“退出”，退出成功时跳转
    }
  },

  mounted() {
    console.log(this.$store.state.user.userInfo.user.username);
  }
};
</script>
<style scoped lang="less">
.container {
  height: 60px;
  box-shadow: 0 3px 3px #ccc;
  position: relative;
}

.main {
  width: 1000px;
  margin: 0 auto;
  line-height: 60px;
}

.logo {
  margin-right: 20px;
  img {
    width: 165px;
    height: 42px;
    margin-top: 9px;
  }
}

.navs {
  flex: 1;
  a {
    display: block;
    height: 60px;
    box-sizing: border-box;
    padding: 0 20px;

    &:hover {
      color: #409eff;
      border-bottom: 5px #409eff solid;
    }
  }
  .nuxt-link-exact-active {
    //nuxt项目中使用了nuxt-link后，自动添加的class
    background: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}

.el-dropdown-link {
  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}
</style>