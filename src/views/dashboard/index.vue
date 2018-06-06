<template>
  <div class="dashboard-container">
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
          
          <span>2018年6月5日</span>
          <br />
          <ul>
            <li>
              大学管理页面：
              <br />
              1./academy/list 接口：返回值添加字段 academyPhone，academyImg, imgUrl
              <br />
              2./academy/addAcademy 接口：返回值添加字段 academyPhone，academyImg
              <br />
              3./academy/updateAcademy接口：返回值添加字段 academyPhone，academyImg
            </li>
            <li>
              学院管理页面：
              <br />
              1./academy/grouplist 接口：返回值添加字段 academyName，groupDesc，groupImg, imgUrl；
              传参添加字段：pageSize，pageNow，keyword （不传参返回全部列表），id（学校id，不传参返回全部列表）
              <br />
              2./academy/addGroup接口：入参添加字段 groupDesc，groupImg
              <br />
              3./academy/updateGroup接口：返回值添加字段 groupDesc，groupImg
            </li>
            <li>
              字典值管理页面：增、删、改、查 基本完成
            </li>
            <li>
              教授管理页面：
              <br />
              1./academy/professorlist 接口：修改为 未传参数 返回全部人员列表（带分页）
              2./academy/professorlist 接口：修改为 只传academyId 返回该大学/机构下全部人员列表（带分页）
              3.
            </li>
          </ul>
          <span>2018年6月6日</span>
          <br />
          <ul>
            <li>1.大学管理页面、教授管理页面、部门管理页面、添加停用、启用状态</li>
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
          <span>2018年6月5日</span>
          <br />
          <ul>
            <li>
              专家详情页面：  统一研究成果标签项目名称以及介绍格式；
            </li>
            <li>
              专家列表页面：  完成核对赵小兵老师，荀恩东老师信息。
              <br />
                  更新赵军老师的照片。
            </li>
            <li>
              首页导航logo：  更换新的logo样式图片。
              <br />
                  关于平台 行业专家 改为 专家团队。
              <br />
                    聚力改为聚商。
            </li>
            <li> 
              首页轮旋图片：	将第二个轮旋图片换为新的图片。
              <br />
                  将点击图片跳转除了最后一张其他的全部去掉。
              <br />
                  创新合作 改为 合作创新。
              <br />
                  合作创新 大学logo图片修改高为：84px；宽为：300px；。
              <br />
                    大学logo图片div中去掉 height="250px"。
              <br />
                    大学logo新增南京大学logo。
              <br />
                  权威专家学者 去掉下面国内外中的外。
              <br /> 
                  创新合作院校改为合作创新科研机构，下面的创新合作改为合作创新。
            </li>
            <li>
              NLP 学院页面：  修改NLP小学院每个视频的名称。
              <br />
                  注释掉NLP算法推荐课程（暂时不用）。
                  <br />
                  注释 NLP小学院 以及 金牌讲师 后面的 更多>> 。
                  <br />
                  将金牌讲师 改为一个 任宁老师。
                  <br />
                  将NLP小学院中的视频加入新的图片。
                  <br />
                  注释导航中的三个标签。
                  <br />
                  将NLP小学院中的每个视频图片加上最大高度和最小高度。
                  <br />
                  给NLP小学院中的视频名称加上高度。
            </li>
            <li>
              小牛翻译页面：  修改联系我们中网址跳转，将本页面跳转改为新页面跳转。
            </li>
            <li> 
            合作创新科研机构页面：  将创新合作院校改为合作创新科研机构。
            <br />
                  注释掉下拉选以及搜索。
            </li>
          </ul>
          <span>2018年6月6日</span>
          <br />
          <ul>
            <li>
              1.框架添加：悬浮框（合作咨询）+ 返回顶部
            </li>
            <li>
              2.首页：轮播图自动轮播时间 延长至 5秒
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
