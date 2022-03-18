<template>
  <div>
    <van-nav-bar title="用户登陆" left-arrow @click-left="clickLift" />
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
        <van-button round block type="danger" native-type="submit">登陆</van-button>
      </div>
    </van-form>
    <router-link class="go-register" to="/forgetPwd">忘记密码</router-link>
    <router-link class="go-register" to="/register">去注册</router-link>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      username: 'admin',
      password: '123123'
    }
  },
  methods: {
    async onSubmit() {
      const res = await login({ username: this.username, password: this.password })
      localStorage.setItem('id', res.user_id)
      console.log(res)
      if (res.code === 200) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('userInfo', JSON.stringify(res.result.user_info))
        this.$toast.success('登陆成功')
        const redirect = this.$route.query.redirect || '/home'
        this.$router.push(redirect)
      } else {
        this.$toast.fail(res.message)
      }
    },
    clickLift() {
      const redirect = this.$route.query.redirect
      if (redirect) {
        this.$router.push(redirect)
      } else {
        this.$router.back()
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
