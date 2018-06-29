<template>
  <div>
    <el-select v-model="selectValue" placeholder="请选择" @change="changeValue">
      <el-option 
        v-for="item in imgFileList"
        :key="item.imageId" 
        :label="item.fileDesc" 
        :value="item.imageId">
      </el-option>
    </el-select>
    <img        
      v-for="item in imgFileList" 
      :key="item.imageId" 
      v-if="selectValue == item.imageId"
      :src="item.fileUrl" class="avatar">
     
  </div>
</template>
<script>
import { getFileList } from '@/api/uploadFile.js'
export default {
  props:["dictParentCode","value"],
  watch:{
    value(val){
      console.log("监听")
      if(!val){
        this.selectValue = ''
      }else{
        this.selectValue = val
      }
    }
  },
  data () {
    return {
      selectValue:'',
      imgFileList:[]
    }
  },
  methods:{
    changeValue(val){
      this.$emit("getImgIdMethod",val)
    }
  },
  mounted(){
    console.log(this.dictParentCode)
    console.log(this.value)
    if(!this.value){
      this.selectValue = ''
    }else{
       this.selectValue = this.value
    }
    if(this.dictParentCode){
      // 获取图片列表
      getFileList({ fileType:this.dictParentCode }).then(response =>{
          this.imgFileList = response.data
      })
    }else{

    }
   
  }
}
</script>

