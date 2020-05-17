<template>
  <!-- @submit.prevent 事件监听器 阻止浏览器的默认行为（提交后重新加载页面） -->
  <form @submit.prevent="submit">
    <section class="content">
      <h2>{{title}}</h2>
      <slot />
      <div class="actions">
        <slot name="actions" />
      </div>
      <div class="error" v-if="error">{{error}}</div>
    </section>

    <transition name="fade">
      <Loading v-if="busy" class="overlay" />
    </transition>
  </form>
</template>

<script>
export default {
  // 通过使用对象，执行props的更多细节
  props: {
    title: {
      type: String,
      required: true
    },
    operation: {
      type: Function,
      required: true
    },
    valid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      error: null, //错误消息
      busy: false //用于切换加载动画的显示
    };
  },
  methods: {
    // 表的的提交方法
    async submit() {
      if (this.valid && !this.busy) {
        this.error = null;
        this.busy = true;
        try {
          await this.operation();
        } catch (e) {
          this.error = e.message;
        }
        this.busy = false;
      }
    },
  }
};
</script>

<style>
</style>