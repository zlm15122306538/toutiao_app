<template>
    <div class="layout_container">
        <!-- 子路由组件出口 -->
        <router-view></router-view>
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="comment-o" to="/query">问答</van-tabbar-item>
            <van-tabbar-item icon="video-o" to="/vedio">视频</van-tabbar-item>
            <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>

</style>
