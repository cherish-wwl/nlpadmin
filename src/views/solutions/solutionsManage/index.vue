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
      <el-table-column label="序号" type='index' align="center" width="50">
        
      </el-table-column>
      <el-table-column prop="solutionName" label="标题" min-width="160"> 
        <template slot-scope="scope">{{scope.row.solutionName||''}}</template>
      </el-table-column>
      <el-table-column prop="solutionDesc" label="描述" min-width="280" empty-text="empty"> 
        <template slot-scope="scope">{{scope.row.solutionDesc||''}}</template>
      </el-table-column>
      <el-table-column prop="solutionIcon" label="图片" min-width="150">
        <template slot-scope="scope">{{scope.row.solutionIcon||''}}</template>
      </el-table-column>
      <el-table-column prop="academyName" label="机构名称" min-width="150"> 
        <template slot-scope="scope">{{scope.row.academyName||''}}</template>
      </el-table-column>
      <el-table-column prop="forwardType" label="跳转方式" min-width="150" :formatter="transferforwardType"> 
        <template slot-scope="scope">{{transferforwardType(scope.row)||''}}</template>
      </el-table-column>
      <el-table-column prop="acceptTime" label="接入时间" min-width="150">
        <template slot-scope="scope">{{scope.row.acceptTime||''}}</template>
      </el-table-column>
      <el-table-column prop="solutionUrl" label="访问路径" min-width="150"> 
        <template slot-scope="scope">{{scope.row.solutionUrl||''}}</template>
      </el-table-column>
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
    <el-dialog :title="mode=='add'?'添加信息':'编辑信息'" :visible.sync="dialogFormVisible" width="75%" :center="true">
      <!-- 解决方案信息 -->
      <el-form :model="form" ref="ruleForm"  :inline="true" label-width="140px" label-position="right" >
        <el-form-item 
         v-for="(item,index) in formData" :key="index" 
         :label="item.name+':'" 
         :prop="item.prop" 
         :rules="item.rules"
         class="width50" 
         >   
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
      <!-- 接入信息 -->
      <el-checkbox :disabled="disabledEntryInfo" v-model="showEntryInfo">{{hasEntryInfo == true ?'编辑接入信息':'添加接入信息'}}</el-checkbox>
      <br />
      <br />
      <br />
      <entry-info ref="entryInfo" :entry-info="entryInfo"  :status="entryInfoStatus" :solution-id="solutionId" @setVaildataEntryInfo="setVaildataEntryInfo" v-if="showEntryInfo"></entry-info>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { solutionList, addSolution, delSolution, updateSolution, addSolutionEntryInfo, getSolutionEntryInfo, updateSolutionEntryInfo } from '@/api/solutions/solutionsManage'
import { getSchoolsList } from '@/api/systemManager/organization'

import { mapGetters } from 'vuex'
import { EntryInfo } from '@/views/solutions/solutionsManage/components'
export default {
  computed: {
    ...mapGetters([
      'dictList'
    ])
  },
  components:{
    EntryInfo
  },
  data () {
    return {
      entryInfoStatus:0,//0:代表add 1：edit
      hasEntryInfo:false,
      disabledEntryInfo:false,
      showEntryInfo:false,
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
        // {
        //   name:'接入时间',
        //   prop:'acceptTime',
        //   labelWidth:'180px',
        //   isInput:true,
        //   isTextarea:false,
        // }
      ],
      // dictList:'',
      academyList:'',
      vaildataEntryInfo: false,  //用于记录接入信息 是否验证通过 
      entryInfo:null,  //用于暂存 接入信息
      solutionId:''
    }
  },
  methods:{
    // 翻译接入方式
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
      console.log("编辑") 
      console.log(row)
      // row.academyId =row.academyId + 0
      this.form = row
      this.mode = mode
      this.dialogFormVisible = true
      this.entryInfoStatus = 1 //0:代表add 1：edit
      this.solutionId = row.solutionId
      getSolutionEntryInfo({serviceId:this.solutionId}).then(res =>{
        if(res.data == null){
          this.showEntryInfo = false
          this.hasEntryInfo = false
          this.disabledEntryInfo = false
        }else{
          this.showEntryInfo = true
          this.hasEntryInfo = true
          this.disabledEntryInfo = true
          this.entryInfo = res.data
          console.log(this.entryInfo)
          setTimeout( ()=>{
            this.$refs.entryInfo.hasEntryInfoToInit(this.entryInfo)
          },500)
          
        }
      })
    },
    addRowData(mode) {
      console.log("添加")
      this.mode = mode
      
      this.form = {
        academyId:"",
        academyName:"",
        acceptTime:"",
        forwardType: "",
        solutionDesc:"",
        solutionIcon:"",
        solutionId:'',
        solutionName : "",
        solutionUrl:"",
      }
      
      this.dialogFormVisible = true
      this.showEntryInfo = false
      this.hasEntryInfo = false
      this.disabledEntryInfo = false
      this.entryInfoStatus = 0 //0:代表add 1：edit
      this.solutionId = ""
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
    setVaildataEntryInfo(item){
      this.vaildataEntryInfo = item.vaild
      this.entryInfo = item.info
    },
    //提交表单
    submitForm(formName){
      console.log(this.form)
      // 验证解决方案信息
      this.$refs[formName].validate((valid) => {
        // 验证接入信息
        if(this.showEntryInfo){
          this.$refs.entryInfo.submitForm('ruleForm')
        }else{
          this.vaildataEntryInfo = true  //不需要接入信息 则不需要验证接入信息
        }


        if (valid && this.vaildataEntryInfo) {
          
          if(this.mode == 'add'){
            // 保存解决方案
            addSolution(this.form).then(response => {
              // 保存接入信息
              if( this.showEntryInfo ){
                this.entryInfo.accessId = response.data.solutionId
                addSolutionEntryInfo(this.entryInfo).then(res =>{
                  this.$message({
                    message: '保存成功！',
                    type: 'success'
                  })  
                })
              }else{
                this.$message({
                message: '保存成功！',
                type: 'success'
              })  
              }
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
                   
            })

          }else{
            updateSolution(this.form).then(response => {
             
              this.entryInfo.accessId = this.solutionId
              if( !this.hasEntryInfo ){
                 // 新增接入信息
                addSolutionEntryInfo(this.entryInfo).then(res =>{
                  this.$message({
                    message: '保存成功！',
                    type: 'success'
                  })  
                })
              }else{
                 // 更新接入信息
                updateSolutionEntryInfo(this.entryInfo).then(res =>{
                  this.$message({
                    message: '保存成功！',
                    type: 'success'
                  })  
                })
              }
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
    setTimeout( () => {
      this.loadingTableData()
      // this.dictList = this.$store.state.app.dictList
      // console.log(this.$store.state.app)
      getSchoolsList().then( res => {
        this.academyList = res.data
      })
    },0)
    
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .el-pagination{
    text-align: right;
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
  label.el-checkbox {
    margin-left: 72px;
  }
</style>

