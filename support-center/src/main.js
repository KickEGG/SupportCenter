// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import router from './router'
import 'babel-polyfill'
import VueRouter from 'vue-router'

import AppLayout from './components/AppLayout.vue'
// 引入全局组件 支持loading动画
import './global-components'
// 引入自定义插件
import VueFetch, { $fetch } from './plugins/fetch.js'
// 引入用户组件
import state from './state'
// 引入state插件
import VueState from './plugins/state.js'

import * as filters from "./filters"

Vue.use(VueRouter)
// 使用自定义插件
Vue.use(VueFetch, {
    baseUrl: 'http://localhost:3000/',
})
// 使用state插件
Vue.use(VueState, state)

// Vue.config.productionTip = false

async function main() {
    // 获取用户信息
    try {
        state.user = await $fetch("user")
    } catch (e) {
        console.warn(e)
    }
}

/* 根实例 */
new Vue({
    el: '#app',
    router,
    // VueRouter,
    // components: { App },
    // template: '<App />',
    // render: h=>h('div','Support center！！！'),
    render: h => h(AppLayout),
    data: state//这里引入用户对象，使其支持响应式
})

main()

for (const key in filters) {
    Vue.filter(key, filters[key])
}