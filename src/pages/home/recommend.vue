<template>
  <div class="recommend">
    <div class="detail">
      <div
        class="detail-item"
        v-for="item in list"
        :key="item.product_id"
        @click="$router.push(`/detail/${item.product_id}`)"
      >
        <img :src="item.product_img_url" alt="" />
        <div class="detail-name">{{ item.product_name }}</div>
        <div class="detail-price">{{ formatPrice(item.product_price) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoods } from '@/api'
export default {
  props: ['id'],
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.list = await getGoods({ mId: this.id })
    }
  },
  computed: {
    formatPrice() {
      return price => {
        return `￥${parseInt(price).toFixed(2)}`
      }
    }
  },
  watch: {
    id() {
      this.list = []
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.recommend {
  background-color: #f8f9f9;
  border-radius: 10px 10px 0 0;
  padding-top: 2%;
}
.detail {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 2%;

  .detail-item {
    width: 49%;
    border-radius: 10px;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 2%;
    img {
      width: 100%;
    }
    .detail-name {
      font-size: 14px;
      margin: 0 5px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .detail-price {
      color: red;
      padding: 5px;
    }
  }
}
</style>
