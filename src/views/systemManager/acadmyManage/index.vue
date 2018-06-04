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
        <el-table-column prop="id" label="序号" type="index" align='center'> </el-table-column>
        <el-table-column prop="academyName" label="名称" min-width="80"> </el-table-column>
        <el-table-column prop="academyDesc" label="描述" min-width="350"> 
          <template slot-scope="scope">
            <span :title="scope.row.academyDesc">
               {{ scope.row.academyDesc.substring(0,100) }}
               {{ scope.row.academyDesc.length>=100 ?"...":''}}
               </span>
          </template>
        </el-table-column>
        <el-table-column prop="academyURL" label="访问地址" min-width="150" > </el-table-column>       
        <el-table-column label="操作" width="90" fixed="right">
          <template slot-scope="scope">
            <el-button @click="deleteAcademy(scope.row)" type="text" size="small">删除</el-button>
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
import { getSchoolsList, addAcademy, updateAcademy,  delAcademy } from '@/api/systemManager/organization'
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
      form:{},
      formData:[ 
          {name: '大学名称',
          prop: 'academyName',
          rules:{ required: true, message: '名称不能为空', trigger: 'blur'},
          labelWidth:'150px',
          isInput:true,
          isTextarea:false,
          },
          {name: '描述',
           prop: 'academyDesc',
           labelWidth: '150px',
           isInput: false,
           isTextarea: true,
          },
          {name: '访问路径',
           prop: 'academyURL',
           labelWidth: '150px',
           isInput: true,
           isTextarea: false,
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
        id:''
      }
      this.dialogTitle = '添加人员'
      this.edieMode = false
      this.dialogFormVisible = true
    },
    // 编辑大学
    editAcademy (row) {
      this.form = row
      this.dialogTitle = '编辑人员'
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
        // 删除人员
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
