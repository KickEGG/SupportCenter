<template>
  <div class="app-layout" id="id">
    <header class="header">
      <div>
        <img class="img" src="../assets/logo.svg" />
      </div>
      <div>Support Center</div>
    </header>

    <!-- 导航菜单 -->
    <NavMenu />
    <!-- 菜单 路由器视图 -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";

export default {
  components: {
    NavMenu
  },
  name: "name"
};
</script>

<style lang="stylus">
@import '../style/main';
</style>


<style lang="stylus" scoped>
.header {
  .img {
    width: 64px;
    height: 64px;
  }
}
</style>