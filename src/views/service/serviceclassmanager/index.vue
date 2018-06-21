<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="grid-content">
        <el-tree
          node-key="id"
          :props="props"
          :load="loadNode"
          lazy
          @node-click="handleNodeClick"
          highlight-current 
          ref='tree'>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="19">
      <div class="grid-content">
       
        <el-button type="primary" @click="addRowData" size='small'>添加</el-button>
        <!-- <p>注：服务分类层数 不能超过3层。</p> -->
        <br />
        <br />
        <el-table :data="tableData"  border style="width: 100%" v-loading="loading">
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="descr" label="描述"> </el-table-column>
          <el-table-column prop="icon" label="图标"> </el-table-column>
          <el-table-column prop="img" label="banner图"> </el-table-column>
          <el-table-column prop="rec_num" label="是否推荐"> </el-table-column>
          <!-- <el-table-column prop="leaf" label="leaf"> </el-table-column> -->
          <!-- <el-table-column prop="p_id" label="p_id"> </el-table-column> -->
          <el-table-column prop="leaf" label="推荐等级">
            <template slot-scope="scope">
              <span 
                v-for="item in recommendList" 
                :key="item.id" 
                v-if="scope.row.leaf == item.id">
                {{ item.name }}
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="ser_type" label="ser_type"> </el-table-column> -->
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button @click="deleteRowData(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述：" :label-width="formLabelWidth">
          <el-input v-model="form.descr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标：" :label-width="formLabelWidth">
          <el-input v-model="form.icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="banner图：" :label-width="formLabelWidth">
         <el-select v-model="form.img" placeholder="请选择">
                    <el-option v-for="form in imgFileList"
                    :key="form.imageId" :label="form.fileDesc" :value="form.imageId"></el-option>
                </el-select>
                <img        
                    v-for="form in imgFileList" 
                    :key="form.imageId" 
                    v-if="form.fileType && form.fileType == form.imageId"
                    :src="form.fileUrl" class="avatar">
        </el-form-item>
        <el-form-item label="是否推荐：" :label-width="formLabelWidth">
          <el-select v-model="form.rec_num" placeholder="请选择">
            <el-option v-for="form in dictList" v-if="form.parentCode =='016'" 
            :key="form.dictCode" :label="form.dictName" :value="form.dictCode"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="leaf" :label-width="formLabelWidth"> -->
          <!-- <el-input v-model="form.leaf" auto-complete="off"></el-input> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item label="父级id：" :label-width="formLabelWidth">
          <el-input v-model="form.p_id" auto-complete="off" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="推荐等级：" :label-width="formLabelWidth">
          <el-select v-model="form.leaf" placeholder="请选择">
              <el-option v-for="item in recommendList" 
              :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="分类类型：" :label-width="formLabelWidth">
          <el-input v-model="form.ser_type" auto-complete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" >确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { getList, addRowData, editRowData, delRowData } from '@/api/table'
import { getFileList } from '@/api/uploadFile.js'
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters([
      'dictList',
      'fileType'
    ])
  },
  data() {
    return {
      recommendList:[
        {
          id:0,
          name:'优先级0'
        },
        {
          id:1,
          name:'优先级1'
        },
        {
          id:2,
          name:'优先级2'
        },
        {
          id:3,
          name:'优先级3'
        },
        {
          id:4,
          name:'优先级4'
        },
        {
          id:5,
          name:'最高级'
        }

      ],
      dataMode:'add',
      form:{
        name:'',
        descr:'',
        icon:'',
        img:'',
        // leaf:'',
        p_id:'',
        rec_num:'',
        ser_type:'',
        leaf:''
      },
      loading: false,
      currentPage: 1,
      totalNumber: null,
      pageSize: 5,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      props: {
          label: 'name',
          children: 'zones'
        },
      count: 1,
      treeData: [],
      dialogTitle:'',
      currentNodeId: 0,
      nodeInfo: null,
      imgFileList:[]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val 
      this.loading = true
      getList({ id:this.currentNodeId, pageSize: this.pageSize, pageNow: 1}).then(response => {
        this.loading = false
        this.tableData = response.data
        this.totalNumber = response.total
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(`当前页: ${this.currentPage}`)
      this.currentPage = val
      this.loading = true
      getList({ id:this.currentNodeId, pageSize: this.pageSize, pageNow: val}).then(response => {
        this.loading = false
        this.tableData = response.data
        this.totalNumber = response.total
      })
    },
    handleClick(row) {
      console.log(row)
    },
    deleteRowData(row){
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delRowData({ id: row.id}).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 刷新树
              console.log(this.$refs.tree.getCurrentNode())
              let currentNode = this.$refs.tree.getCurrentNode()
              if( currentNode == null ){
                currentNode = { id: 0 }
              }
              getList({ id: currentNode.id }).then(response => {
                this.$refs.tree.updateKeyChildren(currentNode.id,response.data)
              })   
              //刷新表格 
              this.refreshTableData(this.currentNodeId)
           
            })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleNodeClick(data,resolve) {
      console.log(data)
    
      this.nodeInfo = data 
      this.currentNodeId = data.id
      this.loading = true
      getList({ id: data.id, pageSize: this.pageSize, pageNow: 1}).then(response => {
          this.loading = false
          this.tableData = response.data
          this.totalNumber = response.total
      })
      
    },
    refreshTableData(NodeId){
      this.loading = true
      getList({ id: NodeId, pageSize: this.pageSize, pageNow: this.currentPage}).then(response => {
          this.loading = false
          this.tableData = response.data
          this.totalNumber = response.total
      })
    },
    loadNode(node, resolve) {
      let sendData
      if (node.level === 0) {
        sendData = { id: 0 }
      }else {
        sendData = { id: node.data.id }
      } 
      getList(sendData).then(response => {
        return resolve(response.data)
      })  
      
    },
    addRowData(){
      console.log(this.currentNodeId.length)
      if(this.currentNodeId.length == 9){
        this.$message({
          message: '当前分类下不能添加分类!',
          type: 'warning'
        })
        return 
      }
      this.dialogFormVisible = true
      this.dialogTitle = '添加数据'
      this.form = { name:'', descr:'',icon:'', p_id:this.currentNodeId, rec_num:'', ser_type:''}
      this.dataMode = 'add'
    },
    editRowData(row){
      console.log( row )
      this.dialogFormVisible = true
      this.dialogTitle = '编辑数据'
      this.form = row
      this.dataMode = 'edit'
    },
    submitForm(formName) {
      this.dialogFormVisible = false
      console.log(this.form)
     
      if(this.dataMode == 'edit'){
        editRowData(this.form).then(response => {
          this.$message({
            type: 'success',
            message: '编辑操作成功!'
          })
          // 刷新树
          console.log(this.$refs.tree.getCurrentNode())
          let currentNode = this.$refs.tree.getCurrentNode()
          if( currentNode == null ){
            currentNode = { id: 0 }
          }
          getList({ id: currentNode.id }).then(response => {
            this.$refs.tree.updateKeyChildren(currentNode.id,response.data)
          })   
         
          //刷新表格 
          this.refreshTableData(this.currentNodeId)
        })   
      }else {
        addRowData(this.form).then(response => {
          this.$message({
            type: 'success',
            message: '添加操作成功!'
          });
          // 刷新树
          console.log(this.$refs.tree.getCurrentNode())
          let currentNode = this.$refs.tree.getCurrentNode()
          if( currentNode == null ){
            currentNode = { id: 0 }
          }
          getList({ id: currentNode.id }).then(response => {
            this.$refs.tree.updateKeyChildren(currentNode.id,response.data)
          })   
         
          //刷新表格 
          this.refreshTableData(this.currentNodeId)
        })  
      }
    }
  },
  mounted () {
   
    // 加载表格
    this.loading = true
    getList({ id:0, pageSize: this.pageSize, pageNow: this.currentPage}).then(response => {
        this.loading = false
        this.tableData = response.data
        this.totalNumber = response.total
    })
     getFileList({ fileType:"013004" }).then(response =>{
        this.imgFileList = response.data
    })
  },updated () {
    // console.log("updated")
    // this.$refs.tree.setCurrentKey(1)
  }
}
</script>
<style  scoped>
  .el-pagination{
    text-align: right;
  }
  .grid-content {
    min-height: 36px;
  }
  form.el-form {
    padding-right: 120px;
  }
</style>
