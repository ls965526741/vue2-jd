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
      <div>{{ goodsInfo.name }}</div>
      <div class="goods-price">
        <div class="goods-price-item">{{ formatPrice(goodsInfo.price) }}</div>
        <van-button type="danger" size="small">降价通知</van-button>
      </div>
    </div>
    <van-cell-group>
      <van-nav-bar title="店铺信息" />
      <van-cell title="店铺名" :value="goodsInfo.address" />
      <van-cell title="所在地" :value="goodsInfo.name" />
    </van-cell-group>
    <van-cell-group>
      <van-nav-bar title="商品详情" />
      <van-cell v-for="(item, index) in parameter" :key="index" :title="item[0]" :value="item[1]" />
    </van-cell-group>
    <!-- 底部导航栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" @click="$router.push('/cart')" text="购物车" :badge="cartCount" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" @click="show = true" text="加入购物车" />
      <van-goods-action-button type="danger" @click="show = true" text="立即购买" />
    </van-goods-action>
    <div style="height: 50px"></div>
    <!-- 选择商品属性弹出框 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import { getDetail, addCart, getCart } from '@/api'
export default {
  data() {
    return {
      swiperList: [],
      goodsInfo: [],
      parameter: [],
      cartList: [],
      show: false,
      sku: {
        tree: [],
        list: [],
        price: '', // 默认价格（单位元）
        stock_num: '', // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {},
      goodsId: 1
    }
  },
  created() {
    this.getList()
    this.getCart()
  },
  methods: {
    // 获取商品详情
    async getList() {
      const res = await getDetail({ id: this.$route.params.id })
      const { images, goods } = res.result
      this.swiperList = images
      this.initSkuList(goods)
      this.goodsInfo = { ...goods, ...goods.shop_info }
      this.parameter = this.goodsInfo.detail
        .trim()
        .split('\n')
        .filter(item => item)
        .map(item => item.split(':'))
    },

    // 获取购物车
    async getCart() {
      const { result } = await getCart()
      this.cartList = result
    },

    // 初始化sku数据
    initSkuList(goods) {
      this.goods.picture = goods.img_url
      this.sku.price = goods.price
      this.sku.stock_num = goods.comment_num
      const attr = [
        { title: '颜色', name: 'color', attr: ['红色', '绿色', '蓝色', '白色', '黄色', '军绿色'] },
        { title: '大小', name: 'size', attr: ['36', '37', '38', '39', '40', '41'] }
      ]
      const tree = []
      const list = []
      attr.forEach((item, index) => {
        const treeList = {
          k: item.title,
          k_s: item.name,
          v: []
        }
        item.attr.forEach((item1, index1) => {
          const arr = {
            id: index1 + '',
            name: item1
          }
          treeList.v.push(arr)
        })
        tree.push(treeList)
      })
      attr[0].attr.forEach((item, index) => {
        attr[1].attr.forEach((item1, index1) => {
          const listItem = {
            id: ((index + '').padStart(2, '0') + (index1 + '').padStart(2, '0')) * 1,
            [attr[0].name]: index + '',
            [attr[1].name]: index1 + '',
            price: 255 * 100,
            stock_num: 80
          }
          list.push(listItem)
        })
      })
      this.sku.list = list
      this.sku.tree = tree
    },
    onBuyClicked() {
      this.$router.push('/cart')
    },

    // 加入购物车
    async onAddCartClicked(args) {
      const token = localStorage.getItem('token')
      if (!token) {
        return this.$dialog
          .confirm({
            title: '你还未登陆',
            message: '是否前往登陆'
          })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {})
      } else {
        const res = await addCart({ goods_id: this.$route.params.id })
        if (res.code === 200) {
          this.show = false
          this.$dialog
            .confirm({
              title: '添加商品成功',
              message: '是否前往购物车'
            })
            .then(() => {
              this.$router.push('/cart')
            })
            .catch(() => {})
        }
      }
    }
  },
  computed: {
    // 格式化价格
    formatPrice() {
      return price => {
        return `￥${parseInt(price || 0).toFixed(2)}`
      }
    },
    // 格式化购物车数量
    cartCount() {
      return this.cartList.reduce((a, b) => a + b.goods_num, 0)
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
.van-goods-action {
  z-index: 10;
}
</style>
