<template>
  <div class="recommend">
    <div class="detail" ref="detailRef">
      <div class="detail-item" v-for="item in list" :key="item.id" @click="$router.push(`/detail/${item.id}`)">
        <van-skeleton avatar avatar-size="80px" row="3" :loading="skeletonLoading" avatar-shape="square">
          <img :src="item.img_url" alt="" />
          <div class="detail-name">{{ item.name }}</div>
          <div class="detail-price">{{ formatPrice(item.price) }}</div>
        </van-skeleton>
      </div>
    </div>

    <div class="back-top" @click="backTop"><van-icon name="arrow-up" /></div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      eventId: null,
      skeletonLoading: true
    }
  },
  mounted() {
    this.startScrollListern()
    this.skeletonLoading = false
  },
  destroyed() {
    removeEventListener('scroll', this.eventId)
  },
  methods: {
    backTop() {},
    startScrollListern() {
      this.eventId = addEventListener('scroll', e => {})
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
.recommend {
  background-color: #f8f9f9;
  padding-top: 2%;
  width: 100%;
}
.back-top {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
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
