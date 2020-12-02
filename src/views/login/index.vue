<template>
    <div class="login_container">
        <!-- navbar导航栏 -->
        <van-nav-bar
          title="登录"
          left-text="返回"
          left-arrow
          @click-left="$router.back()"
        />
        <!-- 登录表单 -->
        <van-form
          @submit="onLogin"
          @failed="onFailed"
          :show-error="false"
          :show-error-message="false"
          :validate-first="true"
          ref="login-form"
        >·
        <van-field
          v-model="user.mobile"
          name="mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="请输入手机号码"
          clearable
          :rules="formRulses.mobile"
        />
        <van-field
          v-model="user.code"
          name="code"
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          clearable
          :rules="formRulses.code"
        >
          <template #button>
            <van-count-down
              :time="5*1000"
              format="ss 秒"
              v-if="isShowCount"
              @finish="isShowCount=false"
            />
            <van-button
            v-else
              size="small"
              round class="send_button"
              :loading="isLoading"
              @click.prevent="onSendSms"
            >
              发送验证码
            </van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button
            type="info"
            class="login-btn"
            block
          >
            登录
          </van-button>
        </div>
        </van-form>
    </div>
</template>

<script>
import { login, sendSms } from '../../api/user'
export default {
  name: 'login_index',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRulses: {
        mobile: [
          { required: true, message: '请填写手机号码' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isLoading: false,
      isShowCount: false
    }
  },
  methods: {
    async onLogin () {
      /* this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      }) */
      try {
        const { data: res } = await login(this.user)
        console.log(res)
        console.log('登录成功')
        /* this.$toast.sucess({
          message: '登录成功',
          position: 'top'
        }) */
        this.$toast.success({
          message: '登录成功',
          position: 'top'
        })
        this.$store.commit('setUser', res.data)
      } catch (error) {
        console.log('登录失败')
        this.$toast({
          message: '登录失败',
          position: 'top'
        })
        // console.dir(error.response.status)
        /* if (error.response.status === 400) {
          console.log('登录失败', error)
          this.$toast.fail({
            message: '登录失败',
            position: 'top'
          })
        } */
      }
    },
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast.fail({
          message: error.errors[0].message,
          position: top
        })
      }
    },
    async onSendSms () {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')
        this.isLoading = true
        // 校验通过发送手机验证码
        const res = await sendSms(this.user.mobile)
        console.log(res)
        // 短信发送成功，开始倒计时
        this.isShowCount = true
      } catch (error) {
        // console.log(error.message)
        console.dir(error.message)
        console.log(error.name)
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '发送太频繁，请稍后重试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: top
        })
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  .send_button{
    width: 80px;
    height: 23px;
    background-color: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
