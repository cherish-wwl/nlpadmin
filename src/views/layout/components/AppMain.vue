<template>
  <section class="app-main" id="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      
      <keep-alive>
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  mounted(){
    var h = window.innerHeight;
    console.log(h)
    // document.getElementById("app-main").style.height = (h-120) +"px"
  }
}
</script>
<style>
  .app-main {
    padding: 15px;
    z-index: 0;
  }
</style>

