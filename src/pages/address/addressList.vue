<template>
  <div class="address-list">
    <van-nav-bar
      title="选择默认地址"
      right-text="确定"
      @click-right="setDefaultAddr"
      left-arrow
      @click-left="$router.back()"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="$router.push('/addressCreate')"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { getAddress, setDefaultAddr } from '@/api'
export default {
  data() {
    return {
      chosenAddressId: 2,
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { code, result } = await getAddress()
      if (code === 200) {
        result.forEach(item => {
          const obj = {
            id: item.id,
            name: item.sname,
            tel: item.phone,
            address: `${item.addressinfo} | ${item.addressarea}`,
            isDefault: !!(item.isdefault * 1),
            addressinfo: item.addressinfo,
            addressarea: item.addressarea
          }
          this.list.push(obj)
        })
      }
    },
    onEdit(item, index) {
      this.$router.push({ path: '/addressEdit', query: this.list[index] })
    },
    async setDefaultAddr() {
      console.log(this.chosenAddressId)
      const { code } = await setDefaultAddr(this.chosenAddressId)
      if (code === 200) {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.address-list {
  background-color: @my-bg-color;
}
</style>
