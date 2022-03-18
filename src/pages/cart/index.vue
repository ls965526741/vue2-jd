<template>
  <div class="cart">
    <van-nav-bar :title="formatAddress" left-text="购物车" right-text="编辑" />
    <van-swipe-cell v-for="(item, index) in list" :key="item.goods_id">
      <div class="cart-content">
        <div class="checkbox" @click.capture.stop="clickClick(item)">
          <van-checkbox v-model="item.selected"></van-checkbox>
        </div>
        <van-card
          :num="item.goods_num"
          :price="formatUprice(item.good.uprice)"
          :origin-price="formatPrice(item.good.price)"
          :desc="item.good.detail"
          :title="item.good.name"
          :thumb="item.good.img_url"
        >
          <template template #footer>
            <van-stepper
              :value="item.goods_num"
              min="0"
              async-change
              @plus="changeNum(index, 'plus')"
              @minus="changeNum(index, 'minus')"
            />
          </template>
        </van-card>
      </div>
      <!-- 滑动模块，左滑动 -->
      <template #right>
        <van-button class="delete-button" square type="danger" text="删除" @click="removeList(item.goods_id)" />
      </template>
    </van-swipe-cell>

    <van-submit-bar decimal-length="2" :price="allPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">{{ checked ? '全选' : '全不选' }}</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { getCart, putCart, removeCart, getAddress, selectAll, addOrder } from '@/api'

export default {
  data() {
    return {
      list: [],
      checked: false,
      defaultAddress: {}
    }
  },
  created() {
    this.getList()
    this.getAddressList()
  },

  methods: {
    // 获取购物车列表
    async getList() {
      const res = await getCart()
      if (res.code === 200) {
        this.list = res.result
      }
    },
    // 获取默认地址
    async getAddressList() {
      const { code, result } = await getAddress()
      if (code === 200) {
        result.forEach(item => {
          if (item.isdefault === '1') {
            this.defaultAddress = item
          }
        })
      }
    },
    // 修改商品购买数量
    async putCart(params, index) {
      const res = await putCart(params)
      this.$toast.clear()
      if (res.code === 200) {
        this.list[index].goods_num = params.goods_num
      }
    },
    // 改变购物车数量
    changeNum(index, type) {
      this.$toast.loading({ forbidClick: true })
      const obj = this.list[index]
      const num = type === 'plus' ? obj.goods_num + 1 : obj.goods_num - 1
      const params = { goods_id: obj.goods_id, goods_num: num }
      this.putCart(params, index)
    },
    // 删除购物车
    async removeList(id) {
      const res = await removeCart({ goods_id: id })
      if (res.code === 200) {
        this.getList()
      }
    },
    // 点击提交订单按钮
    onSubmit() {
      this.$dialog
        .confirm({
          title: '提交订单',
          message: '确定要提交订单吗？'
        })
        .then(() => {
          this.addOrder()
        })
        .catch(() => {})
    },
    // 提交订单
    async addOrder() {
      const orderArr = []
      this.list.forEach(item => {
        if (item.goods_num !== 0 && item.selected) {
          const params = {
            goods_id: item.goods_id,
            price: item.good.uprice,
            count: item.goods_num,
            address_id: this.defaultAddress.id,
            flag: 'add_order',
            order_no: parseInt(Math.random() * 1000000000)
          }
          orderArr.push(params)
        }
      })
      const { code } = await addOrder(orderArr)
      if (code === 200) {
        this.$router.push('/order')
      }
    },
    // 全选 全不选
    async checkAll() {
      this.list.forEach(item => {
        item.selected = this.checked
      })
      await selectAll({ selected: this.checked })
    },
    // 单个商品是否选中
    async clickClick(good) {
      const res = await putCart({ goods_id: good.goods_id, selected: good.selected ? 0 : 1 })
      if (res.code === 200) {
        good.selected = !good.selected
      }
    }
  },
  computed: {
    // 格式化默认地址
    formatAddress() {
      const { addressarea, addressinfo } = this.defaultAddress
      return `配送至：${addressinfo || ''}${addressarea || ''}`
    },
    // 格式化商品价格
    formatPrice() {
      return price => {
        return parseInt(price || 0).toFixed(2)
      }
    },
    // 格式化打折后的商品价格
    formatUprice() {
      return price => {
        return parseInt(price || 0).toFixed(2)
      }
    },
    // 获取所有商品价格
    allPrice() {
      return this.list.reduce((a, b) => (b.selected ? a + b.good.uprice * b.goods_num : a), 0) * 100 || 0
    }
  },
  watch: {
    // 全选全不选
    list: {
      handler() {
        this.checked = this.list.some(item => item.selected)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: scroll;
  & /deep/ .van-nav-bar__title {
    font-size: 12px;
  }
  & /deep/.van-nav-bar__text {
    color: #000;
  }
  .cart-content {
    width: 100%;
    position: relative;
    .checkbox {
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
    }
    .van-card {
      box-sizing: border-box;
      padding-left: 30px;
    }
  }
  .delete-button {
    height: 100%;
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
