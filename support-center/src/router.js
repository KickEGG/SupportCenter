// 页面组件配置
import Vue from 'vue'
import vueRouter from 'vue-router'
import state from './state'

import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Login from './components/Login.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import Tickets from './components/Tickets.vue'
import NewTicket from './components/NewTicket.vue'
import Ticket from './components/Ticket.vue'
import VueRouter from 'vue-router'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/faq', name: 'faq', component: FAQ },
    { path: '/login', name: 'login', component: Login },
    // 测试时 关闭 登陆判断 private: true -> false 
    {
        path: '/tickets', component: TicketsLayout, meta: { private: true }, children: [
            { path: '', name: 'tickets', component: Tickets },// 这里的path为空串
            { path: 'new', name: 'new-ticket', component: NewTicket },
            { path: ':id', name: 'ticket', component: Ticket, props: true },
            // { path: ':id', name: 'ticket', component: Ticket, props: route => ({ id: route.params.id }) },
        ]
    },
    // 必须要放在末尾，确保所有合法路由在所有的路由未匹配时才被其路由
    { path: '*', component: NotFound },
]

const router = new vueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { selector: to.hash }
        }
        return { x: 0, y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    console.log('to', to.name)
    // if (to.meta.private && !state.user) {
    if (to.matched.some(r => r.meta.private) && !state.user) {
        // 重定向到登录
        next({
            name: "login", params: {
                wantedRoute: to.fullPath
            }
        })
        return
    }
    // if (to.meta.guest && state.user) {
    if (to.matched.some(r => r.meta.guest) && !state.user) {
        next({ name: "home" })
        return
    }
    next()
})

export default router