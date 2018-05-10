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
    <el-table :data="tableData"  border style="width: 100%" v-loading="loading" >
      <el-table-column prop="academyId" label="序号" type='index' align="center" width="50"> </el-table-column>
      <el-table-column prop="academyName" label="机构名称" min-width="160"> </el-table-column>

      <el-table-column prop="academyDesc" label="描述" min-width="280"> </el-table-column>
      <el-table-column prop="academyPhone" label="联系人电话" min-width="150"> </el-table-column>
      <el-table-column prop="academyURL" label="访问地址" min-width="150"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="150"> </el-table-column>
      <el-table-column label="操作" width="90" fixed='right'>
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
    <el-dialog :title="mode=='add'?'添加机构':'编辑机构'" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="ruleForm">
        <el-form-item label="机构名称:" label-width="180px" prop="academyName" :rules="{ required: true, message: '机构名称不能为空', trigger: 'blur'}">
          <el-input v-model="form.academyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构描述:" label-width="180px">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" :rows="2" v-model="form.academyDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="访问路径:" label-width="180px">
          <el-input v-model="form.academyURL" auto-complete="off"></el-input>
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
import { getList, addAcademy, updateAcademy, delAcademy } from '@/api/systemManage.js'
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
        academyName:'',
        academyDesc:"",
        academyURL:''
      },
      initForm:{
        academyName:'',
        academyDesc:"",
        academyURL:''
      },
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
        delAcademy({id:row.academyId}).then(response => {
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
      getList ({pageNow:this.currentPage,pageSize:this.pageSize,keyword:this.searchKey}).then(response => {
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
            addAcademy(this.form).then(response => {
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
              this.$message({
                message: '保存机构成功！',
                type: 'success'
              })       
            })
          }else{
            updateAcademy(this.form).then(response => {
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

