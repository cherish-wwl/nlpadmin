<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="grid-content">
        <el-tree
          node-key="id"
          :props="props"
          :load="loadNode"
          lazy
          @node-click="handleNodeClick"
          highlight-current 
          ref='tree'>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="19">
      <div class="grid-content"  v-if="!addPanel">
        <el-input
          placeholder="请输入关键字"
          suffix-icon="el-icon-search"
          v-model="searchKeyWord"
          v-on:change='querySearch' >
        </el-input>
        <el-button type="primary" @click="addOrEditService(0)" size='small'>添加服务</el-button>
        <br />
        <br />
        <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
          <el-table-column prop="index" label="序号" type="index" align='center'> </el-table-column>
          <el-table-column prop="serviceName" label="服务名称" min-width="80"> </el-table-column>
          <el-table-column prop="serviceDescr" label="描述" width="250" :formatter="stringFormatter"> </el-table-column>
          <el-table-column prop="url" label="服务调用路径" min-width="150"> </el-table-column>
          
          <el-table-column prop="in_arg" label="输入参数" min-width="150"> </el-table-column>
          <el-table-column prop="banner" label="banner路径" min-width="150"> </el-table-column>
          <el-table-column prop="academyName" label="所属学校" min-width="150"> </el-table-column>
          <el-table-column prop="professorName" label="所有者" min-width="150"></el-table-column>
          <el-table-column prop="serviceState" label="服务状态" min-width="150"></el-table-column>
          <el-table-column prop="rel_time" label="发布时间" min-width="100"> </el-table-column>
          <el-table-column label="操作" width="90" fixed="right">
            <template slot-scope="scope">
              <el-button @click="deleteRowData(scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="addOrEditService(1,scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <div class="block">     
          <el-pagination  @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber">
          </el-pagination>
        </div>
      </div>
      <add-service-panel :type="type" :current-node="nodeInfo" @returnBack="returnBack" @reloadingTable="reloadingTable" v-if="addPanel" @dialogMethod="dialogMethod"></add-service-panel>
    </el-col>
    <!-- 添加服务器信息弹出框 -->
    <add-server-info :dialog-form-visible="dialogFormVisible" @returnBack="returnBack"  @dialogMethod="dialogMethod"></add-server-info>
  </el-row>
</template>

<script>
import { getList, getServiceListById } from '@/api/table'
import { delService } from '@/api/service'
import { AddServicePanel, AddServerInfo} from '@/views/service/servicemanager/components'
import { mapGetters } from 'vuex'
export default {
  computed: {
    // ...mapGetters([
    //   'serviceId',  
    // ])
  },
  data() {
    return {  
      dialogFormVisible:false,
      addPanel:false,
      loading: false,
      currentPage: 1,
      totalNumber: null,
      pageSize: 5,
      tableData: [],
      searchKeyWord:'',
      props: {
          label: 'name',
          children: 'zones'
      },
      type:0,
      count: 1,
      treeData: [],
      currentNodeId: 0,
      nodeInfo: null,
      isLastClassify:false,
      serviceId:''
    }
  },
  components:{
    AddServicePanel,
    AddServerInfo
  },
  methods: {
    // 字符串转换
    stringFormatter( row, column ){
      // console.log(row)
      // console.log(column)
      if(row.serviceDescr.length <= 30){
        return row.serviceDescr
      }
      if(row.serviceDescr != ''){
        return row.serviceDescr.substring(0,30)+'...'
      }
      return ''

    },
    // 查询
    querySearch (){
      console.log("====================查询=====================")
      console.log(this.searchKeyWord)
      this.refreshLoadingData()
    },
    // 改变每页显示多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val 
      this.refreshLoadingData()
    },
    // 改变当前显示第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(`当前页: ${this.currentPage}`)
      this.currentPage = val
      this.refreshLoadingData()
    },

    handleClick(row) {
      // console.log(row)
    },
    deleteRowData(row){
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delService({ id: row.id}).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //刷新表格 
              this.refreshLoadingData(this.currentNodeId)
           
            })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 点击左侧的树，触发列表刷新
    handleNodeClick(data,resolve) {
      // console.log(data)
      this.nodeInfo = data 
      this.currentNodeId = data.id
      this.currentPage = 1
      this.totalNumber = 0
      this.tableData = []
      this.addPanel = false
      this.refreshLoadingData()
    },  
    refreshLoadingData(NodeId){
      this.loading = true 
      getServiceListById({ id: this.currentNodeId, pageSize: this.pageSize, pageNow: this.currentPage,keyword:this.searchKeyWord}).then(responce =>{
        this.tableData = responce.data.result
        this.isLastClassify =responce.data.isLastClassify
        this.totalNumber = responce.total
        this.loading = false
      })
     
    },
    // 添加服务，返回，调用刷新列表
    reloadingTable(){
      console.log("++++++++++++++++添加服务，返回，调用刷新列表+++++++++++++++++++")
      this.refreshLoadingData()
    },
    // 加载分类
    loadNode(node, resolve) {
      let sendData
      if (node.level === 0) {
        sendData = { id: 0 }
      }else {
        sendData = { id: node.data.id }
      } 
      getList(sendData).then(response => {
        return resolve(response.data)  
      })  
    },
    // 添加或编辑服务
    addOrEditService( type ,row){
      if(this.isLastClassify){
          this.type = type
          if(type == 1){
            // 编辑
            // console.log(row)
            this.$store.dispatch('SetIsEditMode', true)
            
            this.$store.dispatch('SetServiceId', row.id)
          }else{
            this.$store.dispatch('SetIsEditMode', false)
          }
          this.addPanel = true
      }else{
        this.$message({
          message: '请选择最后一层类',
          type: 'warning'
        })
      }
    },
    // 返回服务列表
    returnBack(){
      this.addPanel = false 
    },
    // 添加/编辑接入信息= 返回方法
    dialogMethod(val){
      console.log("===========服务器编辑信息 返回方法===============")
      console.log(val)
      this.dialogFormVisible = val
    }
    
  },
  mounted () {
    
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss">
  .el-pagination{
    text-align: right;
  }
  .grid-content {
    min-height: 36px;
  }
  .el-input,.el-select {
   
    width: 230px;
  }

  .width50{
    width: 48%;
  }
  .width100{
    width: 100%;
    .el-form-item__content{
      width: 77.5%;
    }
  }
</style>
