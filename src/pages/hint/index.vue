<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" />
    <div class="noLogin">
      <div>您还没登陆！请先登陆</div>
      <router-link :to="{ path: '/login', query: { redirect: $route.query.redirect } }">去登陆</router-link>
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.noLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 46px);
  div {
    margin-bottom: 10px;
  }
}
</style>
