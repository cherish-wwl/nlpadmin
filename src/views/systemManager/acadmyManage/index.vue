<template>
  <el-row :gutter="20">
      <el-input
        placeholder="请输入关键字"
        suffix-icon="el-icon-search"
        v-model="searchKeyWord"
        v-on:change='querySearch' >
      </el-input>
      <el-button type="primary" @click="addAcademy" size='small'>添加大学</el-button>
      <br />
      <br />
      <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
        <el-table-column prop="academyName" label="大学/机构名称" min-width="150"> </el-table-column>
        <el-table-column prop="academyDesc" label="大学/机构描述" min-width="350"> 
          <template slot-scope="scope">
            <span :title="scope.row.academyDesc">
               {{ scope.row.academyDesc.substring(0,100) }}
               {{ scope.row.academyDesc.length>=100 ?"...":''}}
               </span>
          </template>
        </el-table-column>
        <el-table-column prop="imageUrl" label="大学/机构图片" min-width="250"></el-table-column>
        <el-table-column prop="academyPhone" label="大学/机构联系电话" min-width="150"></el-table-column>
        <el-table-column prop="academyURL" label="大学/机构主页" min-width="150" > </el-table-column>
        <el-table-column prop="academyUpdateTime" label="更新时间" min-width="150"></el-table-column>       
        <el-table-column label="操作" width="90" fixed="right">
          <template slot-scope="scope">
            <el-button @click="stopAcademy(scope.row)" type="text" size="small">
              {{ scope.row.academyState == '010001' ?"停用":'启用'}}
            </el-button>
            <el-button @click="editAcademy(scope.row)" type="text" size="small">编辑</el-button>
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
          <el-select v-else-if="item.isSelect" v-model="form[item.prop]" placeholder="请选择">
             <el-option v-for="child in dictList" v-if="child.parentCode ==item.parentCode" 
                    :key="child.dictCode" :label="child.dictName" :value="child.dictCode"></el-option>
          </el-select>
          <template v-else-if="item.isImage" >
            <el-select v-model="form[item.prop]" placeholder="请选择">
                <el-option v-for="item in imgFileList"
                :key="item.imageId" :label="item.fileDesc" :value="item.imageId"></el-option>
            </el-select>
            <img        
                v-for="item in imgFileList" 
                :key="item.imageId" 
                v-if="form.academyImg == item.imageId"
                :src="item.fileUrl" class="avatar" />
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
import { getSchoolsList, addAcademy, updateAcademy,  delAcademy } from '@/api/systemManager/organization'
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
      dialogFormVisible:false,
      imgFileList:[],
      form:{},
      formData:[ 
          {name: '大学/机构名称',
          prop: 'academyName',
          rules:{ required: true, message: '名称不能为空', trigger: 'blur'},
          labelWidth:'150px',
          isInput:true,
          },
          {name: '大学/机构描述',
           prop: 'academyDesc',
           labelWidth: '150px',
           isTextarea: true,
          },
          {name: '大学/机构主页',
           prop: 'academyURL',
           labelWidth: '150px',
           isInput: true,
          },
          {name: '大学/机构联系电话',
           prop: 'academyPhone',
           labelWidth: '150px',
           isInput: true,
          },
          {name: '大学/机构图片',
           prop: 'academyImg',
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
      getSchoolsList({ pageSize: this.pageSize, pageNow: this.currentPage,keyword:this.searchKeyWord}).then(responce =>{
        this.tableData = responce.data
        this.totalNumber = responce.total
        this.loading = false
      })
     
    },
    // 添加大学
    addAcademy(){
      this.form = {
        academyName:'',
        academyDesc:'',
        academyURL:'',
        academyPhone:'',
        academyImg:'',
        id:''
      }
      this.dialogTitle = '添加'
      this.edieMode = false
      this.dialogFormVisible = true
    },
    // 编辑大学
    editAcademy (row) {
        // this.$refs['ruleForm'].resetFields();
      this.form = {
        academyName:'',
        academyDesc:'',
        academyURL:'',
        academyPhone:'',
        academyImg:'',
        id:''
      }
      this.form = row   
     
      this.dialogTitle = '编辑'
        this.edieMode = true
        this.dialogFormVisible = true
    },
    // 删除大学
    deleteAcademy(row){   
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        delAcademy({id:row.id}).then(response => {
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
     // 启用/停用大学
    stopAcademy(row){   
      let message = '此操作将停用该数据, 是否继续?'
      if(row.academyState != '010001'){//当前为启用状态
        message = '此操作将启用该数据, 是否继续?'
        row.academyState = '010001'
      }else{
        row.academyState = '010002'
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 启用/停用
        updateAcademy(row).then(response => {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.edieMode){  
            // 编辑机构
            updateAcademy(this.form).then(response => {
              // 初始化页面
              this.loadingData()
              this.dialogFormVisible = false
              this.$message({
                message: '编辑成功！',
                type: 'success'
              })       
            })    
          }else{
            // 添加机构
            addAcademy(this.form).then(response => {
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
      getFileList({ fileType:"013001" }).then(response =>{
        this.imgFileList = response.data
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
