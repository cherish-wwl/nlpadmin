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
      <el-table-column prop="solutionId" label="序号" type='index' align="center" width="50"> </el-table-column>
      <el-table-column prop="solutionName" label="标题" min-width="160"> </el-table-column>
      <el-table-column prop="solutionDesc" label="描述" min-width="280"> </el-table-column>
      <el-table-column prop="solutionIcon" label="图片" min-width="150"> </el-table-column>
      <el-table-column prop="academyName" label="机构名称" min-width="150"> </el-table-column>
      <el-table-column prop="forwardType" label="跳转方式" min-width="150" :formatter="transferforwardType"> </el-table-column>
      <el-table-column prop="acceptTime" label="接入时间" min-width="150"> </el-table-column>
      <el-table-column prop="solutionUrl" label="访问路径" min-width="150"> </el-table-column>
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
    <el-dialog :title="mode=='add'?'添加':'机构'" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="ruleForm">
        <el-form-item 
         v-for="(item,index) in formData" :key="index" 
         :label="item.name+':'" 
         :label-width="item.labelWidth" 
         :prop="item.prop" 
         :rules="item.rules">   
          <el-input v-if="item.isInput" v-model="form[item.prop]" auto-complete="off"></el-input>
          <el-input v-if="item.isTextarea" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" :rows="2" v-model="form[item.prop]" auto-complete="off"></el-input>
          <el-select v-if="item.isSelect" v-model="form[item.prop]" placeholder="请选择">
           
              <el-option 
                v-if="item.isAcademy"
                v-for="child in academyList"
                :key="child.id" :label="child.academyName" 
                :value="child.id">
              </el-option>
              <template v-if="item.isDict">
              <el-option 
                v-for="child in dictList" v-if="child.parentCode ==item.parentCode" 
                :key="child.dictCode" :label="child.dictName" 
                :value="child.dictCode">
              </el-option>
              </template>
              
    
          </el-select>
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
import { solutionList, addSolution, delSolution, updateSolution } from '@/api/solutions/solutionsManage'
import { getSchoolsList } from '@/api/systemManager/organization'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'dictList'
    ])
  },
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
        academyId:"",
        academyName:"",
        acceptTime:"",
        forwardType: "",
        solutionDesc:"",
        solutionIcon:"",
        solutionId:'',
        solutionName : "",
        solutionUrl:"",
      },
      
      initForm:{
        academyId:"",
        academyName:"",
        acceptTime:"",
        forwardType: "",
        solutionDesc:"",
        solutionIcon:"",
        solutionId:'',
        solutionName : "",
        solutionUrl:"",
      },
      formData:[
        {
          name:'标题',
          prop:'solutionName',
          rules:{ required: true, message: '标题不能为空', trigger: 'blur'},
          labelWidth: '180px',
          isInput: true,
          isTextarea: false,
        },
        {
          name:'描述',
          prop:'solutionDesc',
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
        },
        {
          name:'图片',
          prop:'solutionIcon',
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
        },
        {
          name:'机构名称',
          prop:'academyId',
          labelWidth:'180px',
          isInput:false,
          isTextarea:false,
          isSelect:true,
          isDict:false,
          isAcademy:true
        },
        {
          name:'访问路径',
          prop:'solutionUrl',
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
        },
        // {
        //   name:'机构名称',
        //   prop:'academyName',
        //   labelWidth:'180px',
        //   isInput:true,
        //   isTextarea:false,
        // },
       
        {
          name:'跳转方式',
          prop:'forwardType',
          labelWidth:'180px',
          isDict:true,
          isAcademy:false,
          parentCode:'011',
          isInput:false,
          isTextarea:false,
          isSelect:true
        },
        {
          name:'接入时间',
          prop:'acceptTime',
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
        }
      ],
      // dictList:'',
      academyList:''
    }
  },
  methods:{
    transferforwardType(row){
      if(!row.forwardType){
        return ''
      } 
      for (let i =0;i<this.dictList.length;i++){
        if(this.dictList[i].dictCode == row.forwardType){
          return this.dictList[i].dictName
        }
      }
      return ''
    },
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
        delSolution({solutionId:row.solutionId}).then(response => {
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
      // row.academyId =row.academyId + 0
      this.form = row
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
      solutionList ({pageNow:this.currentPage,pageSize:this.pageSize,keyword:this.searchKey}).then(response => {
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
            addSolution(this.form).then(response => {
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
              this.$message({
                message: '保存成功！',
                type: 'success'
              })       
            })
          }else{
            updateSolution(this.form).then(response => {
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
    this.loadingTableData()
    // this.dictList = this.$store.state.app.dictList
    // console.log(this.$store.state.app)
    getSchoolsList().then( res => {
      this.academyList = res.data
    })
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

