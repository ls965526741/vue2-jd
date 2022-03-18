<template>
  <div class="profile">
    <div class="user-info">
      <div v-if="isLogin" class="is-login">
        <div class="user-img" @click="$router.push('/userInfo')">
          <img :src="userInfo.user_img" alt="" />
        </div>
        <div class="cente">
          <div class="user-name">
            <div @click="$router.push('/userInfo')">{{ userInfo.nickname }}</div>
          </div>
          <div class="integral">
            <span>京享值<i>111</i><van-icon name="arrow" /></span>
            <span>小白守护<i>222</i>分<van-icon name="arrow" /></span>
            <span>家庭号<van-icon name="arrow" /></span>
          </div>
        </div>
      </div>
      <div v-else class="no-login">
        <span @click="$router.push('/login')">登陆</span>
        <span>|</span>
        <span @click="$router.push('/register')">注册</span>
        <div>您还未登陆，请先登陆</div>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="订单" icon="location-o" @click="$router.push('/order')" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="收货地址管理" icon="location-o" @click="$router.push('/addressList')" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="购物车" icon="location-o" is-link @click="$router.push('/cart')" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="个人中心" icon="location-o" is-link @click="$router.push('/userInfo')" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="收藏" icon="location-o" is-link />
      <van-cell title="朋友圈" icon="location-o" is-link />
      <van-cell title="表情" icon="location-o" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="设置" icon="location-o" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      isLogin: false,
      userInfo: {}
    }
  },
  created() {
    this.getLogin()
  },
  methods: {
    async getLogin() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.isLogin = !!this.userInfo
    }
  }
}
</script>

<style lang="less" scoped>
.profile {
  background-color: #f8f9f9;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .user-info {
    width: 100%;
    padding: 50px 5px 5px 5px;
    box-sizing: border-box;
    height: 180px;
    background: url('/images/bg.jpg') no-repeat center;
    background-size: cover;
    .is-login {
      display: flex;
      .user-img {
        width: 60px;
        height: 60px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cente {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 5px;
        .user-name {
          font-size: 18px;
          div {
            width: 140px;
            white-space: normal;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .integral {
          font-size: 10px;
          span {
            padding-right: 8px;
          }
        }
      }
    }
    .no-login {
      span {
        padding-left: 5px;
      }
      div {
        font-size: 12px;
        padding-top: 5px;
      }
    }
  }
  .van-cell-group {
    margin-top: 5px;
  }
}
</style>
