<template>
	<el-container class="app-wrapper" >
    <el-header class="navbar1">
      <header-temp></header-temp>
    </el-header>
    <el-container>
      <el-aside width="250px" :class="{hideSidebar:!sidebar.opened}">
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <div class="main-container">
          <navbar></navbar>
          <app-main :class="{hideleft:!sidebar.opened}"></app-main>
        </div>
      </el-main>
    </el-container>
  </el-container>


</template>

<script>
import { Navbar, Sidebar, AppMain, HeaderTemp } from '@/views/layout/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    HeaderTemp
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  mounted () {
     this.$store.dispatch('UpdateDictList').then((res)=>{})
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  // position: relative;
  height: 100%;
  width: 100%;
}
.hideleft{
  left: 0;
}
.navbar1{
  background-color: #304156;
}
.hideSidebar{
  display: none;
}
</style>
