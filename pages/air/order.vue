<template>
  <!-- 订单首页 -->
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单列表 -->
      <OrderForm :data="infoData" />
      <!-- 侧边栏 -->
      <div class="asiide"></div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
export default {
  components: {
    OrderForm
  },

  data() {
    return {
      // 机票信息（初始化）
      infoData: {
        insurances: [] //保险数据
      }
    };
  },

  mounted() {
    // 获取保险数据
    // 获取机票数据 接口
    const { query } = this.$route; // const {id, seat_xid} = this.$route.query;
    this.$axios({
      url: `/airs/${query.id}`,
      params: {
        seat_xid:query.seat_xid
      }
    }).then(res => {
      console.log(res,'机票数据');
      this.infoData = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.aside {
  width: 350px;
  height: fit-content; //实现自身单独居中
  border: 1px #ddd solid;
}
</style>

