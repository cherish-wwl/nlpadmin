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
    
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')" >确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { getList } from '@/api/table'
export default {
  data() {
    return {
      dataMode:'add',
      form:{
        name:'',
        descr:'',
        icon:'',
        // leaf:'',
        p_id:'',
        rec_num:'',
        ser_type:''
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
      nodeInfo: null
    }
  },
  methods: {  
    handleClick(row) {
      console.log(row)
    },
    handleNodeClick(data,resolve) {
      console.log(data)
      this.nodeInfo = data 
      this.currentNodeId = data.id
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
    getList({ id:0, pageSize: this.pageSize, pageNow: this.currentPage}).then(response => {
        this.loading = false
        this.tableData = response.data
        this.totalNumber = response.total
    })
  }
}
</script>
<style  scoped>
 
  .grid-content {
    min-height: 36px;
  }
  form.el-form {
    padding-right: 120px;
  }
</style>
