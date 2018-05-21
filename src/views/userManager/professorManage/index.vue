<template>
  <el-row :gutter="20">
    <el-col :span="5">
      
      <div class="grid-content">
        <div class="">
          <el-button type="text" @click="addClick"><i class="el-icon-circle-plus-outline" ></i>新增</el-button>
          <el-button type="text" @click="editClick"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button type="text" @click="deleteClick"><i class="el-icon-delete"></i>删除</el-button>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange" accordion class="collapseDiv">
          <el-collapse-item v-for="item in schoolsList" :class="currentNodeId == 's'+item.id?'active':''" 
          :key="item.id" class="collapseItem" :title="item.academyName" :name="'s'+item.id">
            <ul class="ul-item" v-if="item.children && item.children.length != 0">
              <li v-for="child in item.children" 
              :class="currentNodeId == child.groupId?'active':''" 
              :key="child.groupId" 
              @click="triggerReloadingTable(child)">
                <a>{{child.groupName}}</a>
              </li>  
            </ul>    
            <ul v-else style="list-style:none;">
              
              <li><el-button type="text" @click="addGroup"><i class="el-icon-circle-plus-outline" ></i>新增部门</el-button></li>
            </ul>
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
      <el-button type="primary" @click="addOrUpdateProfessor(0)" size='small'>添加教授</el-button>
      <br />
      <br />
      <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="序号" type="index" align='center'> </el-table-column>
        <el-table-column prop="professorName" label="教授名称" min-width="80"> </el-table-column>
        <el-table-column prop="professorDesc" label="研究主要方向" width="250"> </el-table-column>
        <el-table-column prop="professorSex" label="性别" min-width="150" :formatter="parseSex"> </el-table-column>       
        <el-table-column prop="professorTitle" label="职称" min-width="150"> </el-table-column>

        <el-table-column label="操作" width="90" fixed="right">
          <template slot-scope="scope">
            <el-button @click="deleteProfessor(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="addOrUpdateProfessor(1,scope.row)" type="text" size="small">编辑</el-button>
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
    <!-- 添加/编辑弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%" >
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
             <el-option v-for="child in dictList" v-if="child.parentCode ==item.parentCode" 
                    :key="child.dictCode" :label="child.dictName" :value="child.dictCode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>

<script>
import { getSchoolsList, getGrouplist, getProfessorlist, 
          addAcademy,addGroup, addProfessor,
          updateAcademy, updateGroup,updateProfessor,
          delAcademy,delGroup,delProfessor } from '@/api/systemManager/organization'
import { dictList } from '@/api/common'
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
      academyId:'',
      currentNodeId:'',  // 用于存放 机构id 和部门id，  由于机构id和部门id会一样 故存放机构id时加s ：s+机构id
      currentNode:'',
      dialogFormVisible:false,
      form:{},
      formData:{},
      dialogTitle:'',
      edieMode: false,//false：添加模式  /true： 编辑模式
      isProfessor:false,
      dictList:[]
    }
  },
  
  methods: {
    // 转换男女
    parseSex(row){
      if(!row.professorSex){
        return ''
      } 
      for(let i = 0;i < this.dictList.length; i++){
        if(this.dictList[i].dictCode == row.professorSex){
          return this.dictList[i].dictName
        }
      }
    },
    // 点击学校，加载学院
    handleChange(val){
      console.log("===========点击学校，加载学院=================")
      console.log(val)
      if(val == ''){
        return false
      }
      this.tableData= []
      this.currentPage = 1
      this.totalNumber = 0
      this.currentNodeId = val
      this.academyId = val.substring(1)
      
      for(let i = 0; i< this.schoolsList.length; i++){
          if(this.schoolsList[i].id == this.academyId){
            if(!this.schoolsList[i].children){
              getGrouplist({id:this.academyId}).then(response => {
                this.$set( this.schoolsList[i], 'children', [])
                this.schoolsList[i].children = response.data
              })
              break
            }
          }
        }
    },
    // 点击学院 加载教授
    triggerReloadingTable(item){
      this.currentNodeId = item.groupId
      this.currentNode = item 
      this.currentPage = 1
      this.totalNumber = 0
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
    refreshLoadingData(NodeId){
      this.loading = true 
      getProfessorlist({ groupId: this.currentNodeId, pageSize: this.pageSize, pageNow: this.currentPage,keyword:this.searchKeyWord}).then(responce =>{
        this.tableData = responce.data
        this.totalNumber = responce.total
        this.loading = false
      })
     
    },
    // 当机构下无部门可展示时，添加部门功能
    addGroup(){
      this.isProfessor = false
      // 添加部门
      this.currentNodeId= 0
      this.edieMode = false
      let formData = {}
      let form = {}
      formData =
        [ 
          {name:'部门名称',
          prop:'groupName',
          rules:{ required: true, message: '部门名称不能为空', trigger: 'blur'},
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'部门描述',
           prop:'grouDesc',
           labelWidth:'180px',
           isInput:false,
           isTextarea:true,
          },
        ]
      form = {
        academyId:this.academyId,
        groupName:'',
        grouDesc:''
      }
      this.form = form
      this.formData = formData
      this.dialogTitle = '添加部门'
      this.dialogFormVisible = true   
    },
    // 左侧添加按钮 添加机构/部门
    addClick(){
      this.isProfessor = false
      console.log("左侧添加按钮 添加机构/部门")      
      console.log(this.currentNodeId)
      this.edieMode = false
      let formData = {}
      let form = {}
      if((this.currentNodeId+'').indexOf('s') != -1){
        // 添加机构
        formData =
        [ 
          {name:'机构名称',
          prop:'academyName',
          rules:{ required: true, message: '机构名称不能为空', trigger: 'blur'},
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'机构描述',
           prop:'academyDesc',
           labelWidth:'180px',
           isInput:false,
           isTextarea:true,
          },
          {name:'访问路径',
           prop:'academyURL',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
        ]
        form = {
          academyName:'',
          academyDesc:"",
          academyURL:''
        }
        
        this.dialogTitle = '添加机构'
      }else{
        // 添加部门
        formData =
        [ 
          {name:'部门名称',
          prop:'groupName',
          rules:{ required: true, message: '部门名称不能为空', trigger: 'blur'},
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'部门描述',
           prop:'grouDesc',
           labelWidth:'180px',
           isInput:false,
           isTextarea:true,
          },
        ]
        form = {
          academyId:this.academyId,
          groupName:'',
          grouDesc:''
        }
        this.dialogTitle = '添加部门'  
        
      }
      this.form = form
      this.formData = formData
      this.dialogFormVisible = true     
    },
    // 左侧编辑按钮  编辑机构、部门
    editClick(){
      this.isProfessor = false
      console.log("左侧编辑按钮  编辑机构、部门")      
      console.log(this.currentNodeId)
      if(this.currentNodeId == "s"){
        this.$message({
          message: '请选择机构',
          type: 'info'
        })      
        return 
      }
      this.edieMode = true
      let formData = {} 
      let form = {}
      if((this.currentNodeId+'').indexOf('s') != -1){
        // 添加机构
        formData =
        [ 
          {name:'机构名称',
          prop:'academyName',
          rules:{ required: true, message: '机构名称不能为空', trigger: 'blur'},
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'机构描述',
           prop:'academyDesc',
           labelWidth:'180px',
           isInput:false,
           isTextarea:true,
          },
          {name:'访问路径',
           prop:'academyURL',
           labelWidth:'180px',
           isInput:true,
           isTextarea:false,
          },
        ]
        for(let i = 0; i<this.schoolsList.length; i++){
          if(this.schoolsList[i].id == this.academyId){
            form = this.schoolsList[i]
          }
        }
        this.dialogTitle = '编辑机构'
      }else{
         //编辑部门
        formData =
        [ 
          {name:'部门名称',
          prop:'groupName',
          rules:{ required: true, message: '部门名称不能为空', trigger: 'blur'},
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name:'部门描述',
           prop:'groupDesc',
           labelWidth:'180px',
           isInput:false,
           isTextarea:true,
          },
        ]
        console.log(this.currentNode)
        form = this.currentNode
        form.id = this.currentNodeId
        this.dialogTitle = '编辑部门' 
        
      }
      this.form = form
      this.formData = formData
      this.dialogFormVisible = true 

    },
    //提交表单
    submitForm(formName){
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.edieMode){
            // 编辑模式
            if(this.isProfessor){
              // 教授编辑
              updateProfessor(this.form).then(response => {
                // 初始化页面
                this.currentPage = 1
                this.totalNumber = 0
                this.refreshLoadingData()
                this.dialogFormVisible = false
                this.$message({
                  message: '保存教授成功！',
                  type: 'success'
                })       
              })
              return 
            }
            console.log(this.currentNodeId)
            if((this.currentNodeId+'').indexOf('s') != -1){
              // 编辑机构
              updateAcademy(this.form).then(response => {
                // 初始化页面
                this.init()
                this.dialogFormVisible = false
                this.$message({
                  message: '保存机构成功！',
                  type: 'success'
                })       
              })
            }else{
             
               // 编辑部门
              updateGroup(this.form).then(response => {
                // 初始化页面
                this.init()
                this.dialogFormVisible = false
                this.$message({
                  message: '保存部门成功！',
                  type: 'success'
                })       
              })
            }
           
          }else{
            // 添加模式
            if(this.isProfessor){
              // 教授添加
              addProfessor(this.form).then(response => {
                // 初始化页面
                this.currentPage = 1
                this.totalNumber = 0
                this.refreshLoadingData()
                this.dialogFormVisible = false
                this.$message({
                  message: '保存教授成功！',
                  type: 'success'
                })       
              })
              return 
            }
            console.log(this.currentNodeId)
            if((this.currentNodeId+'').indexOf('s') != -1){
              // 添加机构
              addAcademy(this.form).then(response => {
                // 初始化页面
                this.init()
                this.dialogFormVisible = false
                this.$message({
                  message: '保存机构成功！',
                  type: 'success'
                })       
              })
              
            }else{
              // 添加部门
              addGroup(this.form).then(response => {
                // 初始化页面
                this.init()
                this.dialogFormVisible = false
                this.$message({
                  message: '保存部门成功！',
                  type: 'success'
                })       
              })
            }
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 左侧删除按钮  删除机构、部门
    deleteClick(){
      if(this.currentNodeId == "s"){
        this.$message({
          message: '请选择机构',
          type: 'info'
        })    
         return   
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          if((this.currentNodeId+'').indexOf('s') != -1 ){
            // 删除机构
            delAcademy({id:this.academyId}).then(response => {
              this.init()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
          }else {
            // 删除部门
             delGroup({id:this.currentNodeId}).then(response => {
              this.init()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
          }
        // 删除组织

        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })          
      })
    },
    // 右侧点击添加教授按钮 /点击编辑教授按钮
    addOrUpdateProfessor(type,row){
      if((this.currentNodeId+'').indexOf('s') != -1){
        return false
      }
      this.isProfessor = true
      let formData =  [ 
          {name: '教授名称',
          prop: 'professorName',
          rules:{ required: true, message: '教授名称不能为空', trigger: 'blur'},
          labelWidth:'180px',
          isInput:true,
          isTextarea:false,
          },
          {name: '研究主要方向',
           prop: 'professorDesc',
           labelWidth: '180px',
           isInput: false,
           isTextarea: true,
          },
          {name: '性别',
           prop: 'professorSex',
           labelWidth: '180px',
           isInput: false,
           isTextarea: false,
           isSelect: true,
           parentCode:'009'
          },
          {name: '职称',
           prop: 'professorTitle',
           labelWidth: '180px',
           isInput: true,
           isTextarea: false,
          },
        ]
      this.formData = formData
      if(type == 0){
        // 添加教授
        this.form = {
          professorName:'',
          professorDesc:'',
          professorSex:'',
          professorTitle:'',
          academyId:this.academyId,
          groupId:this.currentNodeId
        }

        this.dialogTitle = '添加教授'
        this.edieMode = false

      }else if(type == 1){
        // 编辑教授
        this.form = row
        this.dialogTitle = '编辑教授'
        this.edieMode = true
      }
      
      this.dialogFormVisible = true
     
    },
    // 删除教授
    deleteProfessor(row){
       
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除教授
        delProfessor({id:row.id}).then(response => {
          this.refreshLoadingData()
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
    init(){
      this.tableData = []
      getSchoolsList().then(response => {
        this.schoolsList = response.data
        if(response.data[0] && response.data != null){
          if(this.academyId != ''){
             this.activeNames = 's'+this.academyId
            this.handleChange('s'+this.academyId)
          }else{
            this.activeNames = 's'+response.data[0].id
            this.handleChange('s'+response.data[0].id)
          }
        }else{
          this.currentNodeId = "s"
        }        
      })
    }
  },
  mounted () {
    this.init()
    // 获取字典表所有数据
    dictList().then(response => {
        this.dictList = response.data
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
  .collapseDiv{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 450px;
    
    ul.ul-item{
      list-style: none;
      padding: 0px;
      li{
        padding: 10px 5px;
        margin-left: 20px;
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
  }
  
</style>
