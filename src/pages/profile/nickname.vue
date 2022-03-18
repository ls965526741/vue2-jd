<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      left-arrow
      right-text="确定"
      @click-left="$router.push('/userInfo')"
      @click-right="onClickRight"
    />
    <van-form ref="formRef" @submit="submit">
      <van-field
        v-model="nickname"
        autofocus
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :clearable="true"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/, message: '请保证用户名格式正确' }
        ]"
      />
    </van-form>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api'
export default {
  data() {
    return {
      nickname: ''
    }
  },
  mounted() {
    this.nickname = this.$route.query.nickname
  },
  methods: {
    onClickRight() {
      this.$refs.formRef.submit()
    },
    async submit() {
      const res = await updateUserInfo({ nickname: this.nickname })
      if (res.code === 200) {
        localStorage.setItem('userInfo', JSON.stringify(res.result))
        this.$router.push('/userInfo')
      } else {
        this.$toast.fail(res.message)
      }
    }
  }
}
</script>
