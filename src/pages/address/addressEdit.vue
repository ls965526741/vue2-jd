<template>
  <div>
    <van-nav-bar title="修改地址栏" left-arrow @click-left="$router.back()" />
    <van-address-edit
      :area-list="areaList"
      :address-info="addressList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import areaList from '@/assets/city/city.js'
import { putAddress, removeAddress } from '@/api'
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
    const addr = this.$route.query
    this.addressList = {
      tel: addr.tel,
      name: addr.name,
      addressDetail: addr.addressarea,
      city: '浙江省',
      province: '杭州市',
      county: '上城区'
    }
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
      const { code } = await putAddress(this.$route.query.id, params)
      if (code) {
        this.$router.push('/addressList')
      }
    },
    async onDelete() {
      const { code } = await removeAddress(this.$route.query.id)
      if (code === 200) {
        this.$router.push('/addressList')
      }
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
