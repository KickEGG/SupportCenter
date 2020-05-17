// resources是对象
export default function (resources) {
  return {
    // data() {
    //     console.log(resources);

    //     let initData = {
    //         remoteDataLoading: 0,
    //     }

    //     // initData = Object.keys(resources).map(key=>resources[key]);

    //     // // 初始化数据属性,不初始化，不会被vue添加响应式属性，也就不会再属性是被更新
    //     for (const key in resources) {
    //         initData[key] = null
    //         // console.log(initData[key]);
    //     }
    //     return initData
    // },
    data() {
      let initData = {
        // 布尔值，发出请求计数器加1,请求完成减1，为0时认为没有等待回复的请求
        remoteDataLoading: 0,
      }

      // Initialize data properties
      initData.remoteErrors = {}
      for (const key in resources) {
        initData[key] = null
        initData.remoteErrors[key] = null
      }

      return initData
    },
    // 方法区，获取资源并更新相应的数据属性 data指代了questionsList
    methods: {
      async fetchResource(key, url) {
        this.$data.remoteDataLoading++
        // 重置错误
        this.$data.remoteErrors[key] = null
        try {
          // 为$data数组添加键的值
          this.$data[key] = await this.$fetch(url)
        } catch (e) {
          this.$data.remoteErrors[key] = e
        }
        this.$data.remoteDataLoading--
      }
    },

    // 钩子 自动调用fetchResource
    created() {
      for (const key in resources) {
        let url = resources[key]
        // 如果值是一个函数，帧听它的结果
        if (typeof url === 'function') {
          this.$watch(url, (val) => {
            this.fetchResource(key, val)
          }, {
            // 在侦听值之前第一次调用fetchResource
            immediate: true,
          })
        } else {
          this.fetchResource(key, url)
        }
      }
    },
    // 计算属性，如果需要加载动画，=0时为true
    computed: {
      remoteDataBusy() {
        return this.$data.remoteDataLoading !== 0
      },
      hasRemoteErrors() {
        /*
         * js的Object.keys()方法，迭代检查是否存在错误
         * Object是Object构造函数,而keys()是它的一个方法,key()将返回一个列表;some()是对数组中每一项运行给定函数，如果该函数对任一项返回true，则返回true。
         */
        return Object.keys(this.$data.remoteErrors).some(
          key => this.$data.remoteErrors[key]
        )
      }
    },
  }

  // return {
  //     data() {
  //         return {
  //             // 统计当前正在加载请求的数量，以帮助显示加载动画
  //             remoteDataLoading: 0,
  //         }
  //     }
  // }
}