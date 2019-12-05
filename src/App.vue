<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
  import MainTarBar from 'components/content/maintabbar/MainTarBar.vue'

  export default {
    name: 'app',
    components: {
      MainTarBar
    }
  }
</script>

<style scoped>
  @import "assets/css/base.css";

</style>
