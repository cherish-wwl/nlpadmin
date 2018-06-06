<template>
  <div class="grid-content">
    <br />
    <span>图片类型：</span>
    <el-select v-model="searchType" v-on:change='querySearch' placeholder="请选择图片类型">
       <el-option label="全部" value="null">
      </el-option>
      <el-option
        v-for="item in dictList"
        v-if="item.parentCode =='013'" 
        :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
      </el-option>
    </el-select>
    <span>图片描述：</span>
    <el-input
      placeholder="请输入图片描述"
      prefix-icon="el-icon-search"
      v-model="searchKey"
      v-on:change='querySearch' 
      @keyup.enter.native="querySearch">
    </el-input>
    <el-button type="primary" @click="querySearch" size='small'> 查询 </el-button>
    &nbsp;
    <el-button type="primary" @click="addRowData('add')" size='small'>添加</el-button>
    <br />
    <br />
    <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
        <el-table-column type="index"  width="50"> </el-table-column>       
        <el-table-column prop="fileDesc"  label="图片名称"  min-width="180"> </el-table-column>
        <el-table-column prop="fileType"  label="图片类别"  min-width="180"> 
          <template slot-scope="scope">
            <span v-for="item in dictList"
              v-if="item.parentCode =='013'&&item.dictCode ==scope.row.fileType" 
              :key="item.dictCode"
              >{{item.dictName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fileUrl"  label="图片"  min-width="180"> 
          <template slot-scope="scope">
            <img :src="scope.row.fileUrl"/>
          </template>
        </el-table-column>
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
    <el-dialog :title="mode=='add'?'添加文件':'编辑文件信息'" :visible.sync="dialogFormVisible" width="40%">
      <el-form label-position="right" label-width="80px" :model="form" ref="ruleForm">
        <el-form-item label="图片类别" prop="fileType">
          <el-select v-model="form.fileType" placeholder="请选择">
            <el-option
              v-for="item in dictList"
              v-if="item.parentCode =='013'" 
              :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            :action="baseUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="uploadFile">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <el-input v-model="form.fileUrl" prop="fileUrl" style="display:none;"></el-input>
          </el-upload>
        </el-form-item>
        <el-form-item label="图片名称">
          <el-input v-model="form.fileDesc" prop="fileDesc" ></el-input>
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
import { getFileList, addFileInfo, updateImgFile, deleteImg} from '@/api/uploadFile.js'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
    'dictList'
    ])
  },
  data () {
    return {
      baseUrl:process.env.BASE_API+'/manage/file/multi/upload',
      imageUrl:"",
      searchType:null,
      searchKey:null,
      loading: false,
      tableData:null,
      currentPage:1,
      pageSize:5,
      totalNumber:0,
      mode:'add',
      dialogFormVisible:false ,
      form:{
        imageId:'',
        fileUrl:'',
        fileType:"",
        fileDesc:""
      },
      initForm:{
        imageId:'',
        fileUrl:'',
        fileType:"",
        fileDesc:""
      },
      rules:{
        fileUrl:{ min: 0, max: 6, message: '长度在 不能超过 6个字符', trigger: 'blur' },
        fileType:{ min: 0, max: 20, message: '长度在 不能超过 20个字符', trigger: 'blur' },
        fileDesc:{ min: 0, max: 6, message: '长度在 不能超过 6个字符', trigger: 'blur' },
     
      }
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if(res.code =="0000"){
        this.form.fileUrl =res.data
      }else{
        
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
          deleteImg({imageId:row.imageId}).then(response => {
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
      this.form = {
        imageId:'',
        fileUrl:'',
        fileType:"",
        fileDesc:""
      }
      this.form = row
      // this.form.fileUrl = row.imageUrl
      // this.form.fileType = row.dictCode
      // this.form.fileDesc = row.imageName
      this.imageUrl = row.fileUrl
      this.mode = mode
      this.dialogFormVisible = true
    },
    addRowData(mode) {
      console.log("addTradesRowData")
      this.mode = mode
      this.imageUrl = null
      this.form = {
        imageId:'',
        fileUrl:'',
        fileType:"",
        fileDesc:""
      }
      this.dialogFormVisible = true
    },
    loadingTableData(){
      // 获取图片列表
      getFileList(
        {
          pageNow:this.currentPage,
          pageSize:this.pageSize,
          fileType:this.searchType,
          fileDesc:this.searchKey
        }).then(response =>{
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
            addFileInfo(this.form).then(response => {
              // 刷新表格
              this.loadingTableData()
              this.closeDialog()
              this.$message({
                message: '保存成功！',
                type: 'success'
              })       
            })
          }else{
            updateImgFile(this.form).then(response => {
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
    
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
  img{
    height: 100px;
  }
  .el-pagination{
    text-align: right;
  }
  .el-input {
    width: 180px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader{
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
       border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
    }
    img{
      // width: 178px;
      height: 178px;
    }
  }
</style>

