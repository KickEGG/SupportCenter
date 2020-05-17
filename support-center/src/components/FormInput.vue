<template>
  <div class="row">
    <!-- @input="update" 监听字段输入的更新事件   -->
    <component
      :is="element"
      class="input"
      :class="inputClass"
      :name="name"
      :type="type"
      :value.prop="text"
      @input="update"
      :placeholder="placeholder"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String
    },
    invalid: {
      type: Boolean,
      default: false
    },
    text: {
      required: true
    }
  },
  model: {
    prop: "text",
    event: "update"
  },
  computed: {
    inputClass() {
      return {
        invalid: this.invalid
      };
    },
    element() {
      return this.type === "textarea" ? this.type : "input";
    }
  },
  methods: {
    update(event) {
      console.log(event.currentTarget.value);
      this.$emit("update", event.currentTarget.value);
    }
  }
};
</script>

<style>
</style>