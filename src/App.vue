<template>
  <div id="app">
    <div class="tab-router" v-if="$route.meta.tabBar">
      <router-view />
      <Tabbar />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
<script>
import Tabbar from '@/components/Tabbar'
export default {
  components: {
    Tabbar
  }
}
</script>

<style lang="less">
.tab-router {
  &::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #efefef;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: red;
  }
}
</style>
