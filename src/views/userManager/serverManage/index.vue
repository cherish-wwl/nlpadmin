<template>
  <div class="grid-content">
    <br />
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="searchKey"
      v-on:change='querySearch' 
      @keyup.enter.native="querySearch">
    </el-input>
    <el-button type="primary" @click="addRowData('add')" size='small'>添加</el-button>
    <br />
    <br />
    <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
        <el-table-column type="index"  width="50"> </el-table-column>       
        <el-table-column prop="natAccount"  label="natAccount"  min-width="180"> </el-table-column>
         
        <el-table-column prop="innerIP"  label="innerIP"  min-width="180"> </el-table-column>
        <el-table-column prop="innerPort"  label="innerPort"  min-width="180"> </el-table-column>
        <el-table-column prop="limitTime"  label="limitTime"  min-width="180"> </el-table-column>
        
        <el-table-column prop="outerIP"  label="outerIP"  min-width="180"> </el-table-column>
        <el-table-column prop="outerPort"  label="outerPort"  min-width="180"> </el-table-column>
        <el-table-column prop="strategyNo"  label="strategyNo"  min-width="180"> </el-table-column>
        <el-table-column prop="reverse"  label="reverse"  min-width="180"> </el-table-column>
        <el-table-column label="操作" width="90" fixed="right">
          <template slot-scope="scope">
              <el-button @click="deleteRowData(scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="editRowData('edit',scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog :title="mode=='add'?'添加服务器信息':'编辑服务器信息'" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item label="natAccount:" label-width="180px">
          <el-input v-model="form.natAccount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="innerIP:" label-width="180px"  prop="innerIP">
          <el-input v-model="form.innerIP" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="innerPort:" label-width="180px" prop="innerPort">
          <el-input v-model="form.innerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="limitTime:" label-width="180px">
          <el-input v-model="form.limitTime" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="outerIP:" label-width="180px" prop="outerIP">
          <el-input v-model="form.outerIP" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="outerPort:" label-width="180px" prop="outerPort">
          <el-input v-model="form.outerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="strategyNo:" label-width="180px">
          <el-input v-model="form.strategyNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="reverse:" label-width="180px">
          <el-input v-model="form.reverse" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>

import { getServerList,addServerInfo, updateServerInfo, delServerInfo } from '@/api/server.js'
export default {
  data () {
    return {
      searchKey:null,
      loading: false,
      tableData:null,
      currentPage:1,
      pageSize:5,
      totalNumber:0,
      mode:'add',
      dialogFormVisible:false ,
      form:{
        strategyNo:'',
        innerPort:"",
        outerPort:'',
        limitTime:'',
        reverse:'',
        innerIP:'',
        natAccount:'',
        outerIP:'',
      },
      initForm:{
        strategyNo:'',
        innerPort:"",
        outerPort:'',
        limitTime:'',
        reverse:'',
        innerIP:'',
        natAccount:'',
        outerIP:'',
      },
      rules:{
        innerPort:{ min: 0, max: 6, message: '长度在 不能超过 6个字符', trigger: 'blur' },
        innerIP:{ min: 0, max: 20, message: '长度在 不能超过 20个字符', trigger: 'blur' },
        outerPort:{ min: 0, max: 6, message: '长度在 不能超过 6个字符', trigger: 'blur' },
        outerIP:{ min: 0, max: 20, message: '长度在 不能超过 20个字符', trigger: 'blur' },
      }
    }
  },
  methods:{
    // 查询
    querySearch(){
      console.log("===================查询关键字======================")
      console.log(this.searchKey)
      this.loadingTableData()
    },
    // 改变每页显示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      this.loadingTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(`当前页: ${this.currentPage}`)
      this.currentPage = val
      this.loadingTableData()
    },
    deleteRowData(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delServerInfo({id:row.academyId}).then(response => {
            // 刷新表格
            this.loadingTableData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
       
    },
    editRowData(mode,row) {     
      console.log(row)
      this.form =row
      this.mode = mode
      this.dialogFormVisible = true
    },
    addRowData(mode) {
      console.log("addTradesRowData")
      this.mode = mode
      this.form = this.initForm
      this.dialogFormVisible = true
    },
    loadingTableData(){
      // 获取服务器列表
      getServerList({pageNow:this.currentPage,pageSize:this.pageSize,keyword:this.searchKey}).then(response =>{
        this.tableData = response.data
        this.totalNumber =response.total
      })
    },
    closeDialog(){
      this.dialogFormVisible = false
      this.$refs['ruleForm'].resetFields();
    },
    //提交表单
    submitForm(formName){
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.mode == 'add'){
            addServerInfo(this.form).then(response => {
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
              this.$message({
                message: '保存机构成功！',
                type: 'success'
              })       
            })
          }else{
            updateServerInfo(this.form).then(response => {
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
              this.$message({
                message: '保存机构成功！',
                type: 'success'
              })       
            })
          }  
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  mounted (){
    this.loadingTableData()
  }
}
</script>
<style scoped>
  .el-pagination{
    text-align: right;
  }
  .el-input {
    width: 180px;
  }
</style>

