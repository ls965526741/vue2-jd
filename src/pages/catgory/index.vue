<template>
  <div class="catgory">
    <div class="header">
      <div class="header-left"><van-icon name="arrow-left" /></div>
      <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
      <div class="header-right"><van-icon name="scan" /></div>
    </div>
    <div class="main">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
      <div>11</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.catgory {
  background-color: #f8f9f9;
  .header {
    display: flex;
    align-items: center;
    background-color: #fff;
    .header-left {
      padding: 0 5px;
    }
    .van-search {
      flex: 1;
      padding: 2px 0;
    }
    .header-right {
      padding: 0 5px;
    }
  }
  .main {
    display: flex;
    margin-top: 5px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
  }
}
</style>
