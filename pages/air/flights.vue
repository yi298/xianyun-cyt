<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <!-- 航班列表 -->
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
          <!-- 列表分页 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsData.total"
            ></el-pagination>
          </div>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },

  data() {
    return {
      dataList: [], // 航班列表数据，用于循环flightsItem组件
      //航班总数据
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      // 分页
      pageIndex: 1, // 当前页数
      pageSize: 5, // 显示条数
      // 过滤器
      cacheFlightsData: {
        //储存一份数据，只会修改一次
        flights: [],
        info: {},
        options: {}
      }
    };
  },

  // 当前url参数发生变化时候会触发      (???未监听，也自动刷新)
  beforeRouteUpdate(to, from, next) {
    next();
    this.getData();
  },

  methods: {
    // 获取航班总数据
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        this.dataList = this.flightsData.flights;
        // 缓存一份新的列表数据数据，这个列表不会被修改
        // 而flightsData会被修改
        this.cacheFlightsData = { ...res.data };
        this.setDataList(); //
        console.log(this.flightsData, "总数据");
      });
    },

    // 设置dataList数据
    setDataList(arr) {
      console.log(arr, "1父组件接受的arr");
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.dataList = this.flightsData.flights.slice(start, end);

      // 如果有新数据，从第一页开始显示
      if (arr) {
        this.pageIndex = 1;
        this.flightsData.flights = arr;
        this.flightsData.total = arr.length;
        this.dataList = arr; //需要在datalist重新调用，返回的数据才能渲染到这里
      }
    },

    // 页面切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },
    // 页面切换时触发
    handleCurrentChange(value) {
      (this.pageIndex = value), this.setDataList();
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>