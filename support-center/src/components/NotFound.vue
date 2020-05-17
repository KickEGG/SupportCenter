<template>
  <main class="not-found">
    <h1>This page can't be found</h1>
    <p class="more-info">404</p>
    <div class="action">
      <router-link tag="button" :to="{name:'home'}">Return to home</router-link>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.more-info {
  text-align: center;
}
</style>