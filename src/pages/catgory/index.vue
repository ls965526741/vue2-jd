<template>
  <div class="catgory">
    <div class="header">
      <div class="header-left"><van-icon name="arrow-left" @click="$router.back()" /></div>
      <van-search v-model="keyword" shape="round" placeholder="请输入搜索关键词" />
      <div class="header-right"><van-icon name="scan" /></div>
    </div>
    <div class="main">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="item in list"
          :name="item.id"
          :key="item.id"
          :title="item.name"
          @click="sideBarChange(item.id)"
        />
      </van-sidebar>
      <div class="main-item">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
        >
          <goods-detail :list="detailList" />
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GoodsDetail from '@/components/GoodsDetail.vue'
import { getRecommend } from '@/api'
export default {
  name: 'Catgory',
  components: {
    GoodsDetail
  },
  data() {
    return {
      sideBarCurrentId: 0,
      activeKey: '',
      keyword: '',
      page: 1,
      size: 10,
      total: '',
      loading: false,
      finished: false,
      detailList: []
    }
  },
  created() {
    this.$store.dispatch('home/getCategory')
    this.getList()
  },
  computed: {
    ...mapState({ list: state => state.home.categoryList || [] })
  },
  methods: {
    sideBarChange(index) {
      if (this.sideBarCurrentId !== index) {
        this.detailList = []
        this.getList(index)
        this.sideBarCurrentId = index
      }
    },
    async getList(id = 3) {
      const { page, size } = this
      const { result } = await getRecommend({ id, page, size })
      const { count, rows } = result
      this.total = count
      this.detailList.push(...rows)
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
  }
}
</script>

<style lang="less" scoped>
.catgory {
  background-color: #f8f9f9;

  .header {
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-bottom: 5px;
    .header-left {
      padding: 0 5px;
    }
    .van-search {
      flex: 1;
      padding: 2px 0;
    }
    .header-right {
      padding: 0 5px;
    }
  }

  .main {
    display: flex;
    border-radius: 10px;
    background-color: #fff;
    height: calc(100vh - 43px);
    overflow-x: hidden;
    overflow-y: scroll;

    .van-sidebar {
      .van-sidebar-item {
        padding: 10px;
        & /deep/ .van-sidebar-item__text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
        }
      }
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }

    .van-sidebar-item--select::before {
      background-color: red;
      width: 8px;
      height: 8px;
      top: 20%;
      border-radius: 100% 0 0 0;
      z-index: 0;
    }

    .van-sidebar-item--select::after {
      background-color: #fff;
      position: absolute;
      top: 20%;
      left: 2px;
      width: 8px;
      height: 8px;
      border-radius: 100% 0 0 0;
      transform: translateY(-50%);
      content: '';
      z-index: 0;
    }

    .main-item {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      background-color: #f8f9f9;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  }
}
</style>
