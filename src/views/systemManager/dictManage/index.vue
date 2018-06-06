<template>
  <div class="grid-content">
    <br />
    <span>类型：</span>
    <el-select v-model="searchType" v-on:change='querySearch' placeholder="请选择类型">
       <el-option label="全部" value="">
      </el-option>
      <el-option
        v-for="item in dictList"
        v-if="item.parentCode =='0'" 
        :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
      </el-option>
    </el-select>
    <span>字典值：</span>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="searchKey"
      v-on:change='querySearch' 
      @keyup.enter.native="querySearch">
    </el-input>
    <el-button type="primary" @click="addRootDict()" size='small'>添加</el-button>
    <br />
    <br />
    <el-table :data="tableData"  border style="width: 100%"  height="300" v-loading="loading">
        <el-table-column type="index"  width="50"> </el-table-column>     
        <el-table-column prop="dictCode"  label="dictCode"  min-width="180"> </el-table-column>  
        <el-table-column prop="dictName"  label="dictName"  min-width="180"> </el-table-column>
        <el-table-column prop="dictValue"  label="dictValue"  min-width="180"> </el-table-column>
        <el-table-column prop="dictState"  label="dictState"  min-width="180"> </el-table-column>
        <el-table-column prop="parentCode"  label="parentCode"  min-width="180"> </el-table-column>
        <el-table-column prop="parentName"  label="parentName"  min-width="180"> </el-table-column>
        <el-table-column prop="updateTime"  label="updateTime"  min-width="180"> </el-table-column>
        <el-table-column prop="updateUser"  label="updateUser"  min-width="180"> </el-table-column>
        <el-table-column prop="createUser"  label="createUser"  min-width="180"> </el-table-column>
        <el-table-column prop="createTime"  label="createTime"  min-width="180"> </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button @click="addChildDict(scope.row)" type="text" size="small">添加</el-button>
            <el-button @click="deleteDict(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="editDict(scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog :title="mode=='add'?'添加':'编辑'" :visible.sync="dialogFormVisible" width="40%">
      <el-form label-position="right" label-width="180px" :model="form" ref="ruleForm" :rules="rules">
        <template v-if="isRootDict != true" >
          <el-form-item label="类别：" prop="parentName">
            <el-input v-model="form.parentName" :disabled="true"></el-input>
          </el-form-item>
        </template>
      
        <el-form-item label="字典名称：" prop="dictName">
          <el-input v-model="form.dictName"></el-input>
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
import { Message } from 'element-ui'
import { dictList } from '@/api/common.js'
import { dictList as pageDictList, addDict, updateDict, delDict} from '@/api/dict.js'

export default {
  data () {
    return {
      searchType:"",
      dictList:'',
      imageUrl:"",
      searchKey:null,
      loading: false,
      tableData:null,
      currentPage:1,
      pageSize:5,
      totalNumber:0,
      mode:'add',
      dialogFormVisible:false ,
      isRootDict:false,
      form:{
        dictName:"",
        dictCode:'',
        parentCode:"",
        parentName:''
      },
      rules:{
        dictName:[
          { required: true, message: '名称不能为空', trigger: 'blur'},
          { min: 0, max: 20, message: '长度在 不能超过 20个字符', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    // 查询
    querySearch(){
      console.log("===================查询关键字======================")
      console.log(this.searchKey)
      this.currentPage = 1
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
    // 添加根节点
    addRootDict(){
      this.isRootDict = true
      this.mode ='add'
      this.form = {
        dictName:"",
        dictCode:'',
        parentName:'',
        parentCode:0,
      }
      this.dialogFormVisible = true
    },
    // 添加子节点
    addChildDict(row){
      console.log(row)
      this.isRootDict = false
      this.mode ='add'
      this.form = {
        dictName:"",
        dictCode:'',
        parentName:row.dictName,
        parentCode:row.dictCode,
      }
      this.dialogFormVisible = true
    },
    // 编辑字典信息
    editDict(row){
      if(row.parentCode == "0"){
        this.isRootDict = true
      }else{
        this.isRootDict = false
      }
      this.mode ='edit'
      this.form = row
      this.dialogFormVisible = true
    },
    // 删除字段信息
    deleteDict(row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        delDict({dictCode:row.dictCode}).then(response => {
          console.log(this.tableData.length)
          if(this.tableData.length == 1){
            if(this.currentPage > 1 ){
              this.currentPage = this.currentPage -1
            }
          }
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
    loadingTableData(){
      dictList().then( res=>{
        this.dictList = res.data
      }) 
      pageDictList({
        pageNow:this.currentPage,
        pageSize:this.pageSize,
        dictCode:this.searchType,
        keyword:this.searchKey}).then( res=>{
        this.dictList = res.data
        this.tableData = res.data
        this.totalNumber = res.total
      }) 
    },
    closeDialog(){
      this.dialogFormVisible = false
    },
    //提交表单
    submitForm(formName){
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.mode == 'add'){
            addDict(this.form).then(response => {
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
              this.$message({
                message: '保存成功！',
                type: 'success'
              })       
            })
          }else{
            updateDict(this.form).then(response => {
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
              this.$message({
                message: '保存成功！',
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
    setTimeout(()=>{
      this.loadingTableData()
    },300)
    
    
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss">
  .el-pagination{
    text-align: right;
  }
  .el-input {
    width: 180px;
  }
  .el-dialog__body {
    height: auto;
  }
  .avatar-uploader{
    img{
      height: 100px;
    }
  }
</style>

