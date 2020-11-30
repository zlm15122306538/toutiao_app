import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入动态设置rem基准值模块
import 'amfe-flexible'
// 导入vant组件库
import Vant from 'vant'
// 导入vant组件样式
import 'vant/lib/index.css'
// 导入全局css样式
import './styles/index.less'
// 全局使用vant组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
