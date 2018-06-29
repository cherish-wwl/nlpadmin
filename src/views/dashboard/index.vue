<template>
  <div class="dashboard-container">
    <span>更新日志</span>
    <br />
    <br />
    <br />
    <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="管理平台" name="first">
          <span>2018年6月28号</span>
          <pre>
            1.添加文档编辑页面跳转和提示
            2.解决方案：修改Bug：保存编辑后 F12报错问题
            3.数据集：修改图片为下拉选
            4.教授编辑页面：点击编辑按钮 ，学院/部门字段 显示不正确的问题
            5.数据集：新增保存数据集时，图片字段未被保存 （待解决）
          </pre>
          <span>2018年6月27号</span>
          <pre>
            1.完成文档编辑功能
          </pre>
          <span>2018年6月26号</span>
          <pre>
            1.线上系统更新测试：
              1.达观数据页面 上线  innerUrl 为 datagrand
              2.添加咨询按钮、电话、邮箱 按钮动画效果
              3. 热门服务：点击服务分类跳转至 服务列表页面
                          点击服务 跳转至 服务详情页面

          </pre>
          <span>2018年6月25号</span>
          <pre>
            1.服务管理页面：技术文档页面
              1）页面之间的跳转
              2）参数表格的增、删、改
              3）接口调试
              接口1：修改获取服务详情接口 （添加techDocumentExistence字段 用于判断 技术文档是否已存在）
              接口2：添加技术文档
          </pre>
          <span>2018年6月18号-2018年6月22号简介</span>
          <pre>
            1,管理平台-服务管理页面：添加服务，编辑服务 添加服务跳转方式
              （添加字段值位17（默认，详情页，跳转url），与服务跳转路径有级联关系）
            2,管理平台-服务管理页面：添加文档管理页面 ，讨论文档接口数据结构和页面结构
          </pre>
          <span>2018年6月15</span>
          <pre>
            1.服务管理页面：将所属类别不可修改变为可修改，并改为下拉选
              修改接口：service/typeList：添加入参：isSelection
            2.服务分类管理页面：修改rec_num为下拉选
          </pre>
          <span>2018年6月14</span>
          <br />
          <ul>
            <li>1.服务管理页面：
                <br />1)添加字段是否免费（ischarge）
                <br />2)将所属类型变为下拉选
            </li>
            <li>2.部门管理页面：添加详情，和简介字段 添加富文本编辑器</li>
          </ul>
          <span>2018年6月7号</span>
          <br />
          <ul>
            <li>教授信息管理页面：增、删、改、查 已完成</li>
          </ul>
       
          <span>2018年6月6日</span>
          <br />
          <ul>
            <li>1.大学管理页面、教授管理页面、部门管理页面、添加停用、启用状态</li>
            <li>2.修复服务管理页面bug（展示list和服务详情数据不一致）</li>
            <li>3.教授管理页面基本已完成（增、删、改、查）</li>
            <li>4.修改图片管理页面 编辑不了 的bug（字段名称修改）</li>
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
              修改左侧树结构 ，需要点击两次刷新页面 改为 点击一次刷新页面
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
          
          
         
          
        </el-tab-pane>
        <el-tab-pane label="展示平台" name="second">
          <span>2018年6月29号</span>
          <pre>
              1.上线版本更新内容：
                nlp学院：每个视频都可配置描述和标题，如 无详情 则 隐藏详情介绍
                服务详情页面：点击服务分类  可跳转到 服务列表页面
                首页：添加免费banner图，将数据 改为可配置  配置文件为 “/static/index/lbt.json” （未上线）
                将所有本地数据请求 都加了随机值（防止浏览器缓存，不更新本地数据） （未上线）
              2.技术文档页面：
                不能正确显示请求示例和返回示例问题
                已修改 （暂时只支持展示 json字符串 和 字符串）
              3.服务列表页面： 
                  请求：添加ischarge 字段 ：只展示免费服务  / 展示全部服务 

          </pre>
          <span>2018年6月28号</span>
          <pre>
            1.数据集：图片路径 （展示平台已修改，管理平台为修改） （待解决）
            2.解决方案：图片展示路径已修改（已测试完毕）
            3.注册页面：密码 添加md5 加密
            4.上线版本更新内容测试：
              1）添加注册页面：接口：404(未上线)
              2）添加技术文档：接口：404(未上线)
              3）导航栏：点击收缩/展开
              4）首页-基础服务：点击分类 跳转至  服务列表页面
                              点击具体服务 跳转到  服务详情页面
              5）nlp学院页面：将数据 改为可配置  配置文件为 “/static/nlpshool/nlpshcool.json”
                  点击展示不同视频（默认展示第一个）
                  安装使用vue-video-player播放视频
            
          </pre>
          <span>2018年6月27号</span>
          <pre>
            1.添加电话、邮箱、咨询 按钮动画效果
            2.注册页面：完成测试并提交 添加背景图片
            3.研究动态轮播图
          </pre>
          <span>2018年6月26号</span>
          <pre>
              1.测试：图片上传 与展示图片功能
                     测试模块           展示系统  管理系统        
                1） 服务分类背景图片         完成      完成
                2） 服务的图片               完成      完成
                3） 服务详情背景图片          完成      完成
                4） 服务详情自定义模式图片     完成      完成
                5） 专家图片                  完成      完成
                6） 学院图片                  完成      完成
              2.线上系统更新：
                1）客服、电话、邮箱功能和样式
                2）服务跳转：获取 跳转路径 字段名  有url改为innerUrl (隐藏url)
              3.激活邮箱激活成果后 等待跳转页面
              4.注册页面：
               1）接口1：验证邮箱是由已存在且已被激活
               2）接口2：注册

          </pre>
          <span>2018年6月25号</span>
          <pre>
            wwl：
            1.修改客服：有融云提供的接入 改为 智齿客服 提供的接入方式
            2.测试：图片上传 与展示图片功能
                     测试模块           展示系统  管理系统        
              1） 服务分类背景图片         完成      完成
              2） 服务的图片               完成      完成
              3） 服务详情背景图片         未完成      未完成
              4） 服务详情自定义模式图片    未完成      未完成
              5） 专家图片                  完成      完成
              6） 学院图片                  完成      完成
              3.修改 服务列表：点击查看详情 、首页-热门服务：点击具体服务：跳转路线 字段名 修改为innerUrl
          </pre>
          <span>2018年6月18号-2018年6月22号简介</span>
          <pre>
            1,展示平台-正式版 : 添加 客服服务 
            2.展示平台-正式版：服务详情页面，点击执行前，添加获取token， 隐藏Url功能
          </pre>
          <span>2018年6月21号</span>
          <pre>
            1.客服服务联调获取token值，修改为默认人工客服
            2.添加达观数据页面
            3.将达观数据页面和小牛翻译 页面展示数据 提取  修改为可配置  
              配置文件路径为"static/solution/datagrand.json","static/solution/xiaoniu.json"
            4.修改  首页-基础服务  
              点击分类 跳转到  服务列表页面 
              点击具体服务  跳转到  服务详情页面
              （修改接口：/service/type/recList2；返回结果children：添加 forwardType和url字段）
            5.修改图片加载路径
          </pre>
          <span>2018年6月15号</span>
          <br />
          <pre>
            1.新增调用获取验证码接口：/execute/getCertificate
            2.修改原来的执行调用服务接口：/execute/service
                入参变化：原来的url字段去掉，新增服务id：serviceId，验证码：certificate
            3、接口：/service/searchServiceByCondition出参变化：当forwardType为014001时，url为“”
            4、接口：/service/details/list 出参变化：服务id变为serviceId，调用路径url为空
            5、智齿客服 的人工客服接入
          </pre>
          <span>2018年6月14</span>
          <br />
          <ul>
            <li>1.动态展示专家页面</li>
            <li>2.动态展示研究院页面</li>
            <li>3.静态页面：可登录（随便填写用户名密码）</li>
            <li>4.静态页面：登录后，可进入管控台系统</li>
            <li>5.添加在线客服（智齿客服）</li>
            <li>6.查看文档页面：动态加载　＋ｊｓｏｎ　格式展示</li>
          </ul>
          <span>2018年6月7号</span>
          <br />
          <ul>
            <li>学院展示页面：添加一个院校</li>
          </ul>
          <span>2018年6月6日</span>
          <br />
          <ul>
            <li>
              1.框架添加：悬浮框（合作咨询）+ 返回顶部
            </li>
            <li>
              2.首页：轮播图自动轮播时间 延长至 5秒;修改鼠标悬浮经过的样式
            </li>
            <li>
              3.首页神州泰岳：下 专业技术研发团队支持 改为 技术落地实施团队。
            </li>
            <li>
              4.专家详情页面：赵军老师图片更新。
            </li>
            <li>
              5.服务详情页面：页面最下 联系电话以及邮箱更新。
            </li>
            <li>
              6.科研机构页面：更新科研机构介绍及详情。
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
          <span>2018年5月31日</span>
          <br />
          <ul>
            <li>
              导航栏悬浮效果取消
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
