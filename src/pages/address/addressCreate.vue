<template>
  <div>
    <van-nav-bar title="添加地址栏" left-arrow @click-left="$router.back()" />
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import areaList from '@/assets/city/city.js'
import { createAddress } from '@/api'
export default {
  data() {
    return {
      areaList: {},
      addressList: {},
      searchResult: []
    }
  },
  created() {
    this.areaList = areaList
  },
  methods: {
    async onSave(res) {
      const params = {
        addressinfo: `${res.city}${res.province}${res.country}`,
        isdefault: res.isdefault,
        phone: res.tel,
        addressarea: res.addressDetail,
        sname: res.name
      }
      const { code } = await createAddress(params)
      if (code === 200) {
        this.$router.push('/addressList')
      }
    },
    onDelete() {
      this.$toast('delete')
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
