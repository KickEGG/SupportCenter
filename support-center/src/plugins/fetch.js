import state from '../state'
import router from '../router'

// 用于存储数据的变量，这里暂存baseUrl
let baseUrl

// 组件的构造函数
export default {
    install(Vue, options) {
        console.log('Installed!', options)
        // 插件选项
        baseUrl = options.baseUrl
        // 添加至Vue的原型
        Vue.prototype.$fetch = $fetch
    },
}

export async function $fetch(url, options) {
    // console.log('url!', url)
    const finalOptions = Object.assign({}, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }, options)

    const response = await fetch(`${baseUrl}${url}`, finalOptions)
    if (response.ok) {
        const data = await response.json()
        return data
    } else if (response.status === 403) {
        // 如果会话不再有效
        // 用户被登出
        state.user = null;
        // 如果这个路由是私有的
        // 我们跳转到登录页
        if (router.currentRoute.matched.some(r => r.meta.private)) {
            // 使用replace而不是push，是因为不想在浏览器记录中创建新的导航,这里使用后退是无法返回之前的私有页面的
            router.replace({
                name: 'login', params: {
                    wantedRoute: router.currentRoute.fullPath,
                }
            })
        }
    } else {
        const message = await response.text()
        const error = new Error(message)
        error.response = response
        throw error
    }
}