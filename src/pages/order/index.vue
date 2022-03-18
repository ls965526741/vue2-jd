<template>
  <div>
    <van-nav-bar title="全部订单" left-arrow @click-left="$router.back()" />
    <div v-for="item in list" :key="item.id">
      <div class="good-cart">
        <div class="shop">
          <van-icon name="shop-collect-o" />
          <span>美丽的旗舰店</span>
          <van-icon name="arrow" />
        </div>
        <van-card
          :num="item.count"
          tag="新品"
          :price="item.price"
          :desc="item.good.detail"
          :title="item.good.name"
          :thumb="item.good.img_url"
        >
          <template #footer>
            <van-button size="mini" round>卖了换钱</van-button>
            <van-button size="mini" round>退还/售后</van-button>
            <van-button size="mini" type="danger" round>再买一次</van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrder } from '@/api'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { code, result } = await getOrder()
      if (code === 200) {
        this.list = result.rows
      }
    }
  }
}
</script>

<style lang="less" scoped>
.good-cart {
  background-color: #fafafa;
  padding-top: 5px;
  .shop {
    padding-left: 10px;
  }
  .van-card {
    padding-top: 0;
  }
}
</style>
