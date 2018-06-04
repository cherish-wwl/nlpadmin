<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <br >
    <span>更新日志</span>
    <br />
    <br />
    <br />
    <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="管理平台" name="first">
          <span>2018年5月31日</span>
          <br />
          <ul>
            <li>
              服务管理页面：添加字段（isCharge:是否免费字段）；修改图片字段（修改为下拉选）
            </li>
            <li>
              解决方案管理页面：添加字段（isCharge:是否免费字段；groupId：团队id；professorId:教练id）；修改图片字段（修改为下拉选）
            </li>
          </ul>
          <span>2018年6月4日</span>
          <br />
          <ul>
            <li>
              字典表管理页面：完成展示列表+分页+查询功能
            </li>
            <li>
              将人员与机构管理页面分为大学管理页面，部门管理页面，教授管理页面
            </li>
            <li>
              大学管理页面：增、删、改、查 功能 基本完成
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="展示平台" name="second">
          <span>2018年5月31日</span>
          <br />
          <ul>
            <li>
              导航栏悬浮效果取消
            </li>
            
          </ul>
          <span>2018年6月1日</span>
          <br />
          <ul>
            <li>
              服务列表页面 ：查看详情 跳转问题（添加两个字段 forwordType，url）；
            </li>
            <li>
              小牛详情页面：修复专家跳转出现两个页面问题
            </li>
          </ul>
        </el-tab-pane>
  </el-tabs>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data () {
    return {
      activeName2:'first'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
