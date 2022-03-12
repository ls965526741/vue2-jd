<template>
  <div class="detail">
    <div class="header">
      <van-nav-bar title="商品详情" :border="false" left-arrow @click-left="$router.back()">
        <template #left>
          <van-icon name="arrow-left" />
        </template>
        <template #right>
          <div class="header-right-icon">
            <van-icon name="revoke" />
            <van-icon name="ellipsis" />
          </div>
        </template>
      </van-nav-bar>
    </div>
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="red">
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <img class="goods-img" :src="item.image_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="goods-info">
      <div>{{ goodsInfo.product_name }}</div>
      <div class="goods-price">
        <div class="goods-price-item">{{ formatPrice(goodsInfo.product_price) }}</div>
        <van-button type="danger" size="small">降价通知</van-button>
      </div>
    </div>
    <van-cell-group>
      <van-cell v-for="(item, index) in parameter" :key="index" :title="item[0]" :value="item[1]" />
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { getDetail } from '@/api'
export default {
  data() {
    return {
      swiperList: [],
      goodsInfo: [],
      parameter: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const [swiperList, arr] = await getDetail({ mId: this.$route.params.id })
      this.swiperList = swiperList
      this.goodsInfo = arr[0]
      this.parameter = this.goodsInfo.product_detail
        .trim()
        .split('\n')
        .filter(item => item)
        .map(item => item.split(':'))
    }
  },
  computed: {
    formatPrice() {
      return price => {
        return `￥${parseInt(price).toFixed(2)}`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  background-color: #f6f7f7;
  padding-bottom: 5px;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    .van-nav-bar {
      background-color: transparent;
      .van-icon {
        background-color: rgba(0, 0, 0, 0.2);
        color: #fff;
        border-radius: 50%;
        padding: 5px;
        font-size: 16px;
      }
      .header-right-icon {
        .van-icon {
          margin-left: 5px;
        }
      }
    }
  }

  .goods-img {
    width: 100%;
  }
  .goods-info {
    border-radius: 10px;
    background-color: #fff;
    margin: 5px;
    padding: 5px;
    .goods-price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .goods-price-item {
        color: red;
        padding: 5px 0;
        font-size: 14px;
      }
    }
  }
  .van-cell-group {
    border-radius: 10px;
    background-color: #fff;
    margin: 5px;
    overflow: hidden;
  }
}
</style>
