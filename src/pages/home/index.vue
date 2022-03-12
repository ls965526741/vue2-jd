<template>
  <div class="home">
    <search class="search" />
    <div class="tab">
      <van-tabs v-model="activeId" background="red" color="#fff" title-active-color="#fff" title-inactive-color="#fff">
        <van-tab
          v-for="item in categoryList"
          :name="item.category_id"
          :title="item.category_name"
          :key="item.category_id"
        >
        </van-tab>
      </van-tabs>
      <div class="classify" @click="$router.push('/catgory')"><van-icon name="eye-o" />分类</div>
    </div>
    <Recommend :id="activeId" />
  </div>
</template>

<script>
import Search from '@/components/Search'
import Recommend from './recommend.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Search,
    Recommend
  },
  data() {
    return {
      activeId: 34
    }
  },
  created() {
    this.$store.dispatch('home/getCategory')
  },
  methods: {},
  computed: {
    ...mapState({ categoryList: state => state.home.categoryList || [] })
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: red;
  padding-top: 38px;
  .search {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
  }
  .tab {
    position: relative;
    .classify {
      position: absolute;
      right: 0;
      top: 0;
      height: 44px;
      line-height: 44px;
      background-color: red;
      padding: 0 5px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
