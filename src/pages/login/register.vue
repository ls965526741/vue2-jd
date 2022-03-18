<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        autofocus
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/, message: '请保证用户名格式正确' }
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^(\w){6,20}$/, message: '请保证密码格式正确' }
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="danger" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <router-link class="go-register" to="/login">去登陆</router-link>
  </div>
</template>

<script>
import { register } from '@/api'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit() {
      const res = await register({ username: this.username, password: this.password })
      if (res.code === 200) {
        this.$dialog
          .confirm({
            title: '是否跳转到登录页！',
            message: '确认后将跳转到登录页'
          })
          .then(() => {
            this.$router.push('/login')
          })
      }
      if (res.code === 400) {
        this.$toast.success(res.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.go-register {
  display: block;
  direction: rtl;
  padding: 5px;
  font-size: 12px;
  color: #ccc;
}
</style>
