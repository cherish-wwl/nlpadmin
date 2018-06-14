<template>
  <el-row>
      <el-col>
        <el-button size="mini" @click="returnBack" > <span > >返回</span></el-button>
        <span> {{ edieMode == 1? "添加":"编辑" }}</span>
      </el-col>
      <el-row class="text_right">
        <el-button type="primary" @click="saveInfo">保 存</el-button>
      </el-row>
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
        <editor id="editor_id" height="500px" width="100%" :content="form.groupDesc"
          pluginsPath="/static/kindeditor/plugins/"
          :allowImageUpload="true"
          :loadStyleMode="false"
          @on-content-change="onContentChange"
          :items="item"></editor>

      </el-form>
      <br />
      <br />
      <el-row class="text_center">
        <el-button type="primary" @click="saveInfo">保 存</el-button>
      </el-row>
  </el-row>
</template>
<script>
import { getSchoolsList} from '@/api/systemManager/organization'
import { getFileList } from '@/api/uploadFile.js'
export default {
  props:['edieMode','detailInfo'],
  data () {
    return {
      editorText: '',
      item : [
        'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
        'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
        'anchor', 'link', 'unlink', '|', 'about'
      ],
      form:this.detailInfo,
      formData:[ 
          {name: '学院/课题组名称',
          prop: 'groupName',
          rules:{ required: true, message: '名称不能为空', trigger: 'blur'},
          labelWidth:'150px',
          isInput:true,
          },
          {name: '学院/课题组描述',
           prop: 'groupBriefIntroduction',
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
      academyList:{},
      imgFileList:{}
    }
  },
  methods:{
    saveInfo(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
           this.$emit("submitForm",this.form)
        }else {
          console.log('error submit!!');
          return false;
        }
      })
     
    },
    returnBack(){
      this.$emit('showList')
    },
    onContentChange (val) {
      this.editorText = val
      this.form.groupDesc = val
    },
  },
  mounted(){
      getFileList({ fileType:"013002" }).then(response =>{
        this.imgFileList = response.data
      })
      getSchoolsList().then(responce =>{
        this.academyList = responce.data
      })
  }
  
}
</script>
