<template>
  <el-row :gutter="20">
    <br />
    <span>大学/机构：</span>
    <el-select v-model="academyId" v-on:change='querySearch' placeholder="请选择">
       <el-option label="全部" value="">
      </el-option>
      <el-option
        v-for="item in academyList"
        :key="item.id" :label="item.academyName" :value="item.id">
      </el-option>
    </el-select>
    <span>关键字：</span>
    <el-input
      placeholder="请输入关键字"
      suffix-icon="el-icon-search"
      v-model="searchKeyWord"
      v-on:change='querySearch' >
    </el-input>
    <el-button type="primary" @click="addDepartment" size='small'>添加</el-button>
    <br />
    <br />
    <el-table :data="tableData"  border style="width: 100%" v-loading="loading">   
      <el-table-column prop="groupName" label="学院/研究室名称" min-width="180"></el-table-column>      
      <el-table-column prop="groupDesc" label="描述" min-width="350"> 
        <template slot-scope="scope">
          <span :title="scope.row.groupDesc" v-if="scope.row.groupDesc">
              {{ scope.row.groupDesc.substring(0,100) }}
              {{ scope.row.groupDesc.length>=100 ?"...":''}}
              </span>
        </template>
      </el-table-column>
      <el-table-column prop="academyName" label="机构名称" min-width="180"> </el-table-column>
      <el-table-column prop="imageUrl" label="图片" min-width="350"></el-table-column>
      
      <el-table-column label="操作" width="90" fixed="right">
        <template slot-scope="scope">
          <el-button @click="stopDepartment(scope.row)" type="text" size="small">
             {{ scope.row.groupState == '010001' ?"停用":'启用'}}
          </el-button>
          <el-button @click="editDepartment(scope.row)" type="text" size="small">编辑</el-button>
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
          <el-input v-else-if="item.isTextarea" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" :rows="2" v-model="form[item.prop]" auto-complete="off"></el-input>
          <el-select v-else-if="item.isAcademy" v-model="form[item.prop]" placeholder="请选择">
            <el-option 
              v-for="child in academyList"
              :key="child.id" 
              :label="child.academyName" 
              :value="child.id">
            </el-option>
          </el-select>
          <template v-else-if="item.isImage" >
            <el-select v-model="form[item.prop]" placeholder="请选择">
                <el-option v-for="item in imgFileList"
                :key="item.imageId" :label="item.fileDesc" :value="item.imageId"></el-option>
            </el-select>
            <img        
                v-for="item in imgFileList" 
                :key="item.imageId" 
                v-if="form.groupImg == item.imageId"
                :src="item.imageId" class="avatar" />
          </template>
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
import { getSchoolsList, getGrouplist, addGroup, updateGroup,  delGroup } from '@/api/systemManager/organization'
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
      academyList:'',
      searchKeyWord:'',
      dialogFormVisible:false,
      imgFileList:[],
      academyId:'',
      form:{},
      formData:[ 
          {name: '学院/课题组名称',
          prop: 'groupName',
          rules:{ required: true, message: '名称不能为空', trigger: 'blur'},
          labelWidth:'150px',
          isInput:true,
          },
          {name: '学院/课题组描述',
           prop: 'groupDesc',
           labelWidth: '150px',
           isTextarea: true,
          },
          {name: '所属学校',
           prop: 'academyId',
           labelWidth: '150px',
           isAcademy: true,
          },
          {name: '学院/课题组图片',
           prop: 'groupImg',
           labelWidth: '150px',
           isImage: true,
          },
        ],
      dialogTitle:'',
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
      getGrouplist({ 
        pageSize: this.pageSize, 
        pageNow: this.currentPage,
        academyId:this.academyId,
        keyword:this.searchKeyWord}).then(responce =>{
        this.tableData = responce.data
        this.totalNumber = responce.total
        this.loading = false
      })
     
    },
    // 添加部门
    addDepartment(){
      this.form = {
        groupName:'',
        groupDesc:'',
        academyId:'',
        groupImg:'',
        groupId:'',
        id:''
      }
      this.dialogTitle = '添加'
      this.edieMode = false
      this.dialogFormVisible = true
    },
    // 编辑部门
    editDepartment (row) {
      this.form = row
      this.dialogTitle = '编辑'
      this.edieMode = true
       this.dialogFormVisible = true
    },
    // 删除部门
    deleteDepartment(row){   
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        delGroup({id:row.id}).then(response => {
          this.loadingData()
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
    // 启用/停用部门
    stopDepartment(row){   
      let message = '此操作将停用该数据, 是否继续?'
      if(row.groupState != '010001'){//当前为启用状态
        message = '此操作将启用该数据, 是否继续?'
        row.groupState = '010001'
      }else{
        row.groupState = '010002'
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 启用/停用
        updateGroup(row).then(response => {
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
    //提交表单
    submitForm(formName){
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.edieMode){  
            // 编辑
            updateGroup(this.form).then(response => {
              // 初始化页面
              this.loadingData()
              this.dialogFormVisible = false
              this.$message({
                message: '编辑成功！',
                type: 'success'
              })       
            })    
          }else{
            // 添加
            addGroup(this.form).then(response => {
              // 初始化页面
              this.loadingData()
              this.dialogFormVisible = false
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
  mounted () {
    setTimeout(()=>{
      this.loadingData()
      getFileList({ fileType:"013002" }).then(response =>{
        this.imgFileList = response.data
      })
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
