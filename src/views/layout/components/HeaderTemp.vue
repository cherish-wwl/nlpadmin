<template>
    <div> 
        <el-menu class="navbar navbar1 navbar2" mode="horizontal">
   
            <img class='logo' src='../../../assets/logo.png'/>
            <span class='logo_title'>中文信息深度处理开放创新平台</span>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
                    <img class="user-avatar" src="../../../assets/nlp_head2.jpg">
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class="inlineBlock" to="/">
                        <el-dropdown-item>
                            Home
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span @click="logout" style="display:block;">LogOut</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
    //   'sidebar',
      'avatar'
    ])
  },
  methods: {
    
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    border-bottom: none !important; 
  .logo{
    vertical-align: sub;
  }
  .logo_title{
    color: #ffffff;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.navbar1{
  background-color: #304156;
}
.navbar2{
    z-index: 2000;
    position: fixed;
    top: 0;
    width: 100%;
}
</style>

