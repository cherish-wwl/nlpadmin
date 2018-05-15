<template>
  <div>
    <el-radio-group v-model="currentRadioId" style="margin-bottom: 30px;" @change='LevelOneClick'>
      <el-radio-button v-for='(item,index) in leverOneData' :key='index' :label='item.id' :title='item.name'>
        {{ item.name }}
        <span v-on:click="editClick( item, 'one')" title="编辑">&nbsp;&nbsp;<i class="el-icon-edit"></i></span>
        <span v-on:click="deleteClick( item, 'one' )" title='删除'>&nbsp;&nbsp;<i class="el-icon-delete"></i></span>
      </el-radio-button>
      <el-radio-button label="add" title='添加'><span><i class="el-icon-circle-plus-outline"></i></span></el-radio-button>
    </el-radio-group>
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content">
          <el-button type="primary" @click="addClick ( 'two' )" size='small'>添加</el-button>
          <br />
          <ul class='normal_ul'>
            <li v-for="( item,index ) in levelTwoData" :key='index' 
            :class="currentLevelTwoId == item.id ? 'active' : '' " 
            v-on:click='levelTwoClick(item)'>
              <i class="el-icon-d-arrow-right"></i>
              <div class='content_li' :title='item.name'> {{ item.name }} </div>
              <span class='icon' v-on:click="deleteClick( item, 'two')" title='删除'>&nbsp;&nbsp;<i class="el-icon-delete"></i></span>
              <span class='icon' v-on:click="editClick( item, 'two' )" title="编辑">&nbsp;&nbsp;<i class="el-icon-edit"></i></span>
            </li> 
          </ul>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content">
          <el-button type="primary" @click="addRowData" size='small'>添加</el-button>
          <br />
          <br />
          <el-table :data="tableData"  border style="width: 100%" v-loading="loading" >
             <el-table-column prop="name" label="name" width='100'> </el-table-column>
              <el-table-column prop="type_name" label="type_name" width='100'> </el-table-column>
              <el-table-column prop="image" label="image" width='100'> </el-table-column>
              <el-table-column prop="size" label="size" width='100'> </el-table-column>
              <el-table-column prop="uploader" label="uploader" width='100'> </el-table-column>
              <el-table-column prop="introduce" label="introduce" width='500'> </el-table-column>
              <el-table-column prop="format" label="format" width='100'> </el-table-column>
              <el-table-column prop="type" label="type" width='100'> </el-table-column>
              <el-table-column prop="attr" label="attr" width='100'> </el-table-column>
              <el-table-column prop="url" label="url" width='300'> </el-table-column>
              <el-table-column label="操作" width="90" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="deleteClick(scope.row,'three')" type="text" size="small">删除</el-button>
                    <el-button @click="editRowData(scope.row)" type="text" size="small">编辑</el-button>
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
        </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-for="(key,index) in form" :key='index'  :label='index' :label-width="formLabelWidth">
             <el-input :type="index=='introduce' ? 'textarea' : ''" auto-complete="off" v-model="form[index]"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getlevelOneData, getlevelTwoData, getTableList,
         deletelevelOneData, deletelevelTwoData, deleteTableList, 
         addlevelOneData, addlevelTwoData,addTableList, 
         editlevelOneData, editlevelTwoData, editTableList
        } from '@/api/dataset'
export default {
  data () {
    return {
      activeName: 'trade',
      loading: false,
      tradesTableData:null,
      currentPage:1,
      pageSize:5,
      totalNumber:null,
      currentLevelOneId: null,
      currentRadioId: null,
      leverOneData: [],
      levelTwoData: [],
      currentLevelTwoId:null,
      tableData:[],
      dialogFormVisible:false,
      dialogTitle:'添加数据',   
      form:{},
      initForm:{
        "name":'',
        //"type_name":"",
        "image":"",
        "size":"",
        "uploader":"",
        "introduce":"",
        "format":"",
        // "id":"",
        //"type":"",
        //"attr":"",
        "url":"",
       
      },
      
      classForm:{
        name:'',
        icon:''
      },
    
      dataMode:"add",
      levelNum:'one',
      formLabelWidth: '120px'
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val 
      this.loadingTable(this.currentLevelTwoId)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(`当前页: ${this.currentPage}`)
      this.currentPage = val 
      this.loadingTable(this.currentLevelTwoId)

    },
    addRowData(){
      this.dialogFormVisible = true
      this.dialogTitle = '添加数据'
     
      this.form = this.initForm
      this.form.attr = this.currentLevelOneId
      this.form.type = this.currentLevelTwoId
      this.dataMode = 'add'
    },
    editRowData(row){
      console.log( row )
      this.dialogFormVisible = true
      this.dialogTitle = '编辑数据'
      this.form = row
     
      this.dataMode = 'edit'
    },
    LevelOneClick( id ) {
      if( id == 'add' ){
        this.addClick ( "one" )
        this.currentRadioId = this.currentLevelOneId
      }else {
        this.currentLevelOneId = this.currentRadioId
        // 清空数据
        this.tableData = null
        this.levelTwoData = null
        this.currentPage = 1
        this.totalNumber = 0
        this.pageSize = 5
        // 更新数据
        // console.log("更新数据")
      
        getlevelTwoData({ id: this.currentLevelOneId}).then(responce=>{
          this.levelTwoData = responce.data
          if(!this.levelTwoData[0]){
            return
          }else {
            this.currentLevelTwoId = this.levelTwoData[0].id
            this.loadingTable(this.currentLevelTwoId)
          }
        })
      }
    },
    levelTwoClick( item ) {
      this.currentLevelTwoId = item.id
      this.currentPage = 1
      this.loadingTable(this.currentLevelTwoId)
    },
    addClick ( level ) {
        this.dialogFormVisible = true
        this.dialogTitle = '添加'
        this.levelNum = level
        this.form = this.classForm    
    },
    editClick ( item, level ) {
      console.log( item )
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder:item.name
      }).then(({ value }) => {
        if( value == '' ||value == null){
          return false
        }
        if( level == "one" ){
          editlevelOneData({ id:item.id,name:value,attr:0}).then(responce=>{
            // 刷新列表
            this.loadingOneLevel()
            this.$message({
              type: 'success',
              message: '操作成功' 
            })
          })
        }else if( level == "two"){
          editlevelTwoData({ id:item.id,name:value,attr: this.currentLevelOneId}).then(responce=>{
            // 刷新列表
            this.loadingTwoLevel(this.currentLevelOneId)
            this.$message({
              type: 'success',
              message: '操作成功' 
            })
          })
        }else {
          this.$message({
            type: 'error',
            message: '未知错误'
          })
        }
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      })
    },
    deleteClick ( item, level ) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if( level == "one"){
            deletelevelOneData({id:item.id}).then(responce=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.init()
            })

          }else if( level == "two"){
            deletelevelTwoData({id:item.id}).then(responce=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //刷新
              this.loadingTwoLevel(this.currentLevelOneId)
              if(this.levelTwoData.length == 0){
                this.tableData = []
                this.totalNumber = 0
                this.pageSize = 5
                this.currentPage = 1
                return
              }
              this.currentLevelTwoId = this.levelTwoData[0].id
              this.loadingTable(this.currentLevelTwoId)
            })
          }else if( level == "three"){
            deleteTableList({id:item.id}).then(responce=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              //刷新表格 
              this.currentPage = 1
              this.loadingTable(this.currentLevelTwoId)
            })
          }else {
            this.$message({
              type: 'error',
              message: '未知错误'
            })
          }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      });
    },  
    loadingOneLevel(){
      getlevelOneData().then(responce=>{
        console.log(responce)
           this.leverOneData = responce.data  
      })
    },
    loadingTwoLevel( id ){
      getlevelTwoData({ id: id}).then(responce=>{
        this.levelTwoData = responce.data
      })
    },
    loadingTable( id ){
      this.loading = true
      var item = { id:id, pageSize: this.pageSize, pageNow: this.currentPage}
      getTableList(item).then(responce=>{
        this.tableData = responce.data
        this.totalNumber = responce.total
        this.loading = false
      })
    },
    init () {
      getlevelOneData().then(responce=>{
        // console.log(responce)
        this.loading = true
        this.leverOneData = responce.data  
        if(this.leverOneData.length==0) return
        this.currentRadioId =this.leverOneData[0].id
        this.currentLevelOneId =this.leverOneData[0].id
        getlevelTwoData({ id: this.leverOneData[0].id}).then(responce=>{
          this.levelTwoData = responce.data
          if(this.levelTwoData.length==0){
            this.loading = false 
            return flase
          } 
          this.currentLevelTwoId = this.levelTwoData[0].id
          this.currentPage = 1
          this.loadingTable(this.levelTwoData[0].id)
        })
      })
    },
    submitForm(formName) {
      this.dialogFormVisible = false
      console.log(this.form)
        
      if(this.dataMode == 'edit'){
        // 当前为编辑模式
        editTableList(this.form).then(response => {
          //刷新表格 
          this.currentPage = 1
          this.loadingTable(this.currentLevelTwoId)
        })   
      }else {
        // 当前为添加模式
        if(this.levelNum == 'one'){
          addlevelOneData({name:this.form.name,icon:this.form.icon,attr:0}).then(responce => {
            // 刷新列表
            this.loadingOneLevel()
            this.$message({
              type: 'success',
              message: '操作成功' 
            })
          })
        }else if(this.levelNum == 'two'){
          addlevelTwoData({ name:this.form.name,icon:this.form.icon, attr:this.currentLevelOneId }).then(responce => {
            // 刷新列表
           this.loadingTwoLevel(this.currentLevelOneId)
            this.$message({
              type: 'success',
              message: '操作成功' 
            })
          })
        }else{
          this.$message({
            type: 'error',
            message: '未知错误'
          });       
        }
        // addTableList(this.form).then(response => {
        //   //刷新表格 
        //   this.currentPage = 1
        //   this.loadingTable(this.currentLevelTwoId)
        // })  
      }
    }
  },
  mounted () {
    // 初始化，加载数据
    this.init()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
  .normal_ul{
    list-style: none;
    padding: 0;
    li{
      line-height: 30px;
      padding-right: 10px;
      font-size: 14px;
      color: #606266;
      i{
        color: #409eff;
      }
      span.icon{
        float: right;
      }
      .content_li{
        width: 120px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
      }
    }
    li:hover, li.active{
      background-color: #409eff;
      color: #ffffff;
      i{
        color: #ffffff;
      }
    }
  }
  form.el-form {
    padding-right: 120px;
  }
</style>


