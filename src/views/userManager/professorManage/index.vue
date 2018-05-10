<template>
  <el-row :gutter="20">
    <el-col :span="5">
      
      <div class="grid-content">
        <div class="">
          <el-button type="text"><i class="el-icon-circle-plus-outline"></i>新增</el-button>
          <el-button type="text"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button type="text"><i class="el-icon-delete"></i>删除</el-button>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange" accordion>
          <el-collapse-item v-for="item in schoolsList" :class="currentNodeId == 's'+item.id?'active':''" 
          :key="item.id" class="collapseItem" :title="item.academyName" :name="'s'+item.id">
            <ul class="ul-item" v-if="item.children && item.children.length != 0">
              <li v-for="child in item.children" :class="currentNodeId == child.groupid?'active':''" :key="child.groupid" @click="triggerReloadingTable(child.groupid)">
                <a>{{child.groupName}}</a>
              </li>  
            </ul>    
            <span v-else>
              无数据
            </span>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-col>
    <el-col :span="19">
      
      <el-input
        placeholder="请输入关键字"
        suffix-icon="el-icon-search"
        v-model="searchKeyWord"
        v-on:change='querySearch' >
      </el-input>
      <el-button type="primary" @click="addOrEditService(0)" size='small'>添加教授</el-button>
      <br />
      <br />
      <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="序号" type="index" align='center'> </el-table-column>
        <el-table-column prop="professorName" label="教授名称" min-width="80"> </el-table-column>
        <el-table-column prop="professorDesc" label="研究主要方向" width="250"> </el-table-column>
        <el-table-column prop="professorSex" label="性别" min-width="150"> </el-table-column>       
        <el-table-column prop="professorTitle" label="职称" min-width="150"> </el-table-column>

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
    </el-col>

  </el-row>
</template>

<script>
import { getSchoolsList, getGrouplist, getProfessorlist } from '@/api/professor'
export default {
 
  data() {
    return {  
      activeNames:'',
      loading: false,
      currentPage: 1,
      totalNumber: null,
      pageSize: 5,
      tableData: [],
      searchKeyWord:'',
      schoolsList: [],
      currentNodeId:''
    }
  },
  
  methods: {
    // 点击学校，加载学院
    handleChange(val){
      console.log("===========点击学校，加载学院=================")
      console.log(val)
      this.tableData= []
      this.currentNodeId = val
       for(let i = 0; i< this.schoolsList.length; i++){
          if(this.schoolsList[i].id == val.substring(0.1)[1]){
            if(!this.schoolsList[i].children){
              getGrouplist({id:val.substring(0.1)[1]}).then(response => {
                this.$set( this.schoolsList[i], 'children', [])
                this.schoolsList[i].children = response.data
              })
              break
            }
          }
        }
    },
    triggerReloadingTable(id){
      this.currentNodeId = id
      this.refreshLoadingData()
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
    deleteRowData(row){
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delService({ serviceId: row.id}).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 刷新树
              console.log(this.$refs.tree.getCurrentNode())
              let currentNode = this.$refs.tree.getCurrentNode()
              if( currentNode == null ){
                currentNode = { id: 0 }
              }
              getList({ id: currentNode.id }).then(response => {
                this.$refs.tree.updateKeyChildren(currentNode.id,response.data)
              })   
              //刷新表格 
              this.refreshTableData(this.currentNodeId)
           
            })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    refreshLoadingData(NodeId){
      this.loading = true 
      getProfessorlist({ id: this.currentNodeId, pageSize: this.pageSize, pageNow: this.currentPage,keyword:this.searchKeyWord}).then(responce =>{
        this.tableData = responce.data
        this.totalNumber = responce.total
        this.loading = false
      })
     
    },
    // 添加服务，返回，调用刷新列表
    reloadingTable(){
      console.log("++++++++++++++++添加服务，返回，调用刷新列表+++++++++++++++++++")
      this.refreshLoadingData()
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
   
    // 添加/编辑接入信息= 返回方法
    dialogMethod(val){
      console.log("===========服务器编辑信息 返回方法===============")
      console.log(val)
      this.dialogFormVisible = val
    }
    
  },
  mounted () {
    getSchoolsList().then(response => {
      this.schoolsList = response.data
      if(response.data[0]){
        this.activeNames = 's'+response.data[0].id
        this.handleChange('s'+response.data[0].id)
      }
    
    })
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
  
  ul.ul-item{
    list-style: none;
    padding: 0px;
    li{
      padding: 10px 20px;
      border-left: 3px solid #fff;
     
      &.active, &:hover{
        border-left: 3px solid #409eff;
        background-color: #409eff3b;
      }
      &:not(:last-child){
        border-bottom: 1px solid #e3dfdf;
      }
    }

  }
  .el-collapse-item{
    &.active{
      .el-collapse-item__header{
        background-color: #409eff;
        color: #fff;
      }
    }
    &:hover{
      background-color: #409eff3b;
    }
    
  }
</style>
