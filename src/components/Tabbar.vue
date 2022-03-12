<template>
  <van-tabbar v-model="active" :border="false">
    <van-tabbar-item :name="item.path" :to="item.path" v-for="item in tabberList" :key="item.path">
      <span>{{ item.title }}</span>
      <template #icon="props">
        <van-icon
          :name="item.icon"
          :class="[props.active ? 'icon-active-color' : '', item.title ? '' : 'icon-font-size']"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: '/home',
      tabberList: [
        {
          path: '/home',
          title: '首页',
          icon: 'wap-home-o'
        },
        {
          path: '/newProduct',
          title: '新品',
          icon: 'new-o'
        },
        {
          path: '/shopping',
          icon: 'shop-o'
        },
        {
          path: '/cart',
          title: '购物车',
          icon: 'cart-o'
        },
        {
          path: '/profile',
          title: '我的',
          icon: 'contact'
        }
      ]
    }
  },
  mounted() {
    const path = this.$route.path === '/' ? '/home' : this.$route.path
    this.active = `/${path.split('/')[1]}`
  }
}
</script>

<style lang="less" scoped>
.icon-active-color {
  background: -webkit-linear-gradient(left, #dd001b, #ff66cc);
  background: -o-linear-gradient(right, #dd001b, #ff66cc);
  background: -moz-linear-gradient(right, #dd001b, #ff66cc);
  background: linear-gradient(to right, #dd001b, #ff66cc);
  padding: 3px;
  border-radius: 50%;
  color: #fff;
}
.icon-font-size {
  font-size: 35px;
  padding: 8px;
}
span {
  user-select: none;
}
</style>
