<template>
  <div class="header">
    <div class="title">JD</div>
    <van-search v-model="keyword" shape="round" background="red" placeholder="请输入搜索关键词">
      <template #right-icon>
        <div class="search-right-icon">
          <van-icon name="cart-o" />
          <span>|</span>
          <van-icon name="bag-o" />
        </div>
      </template>
    </van-search>
    <div class="right"><van-icon name="chat-o" badge="9" /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: red;
  .title {
    color: #fff;
    padding: 0 5px;
  }
  .right {
    color: #fff;
    padding: 0 15px 0 5px;
    .van-icon {
      font-size: 20px;
    }
    .van-info {
      background-color: #fff;
      color: red;
    }
  }
  .van-search {
    flex: 1;
    padding: 2px;
    .van-search__content {
      background-color: #fff;
    }
    .search-right-icon {
      display: flex;
      span {
        color: rgba(0, 0, 0, 0.1);
        font-size: 16px;
      }
      .van-icon {
        padding-right: 5px;
        color: #000;
        font-size: 20px;
      }
    }
    .van-cell {
      color: red;
    }
  }
}
</style>
