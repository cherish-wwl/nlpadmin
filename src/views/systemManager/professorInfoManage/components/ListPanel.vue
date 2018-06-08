<template>
  <el-row :gutter="20">
    <br />
    
    <span>大学/机构：</span>
    <el-select v-model="academyId" v-on:change='triggerGroupQuerySearch' placeholder="请选择">
      <el-option
        v-for="item in academyList"
        :key="item.id" :label="item.academyName" :value="item.id">
      </el-option>
    </el-select>
    <span>学院/研究室：</span>
    <el-select v-model="groupId" v-on:change='triggerProfessorQuerySearch' placeholder="请选择大学/机构">
      <el-option
        v-for="item in groupList"
        :key="item.id" :label="item.groupName" :value="item.id">
      </el-option>
    </el-select>
    <span>教授/人员：</span>
    <el-select v-model="professorId" v-on:change='querySearch' placeholder="请选择学院/研究室">
      <el-option
        v-for="item in professorList"
        :key="item.id" :label="item.professorName" :value="item.id">
      </el-option>
    </el-select>
    <el-button type="primary" @click="addData" size='small'>添加</el-button>
    <br />
    <br />
      <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
        <el-table-column prop="professorName" label="教程/人员名称" min-width="180"> </el-table-column>
        <el-table-column prop="relateTypeName" label="类别" min-width="180"> </el-table-column>
        <el-table-column prop="relateDesc" label="详细内容" min-width="350">
          <template slot-scope="scope">
            <span v-html='scope.row.relateDesc'>{{scope.row.relateDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90" fixed="right">
          <template slot-scope="scope">
            <el-button @click="deleteDate(scope.row)" type="text" size="small"> 删除 </el-button>
            <el-button @click="editData(scope.row)" type="text" size="small"> 编辑 </el-button>
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
  </el-row>
</template>

<script>
import { getSchoolsList, getGrouplist, getProfessorlist, getProfessorRelateList,delProfessorRelate } from '@/api/systemManager/organization'
import { getFileList } from '@/api/uploadFile.js'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
    'dictList'
    ])
  },
  data() {
    return {  
      currentPage: 1,
      totalNumber: null,
      pageSize: 5,
      tableData: [],
      loading:false,
      searchKeyWord:'',
      imgFileList:[],
      academyId:'',
      academyList:'',
      groupId:'',
      groupList:'',
      professorId:'',
      professorList:null,
      edieMode: false,//false：添加模式  /true： 编辑模式
    }
  },
  
  methods: {
    // 查询
    querySearch (){
      console.log("====================查询=====================")
      console.log(this.searchKeyWord)
      this.currentPage = 1
      this.loadingData()
    },
    triggerGroupQuerySearch(){
      this.groupList = null
      this.groupId = ''
      this.professorList = null
      this.professorId = ''
      getGrouplist({academyId:this.academyId}).then(responce =>{
        this.groupList = responce.data
      })
    },
    triggerProfessorQuerySearch(){
      this.professorList = null
      this.professorId = ''
      getProfessorlist({groupId:this.groupId}).then(responce =>{
        this.professorList = responce.data
      })
    },
    // 改变每页显示多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val 
      this.loadingData()
    },
    // 改变当前显示第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(`当前页: ${this.currentPage}`)
      this.currentPage = val
      this.loadingData()
    },
    loadingData(NodeId){
      this.loading = true 
      getProfessorRelateList({ 
        pageSize: this.pageSize, 
        pageNow: this.currentPage,
        professorId:this.professorId,
        }).then(responce =>{
        this.tableData = responce.data
        this.totalNumber = responce.total
        this.loading = false
      })
    },
    // 添加
    addData(){
       this.$store.dispatch('SetProfessorInfo',{mode:'add'})
    },
    // 编辑人员
    editData (row) {
      console.log("编辑人员")
      console.log(this.$store.state.professor)
      row.mode = "edit"
      row.classType = row.relateTypeName
      row.classTypeCode = row.relateType
      row.content = row.relateDesc
      row.professorInfoId = row.id
      this.$store.dispatch('SetProfessorInfo',row)
    },
    // 删除人员
    deleteDate(row){   
      let message = '此操作将永久删除该数据, 是否继续?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delProfessorRelate({id:row.id}).then(response => {
          if(this.tableData.length == 1){
            this.currentPage = this.currentPage -1
          }
          this.loadingData()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })    
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })          
      })
    },
   
  },
  mounted () {
    setTimeout(()=>{
      this.loadingData()
      getSchoolsList().then(responce =>{
        this.academyList = responce.data
      })
    },10)  
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
  .el-dialog__body {
      height: auto !important;
      overflow-y: auto;
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
