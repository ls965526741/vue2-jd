<template>
  <div class="home">
    <search class="search" />
    <div class="tab">
      <van-tabs
        v-model="activeId"
        background="red"
        color="#fff"
        title-active-color="#fff"
        title-inactive-color="#fff"
        @change="tabChange"
      >
        <van-tab v-for="item in categoryList" :name="item.id" :title="item.name" :key="item.id"> </van-tab>
      </van-tabs>
      <div class="classify" @click="$router.push('/catgory')"><van-icon name="eye-o" />分类</div>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <GoodsDetail :list="detailList" />
      </van-list>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import GoodsDetail from '@/components/GoodsDetail.vue'
import { mapState } from 'vuex'
import { getRecommend } from '@/api'

// import { getHome } from '@/api'

export default {
  name: 'Home',
  components: {
    Search,
    GoodsDetail
  },
  data() {
    return {
      activeId: 3,
      detailList: [],
      loading: false,
      finished: false,
      total: '',
      page: 1,
      size: 10
    }
  },
  created() {
    this.getList()
    this.$store.dispatch('home/getCategory')
  },
  methods: {
    async getList(id = 3) {
      const { page, size } = this
      const { result } = await getRecommend({ id, page, size })
      const { count, rows } = result
      this.total = count
      this.detailList.push(...rows)
    },
    tabChange(index) {
      this.detailList = []
      this.getList(index)
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
    }
  },
  computed: {
    ...mapState({ categoryList: state => state.home.categoryList || [] })
  }
}
</script>

<style lang="less" scoped>
.home {
  background-color: red;
  padding-top: 38px;
  margin-bottom: 50px;
  .search {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
  }
  .tab {
    position: relative;
    .navtab {
      & /deep/.van-tab--active {
        color: red;
      }
    }
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

  .main {
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    background-color: #f8f9f9;
  }
}
</style>
