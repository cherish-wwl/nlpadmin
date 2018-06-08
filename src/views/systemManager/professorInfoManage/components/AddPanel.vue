<template>
 <div>
    <br />
    
    <el-row>
      <template v-if="mode =='add'">
        <span>大学/机构：</span>
        <el-select v-model="academyId" v-on:change='triggerGroupQuerySearch' placeholder="请选择">
          <el-option
            v-for="item in academyList"
            :key="item.id" :label="item.academyName" :value="item.id">
          </el-option>
        </el-select>
        <span>学院/研究室：</span>
        <el-select v-model="groupId" v-on:change='triggerProfessorQuerySearch' placeholder="请选择大学/机构">
          <!-- <el-option label="全部" value=""> -->
          <!-- </el-option> -->
          <el-option
            v-for="item in groupList"
            :key="item.id" :label="item.groupName" :value="item.id">
          </el-option>
        </el-select>
        <span>教授/人员：</span>
        <el-select v-model="professorId" v-on:change='querySearch' placeholder="请选择学院/研究室">
          <el-option
            v-for="item in professorList"
            :key="item.id" :label="item.professorName" :value="item.id">
          </el-option>
        </el-select>
        <br />
        <br />
        <span>类别：</span>
        <el-select v-model="classDictCode" v-on:change='querySearch' placeholder="请选择">
          <el-option
            v-for="item in dictList"
            v-if=" item.parentCode == '015'"
            :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
          </el-option>
        </el-select>
      </template>
      <template v-else>
        <span>教授/人员：{{ $store.state.professor.professorName }}</span>
        <span>类别：{{ $store.state.professor.classType }}</span>
      </template>
      <el-button type="primary" @click="saveInfo">保 存</el-button>
      <el-button type="primary" @click="reBack">返回</el-button>
    </el-row>
    <br />
    <editor id="editor_id" height="500px" width="100%" :content="editorText"
      pluginsPath="/static/kindeditor/plugins/"
      :allowImageUpload="true"
      :loadStyleMode="false"
      @on-content-change="onContentChange"
      :items="item"></editor>
    <br />
    <el-row class="text-center">
      <el-button type="primary" @click="saveInfo">保 存</el-button>
      <el-button type="primary" @click="reBack">返回</el-button>
    </el-row>
  </div>
</template>
<script>
import {  getSchoolsList, getGrouplist, getProfessorlist, 
          getProfessorRelateList, addProfessorRelate, updateProfessorRelate} from '@/api/systemManager/organization'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
    'dictList'
    ]),
    mode() {
      return this.$store.state.professor.professorPageState
    }
  },
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
      academyId:'',
      academyList:null,
      groupId:'',
      groupList:null,
      professorId:'',
      professorList:null,
      classDictCode:''
    }
  },
  created () {
    console.log("created" +this.mode )
    if(this.mode =='edit'){
      this.editorText = this.$store.state.professor.content
       console.log(this.$store.state.professor)
      console.log(this.editorText)
    }
  },
  mounted () {
   setTimeout(()=>{
      getSchoolsList().then(responce =>{
        this.academyList = responce.data
      })

    },10)  
  },
  methods: {
    triggerGroupQuerySearch(){
      console.log("grouplsit:"+this.academyId)
      this.groupList = null
      this.groupId = ''
      this.professorList = null
      this.professorId = ''
      getGrouplist({academyId:this.academyId}).then(responce =>{
        this.groupList = responce.data
      })
    },
    triggerProfessorQuerySearch(){
      this.professorList = null
      this.professorId = ''
      getProfessorlist({groupId:this.groupId}).then(responce =>{
        this.professorList = responce.data
      })
    },
    querySearch(){
      // console.log("查询")
      // if(this.professorId == ''){
      //   return
      // }
      // getProfessorRelateList({professorId:this.professorId}).then( res => {
      //   this.editorText =res.data
      // })
    },
    saveInfo(){
      var params
      if(this.mode =="add"){
        if(this.professorId == ''){
          this.$message({
            message: '请选择教练/人员',
            type: 'warning'
          });
          return
        }
        if(this.classDictCode == ''){
          this.$message({
            message: '请选择研究方向',
            type: 'warning'
          });
          return
        }
        if(this.editorText == ''){
          this.$message({
            message: '请填写内容',
            type: 'warning'
          });
          return
        }
        params={
          "professorId": this.professorId,
          "relateDesc": this.editorText,
          "relateType": this.classDictCode
        }
        addProfessorRelate(params).then( res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.reBack()
        })
      }else{
        console.log(this.$store.state.professor)
        params = {
          "id": this.$store.state.professor.professorInfoId,
          "professorId": this.$store.state.professor.professorId,
          "relateDesc": this.editorText,
          "relateType": this.$store.state.professor.classTypeCode
        }
        updateProfessorRelate(params).then( res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.reBack()
        })
      }
     
    },
    reBack(){
      this.$store.dispatch('SetProfessorInfo',{mode:''})
    },
    onContentChange (val) {
      this.editorText = val
    },
  }
}
</script>
