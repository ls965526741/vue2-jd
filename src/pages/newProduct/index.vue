<template>
  <div class="new-product">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiperList" :key="item.id"><img :src="item.image" alt="" /></van-swipe-item>
    </van-swipe>
    <van-sticky>
      <div class="title">今日新品</div>
      <div class="sort">
        <div>
          <span>综合排序</span>
          <van-icon name="arrow-down" v-show="addSynth" />
          <van-icon name="arrow-up" v-show="!addSynth" />
        </div>
        <div @click="onAddSale">
          <span>销量</span>
          <van-icon name="arrow-down" v-show="addSale" />
          <van-icon name="arrow-up" v-show="!addSale" />
        </div>
        <div>
          <span>价格</span>
          <van-icon name="arrow-down" v-show="addPrice" />
          <van-icon name="arrow-up" v-show="!addPrice" />
        </div>
      </div>
    </van-sticky>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
      <goods-detail :list="list" />
    </van-list>
  </div>
</template>

<script>
import { getGoods } from '@/api'
import GoodsDetail from '@/components/GoodsDetail.vue'
export default {
  components: {
    GoodsDetail
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      addSynth: true,
      addSale: true,
      addPrice: true,
      total: '',
      page: 1,
      size: 10,
      swiperList: [
        { image: '/images/l1.jpg', id: 1 },
        { image: '/images/l2.jpg', id: 2 },
        { image: '/images/l3.jpg', id: 3 },
        { image: '/images/l4.jpg', id: 4 },
        { image: '/images/l5.jpg', id: 5 },
        { image: '/images/l6.jpg', id: 6 },
        { image: '/images/l7.jpg', id: 7 },
        { image: '/images/l8.jpg', id: 8 }
      ]
    }
  },
  created() {
    this.getList()
  },

  methods: {
    async getList() {
      const { page, size } = this
      const { result } = await getGoods({ page, size })
      const { count, rows } = result
      this.list.push(...rows)
      this.total = count
    },
    async onLoad() {
      this.page++
      const { page, size, total } = this
      if ((page - 1) * size > total) {
        this.finished = true
      } else {
        await this.getList(this.activeId)
        this.loading = false
      }
    },
    onAddSale() {
      this.addSale = !this.addSale
      this.addSale ? this.list.sort((a, b) => a.price - b.price) : this.list.sort((a, b) => b.price - a.price)
    }
  }
}
</script>

<style lang="less" scoped>
.new-product {
  margin-bottom: 50px;
  background-color: #f8f9f9;
  .van-swipe {
    img {
      width: 100%;
    }
  }
  .sort {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 14px;
    background-color: #fff;
    div {
      text-align: center;
      flex: 1;
    }
  }
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #ccc;
    background-color: #fff;
    font-size: 20px;
  }
}
</style>
