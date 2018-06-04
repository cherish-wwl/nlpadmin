<template>
  <div class="grid-content">
    <br />
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="searchKey">
    </el-input>
    <el-button type="primary" @click="addRowData" size='small'>添加</el-button>
    <br />
    <br />
    <el-table :data="tradesTableData"  border style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="name"> </el-table-column>
        <el-table-column prop="descr" label="descr"> </el-table-column>
        <el-table-column prop="icon" label="icon"> </el-table-column>
        <el-table-column prop="leaf" label="leaf"> </el-table-column>
        <el-table-column prop="p_id" label="p_id"> </el-table-column>
        <el-table-column prop="rec_num" label="rec_num"> </el-table-column>
        <el-table-column prop="ser_type" label="ser_type"> </el-table-column>
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
</template>
<script>
export default {
  data () {
    return {
      searchKey:null,
      loading: false,
      tradesTableData:null,
      currentPage:1,
      pageSize:5,
      totalNumber:20
      
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      console.log(`当前页: ${this.currentPage}`)
      this.currentPage = val
     
    },
    deleteRowData(row) {
       console.log(row)
    },
    editRowData(row) {
      console.log(row)
    },
    addRowData() {
      console.log("addTradesRowData")
    }
  }
}
</script>
<style scoped>
  .el-pagination{
    text-align: right;
  }
  .el-input {
    width: 180px;
  }
</style>

