<template>
  <div class="user-info">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.push('/profile')" />
    <div class="content">
      <van-cell-group>
        <van-cell title="头像">
          <template #extra>
            <img @click="showAction = true" class="user-img" :src="userInfo.user_img" alt="" />
          </template>
        </van-cell>
        <van-cell
          title="昵称"
          @click="$router.push({ path: '/nickname', query: { nickname: userInfo.nickname } })"
          :value="userInfo.nickname"
          is-link
        />
        <van-cell title="性别" @click="showGender = true" :value="formatGender" is-link />
        <van-cell title="出生日期" @click="showBirthday = true" :value="formatBirthday" is-link />
      </van-cell-group>
    </div>
    <van-overlay :show="showCropper" @click="showCropper = false">
      <div class="wrapper" @click.stop></div>
    </van-overlay>
    <!-- 头像动作面板 -->
    <van-action-sheet v-model="showAction">
      <div class="action-photo">
        <div class="action-photo-itme" @click="showAction = false">拍照上传</div>
        <van-uploader :after-read="afterRead">
          <div class="action-photo-itme">本地上传</div>
        </van-uploader>
      </div>
      <div class="action-cancel" @click="showAction = false">取消</div>
    </van-action-sheet>
    <!-- 图片剪切 -->
    <div class="cropper" v-if="showCropper">
      <van-nav-bar right-text="完成" left-arrow @click-left="$router.push('/profile')" @click-right="shear" />
      <vueCropper
        ref="cropper"
        autoCrop
        canScale
        fixed
        :img="option.img"
        autoCropWidth="200"
        autoCropHeight="200"
        :outputSize="option.size"
        :outputType="option.outputType"
      ></vueCropper>
    </div>
    <!-- 性别动作面板 -->
    <van-action-sheet v-model="showGender">
      <van-picker
        title="修改性别"
        show-toolbar
        :columns="columns"
        @cancel="showGender = false"
        @confirm="onConfirmGender"
      />
    </van-action-sheet>
    <!-- 生日动作面板 -->
    <van-action-sheet v-model="showBirthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择出生日期"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthday = false"
        @confirm="onConfirmBirthday"
      />
    </van-action-sheet>
    <van-button type="danger" @click="logout">退出登陆</van-button>
  </div>
</template>

<script>
import { upload, updateUserInfo } from '@/api'
import { VueCropper } from 'vue-cropper'
import { formatDate } from '@/utils/common.js'
export default {
  name: 'UserInfo',
  components: {
    VueCropper
  },
  data() {
    return {
      userInfo: {},
      showAction: false,
      showGender: false,
      showBirthday: false,
      actions: [{ name: '拍照上传' }, { name: '本地上传' }],
      showCropper: false,
      index: 0,
      option: {
        img: '',
        size: 1,
        outputType: 'png'
      },
      columns: ['男', '女', '保密'],
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2021, 0, 17)
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    },
    onChange() {},
    // 头像动作面板
    onSelect({ name }) {
      if (name === '本地上传') {
      }
      this.showAction = false
    },
    // 读取图片
    async afterRead(file) {
      this.showAction = false
      this.option.img = file.content
      this.showCropper = true
    },
    // 完成剪切
    shear() {
      this.$refs.cropper.getCropBlob(async data => {
        const files = new window.File([data], 'file.png', { type: 'image/png' })
        this.showCropper = false
        this.userInfo.user_img = data
        const params = new FormData()
        params.append('file', files)
        const res = await upload(params)
        if (res.code === 200) {
          this.updateUserInfo({ user_img: res.result.img })
        }
      })
    },

    // 更新个人信息
    async updateUserInfo(userInfo, callback) {
      const result = await updateUserInfo(userInfo)
      if (result.code === 200) {
        this.userInfo = result.result
        localStorage.setItem('userInfo', JSON.stringify(result.result))
        callback && callback()
      }
    },
    // 修改性别
    onConfirmGender(val) {
      const arr = ['男', '女', '保密']
      const gender = arr.findIndex(item => item === val)
      this.updateUserInfo({ gender }, () => (this.showGender = false))
    },
    // 修改生日
    onConfirmBirthday(val) {
      const birthday = Date.parse(val)
      this.updateUserInfo({ birthday }, () => (this.showBirthday = false))
    },
    // 退出登陆
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed: {
    formatGender() {
      return ['男', '女', '保密'][this.userInfo.gender] || '保密'
    },
    formatBirthday() {
      return formatDate(new Date(this.userInfo.birthday * 1), 'yyyy-MM-dd')
    }
  },
  watch: {
    // 监听对象的某个属性
    'userInfo.birthday': {
      handler() {
        this.currentDate = new Date(this.userInfo.birthday * 1)
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  background-color: @my-bg-color;
  height: 100vh;

  .content {
    padding-top: 5px;
    .user-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .wrapper {
    width: 100%;
    height: 100vh;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-direction: column;
  }

  // 动作面板
  .van-action-sheet {
    background-color: #ccc;
    .action-photo {
      margin-bottom: 5px;
      .action-photo-itme {
        background-color: #fff;
        width: 100vw;
        height: 40px;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
        padding: 0 5px;
        border-bottom: 1px solid #ccc;
      }
    }
    .action-cancel {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
    }
  }

  .cropper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .van-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
