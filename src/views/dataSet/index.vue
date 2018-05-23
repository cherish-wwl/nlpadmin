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
             <el-table-column prop="name" label="名称" min-width='100'> </el-table-column>
              <!-- <el-table-column prop="type_name" label="type_name" width='100'> </el-table-column> -->
              <el-table-column prop="image" label="图片" min-width='100'> </el-table-column>
              <el-table-column prop="size" label="大小" min-width='100'> </el-table-column>
              <el-table-column prop="uploader" label="上传者" min-width='100'> </el-table-column>
              <el-table-column prop="introduce" label="介绍" min-width='500'> </el-table-column>
              <el-table-column prop="format" label="格式" min-width='100'> </el-table-column>
              <!-- <el-table-column prop="attr" label="attr" width='100'> </el-table-column> -->
              <el-table-column prop="url" label="访问路径" min-width='300'> </el-table-column>
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
      <el-form :model="form" ref="ruleForm">
        <el-form-item 
         v-for="(item,index) in formData" :key="index" 
         :label="item.name+':'" 
         :label-width="item.labelWidth" 
         :prop="item.prop" 
         :rules="item.rules">   
          <el-input v-if="item.isNumber" v-model.number="form[item.prop]" auto-complete="off"></el-input>
          <el-input v-else-if="item.isInput" v-model="form[item.prop]" auto-complete="off"></el-input>
          <el-input v-else-if="item.isTextarea" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" :rows="2" v-model="form[item.prop]" auto-complete="off"></el-input>
          <el-select v-else-if="item.isSelect" v-model="form[item.prop]" placeholder="请选择">
             <el-option v-for="child in dictList" v-if="child.parentCode ==item.parentCode" 
                    :key="child.dictCode" :label="child.dictName" :value="child.dictCode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" >确 定</el-button>
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
      formData:'',
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
      let formData =
        [ 
          {name:'名称',
          prop:'name',
          rules:[
            { required: true, message: '名称不能为空', trigger: 'blur'},
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'图片',
           prop:'image',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'上传者',
           prop:'uploader',
           rules:[
            { required: true, message: '上传者不能为空', trigger: 'blur'}
           ],
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'大小',
           prop:'size',
           labelWidth:'180px',
           isNumber:true,
           rules:[   
            //  { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
             { required: true, message: '请输入大小', pattern: /.+/, trigger: 'blur'},
            { type: 'number', message: '必须是数字'}
           ],
           isInput:true,
           isTextarea:false,
          },
          {name:'介绍',
           prop:'introduce',
           rules:[
            { required: true, message: '介绍不能为空', trigger: 'blur'},
           ],
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'格式',
           prop:'format',
           rules:[
            { required: true, message: '格式不能为空', trigger: 'blur'},
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
           ],
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'访问路径',
           prop:'url',
           rules:[
            { required: true, message: '格式不能为空', trigger: 'blur'},
           ],
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
        ]
      this.form = {
        "name":'',
        // "type_name":"",
        "image":"",
        "size":"",
        "uploader":"",
        "introduce":"",
        "format":"",
        "id":"",
        "typeId": this.currentLevelTwoId,
        "attr":this.currentLevelOneId,
        "url":"", 
      },
      this.formData = formData
      this.levelNum = 'three'
      this.dataMode = 'add'
    },
    editRowData(row){

      console.log( row )
      this.dialogFormVisible = true
      this.dialogTitle = '编辑数据'
      let formData =
        [ 
          {name:'名称',
          prop:'name',
          rules:[
            { required: true, message: '名称不能为空', trigger: 'blur'},
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'图片',
           prop:'image',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'uploader',
           prop:'uploader',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'size',
           prop:'size',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'introduce',
           prop:'introduce',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'format',
           prop:'format',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
          {name:'url',
           prop:'url',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
        ]
     
     
     
      this.form = row
      this.formData = formData
      this.levelNum = 'three'
      
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
        this.dataMode="add"
        let formData =
        [ 
          {name:'名称',
          prop:'name',
          rules:[
            { required: true, message: '名称不能为空', trigger: 'blur'},
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'图标',
           prop:'icon',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
        ]
        let form = {
          name:'',
          icon:''
        }
        this.form = form
        this.formData= formData
    },
    editClick ( item, level ) {
      console.log( item )
      this.dialogFormVisible = true
      this.dialogTitle = '编辑'
      this.levelNum = level
      this.dataMode="edit"
      let formData =
        [ 
          {name:'名称',
          prop:'name',
          rules:[
            { required: true, message: '名称不能为空', trigger: 'blur'},
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'图标',
           prop:'icon',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
        ]
        this.form = item
        this.formData= formData
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
        if(this.leverOneData.length==0) {
          this.loading = false 
          return
        }
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
    
      this.$refs[formName].validate((valid) => {
        if (valid) {
           
          if(this.dataMode == 'edit'){
            // 当前为编辑模式
            if(this.levelNum == 'one'){
              console.log("一级编辑保存")
              editlevelOneData(this.form).then(responce=>{
                // 刷新列表
                this.loadingOneLevel()
                this.$message({
                  type: 'success',
                  message: '操作成功' 
                })
              })
            }else if(this.levelNum == 'two'){
              console.log("二级编辑保存")
              editlevelTwoData( this.form).then(responce=>{
                // 刷新列表
                this.loadingTwoLevel(this.currentLevelOneId)
                this.$message({
                  type: 'success',
                  message: '操作成功' 
                })
              })
            }
            else if(this.levelNum == 'three'){
              console.log("三级编辑保存")
              editTableList(this.form).then(response => {
                //刷新表格 
                this.currentPage = 1
                this.loadingTable(this.currentLevelTwoId)
              })  
            }else{
              this.$message({
                type: 'error',
                message: '未知错误'
              });       
            }
            
          }else {
            // 当前为添加模式
            if(this.levelNum == 'one'){
              console.log("一级添加保存")
              addlevelOneData({name:this.form.name,icon:this.form.icon,attr:0}).then(responce => {
                // 刷新列表
                this.loadingOneLevel()
                this.$message({
                  type: 'success',
                  message: '操作成功' 
                })
              })
            }else if(this.levelNum == 'two'){
              console.log("二级添加保存")
              addlevelTwoData({ name:this.form.name,icon:this.form.icon, attr:this.currentLevelOneId }).then(responce => {
                // 刷新列表
              this.loadingTwoLevel(this.currentLevelOneId)
                this.$message({
                  type: 'success',
                  message: '操作成功' 
                })
              })
            }else if(this.levelNum == 'three'){
              console.log("三级添加保存")
              addTableList(this.form).then(response => {
                //刷新表格 
                this.currentPage = 1
                this.loadingTable(this.currentLevelTwoId)
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
            
          }
          this.dialogFormVisible = false
        }else {
          console.log('error submit!!');
          return false;
        }
      })
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


