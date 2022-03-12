<template>
  <div id="app">
    <router-view />
    <Tabbar v-show="$route.meta.tabBar" />
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
#app {
  height: calc(100vh - 50px);
  overflow-y: scroll;
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
