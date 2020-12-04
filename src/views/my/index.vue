<template>
    <div class="my_container">
        <van-cell-group class="my_info" v-if="user">
          <van-cell
            title="单元格"
            value="内容"
            center
            class="base_info"
            :border="false"
          >
              <!-- <div slot="icon">头像</div> -->
              <van-image
                class="avatar"
                round
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                slot="icon" />
              <div slot="title" class="name">昵称</div>
              <van-button size="small" round class="update_btn">编辑资料</van-button>
          </van-cell>
          <van-grid :border="false" class="data-info">
          <van-grid-item text="文字" class="data-info-item">
              <div slot="text" class="text_wrap">
                  <div class="count">13</div>
                  <div class="text">头条</div>
              </div>
          </van-grid-item>
          <van-grid-item text="文字" class="data-info-item">
              <div slot="text" class="text_wrap">
                  <div class="count">101</div>
                  <div class="text">关注</div>
              </div>
          </van-grid-item>
          <van-grid-item text="文字" class="data-info-item">
              <div slot="text" class="text_wrap">
                  <div class="count">5000</div>
                  <div class="text">粉丝</div>
              </div>
          </van-grid-item>
          <van-grid-item text="文字" class="data-info-item">
             <div slot="text" class="text_wrap">
                 <div class="count">130005</div>
                 <div class="text">获赞</div>
             </div>
          </van-grid-item>
        </van-grid>
        </van-cell-group>
        <div class="not-login" v-else>
            <div @click="$router.push('/login')">
                <img class="mobile" src="./手机.png">
            </div>
            <div class="text">登录/注册</div>
        </div>
        <van-grid :column-num="2" class="nav-grid mb-4">
          <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" class="nav-grid-item" />
          <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" class="nav-grid-item" />
        </van-grid>
        <van-cell title="消息通知" is-link to="/" v-if="user" />
        <van-cell title="小智同学" is-link to="/" class="mb-4" />
        <van-cell class="logout" title="退出登录" v-if="user" @click="onLogout"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '../../api/user'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '确认退出登录吗？'
      })
        .then(() => { // 确认操作
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => { // 取消操作
          // on cancel
        })
    },
    async loadCurrentUser () {
      try {
        const { data: res } = await getCurrentUser()
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.loadCurrentUser()
  }
}
</script>

<style lang="less" scoped>
.my_container{
    .my_info{
        background: url('./banner.png') no-repeat;
        // 设置背景图填充模式
        background-size: cover;
        .base_info {
            box-sizing: border-box;
            height: 115px;
            background-color: unset;
            padding-top: 38px;
            padding-bottom: 11px;
            .avatar {
                box-sizing: border-box;
                width: 66px;
                height: 66px;
                border: 1px solid #fff;
                margin-right: 11px;
            }
            .name {
                font-size: 15px;
                color: #fff;
            }
            .update_btn {
                height: 16px;
                font-size: 10px;
                color: #666666;
            }
        }
        .data-info {
            .data-info-item {
                height: 65px;
                color: #fff;
                .text_wrap{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .count {
                      font-size: 18px;
                    }
                    .text {
                      font-size: 11px;
                    }
                }
            }
        }
        /deep/ .van-grid-item__content {
            background-color: unset;
        }
    }
    .not-login {
        height: 180px;
        background: url('./banner.png');
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .mobile {
            width: 66px;
            height: 66px;
        }
        .text {
            font-size: 14px;
            color: #fff;
        }
    }
    /deep/ .nav-grid {
            .nav-grid-item {
                height: 70px;
                 .toutiao {
                    font-size: 22px;
                }
                .toutiao-shoucang{
                    color: #eb5253;
                }
                .toutiao-lishi {
                    color: #ff9d1d;
                }
            }
        }
    .logout {
        text-align: center;
        color: #d86262;
    }
    .mb-4 {
       margin-bottom: 3px;
    }
}
</style>
