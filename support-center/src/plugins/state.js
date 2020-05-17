export default {
    install(Vue, state) {
        Object.defineProperty(Vue.prototype, '$state', {
            // 将state对象传给getter返回
            get: () => state,
        })
    }
}