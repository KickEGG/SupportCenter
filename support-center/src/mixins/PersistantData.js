// 用于保存数据属性到浏览器本地存储
export default function (id, fields) {
    return {
        watch: fields.reduce((obj, field) => {
            // 监听函数
            obj[field] = function (val) {
                // 存入localStorage
                console.log(field)
                console.log(val)
                localStorage.setItem(`${id}.${field}`, JSON.stringify(val))
            }
            return obj
        }, {}),
        methods: {
            saveAllPersistantData() {
                for (const field of fields) {
                    localStorage.setItem(`${id}.${field}`),
                        JSON.stringify(this.$data[field])
                }
            },
        },
        beforeDestory() {
            this.saveAllPersistantData()
        }, 
        created() {
            for (const field of fields) {
                const saveValue = localStorage.getItem(`${id}.${field}`)
                if (saveValue !== null) {
                    this.$data[field] = JSON.parse(saveValue)
                }
            }
        }
    }
}