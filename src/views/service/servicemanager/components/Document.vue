<template>
  <el-form  id="documentForm" class="documentForm" ref="documentForm" label-width="140px" label-position="right" :model="documentInfo" :rules="documentRules">
    <el-row class="text_right">
      <el-button type="primary" size="mini" @click="submitForm">保存</el-button>
      <el-button type="primary" size="mini" @click="rebackMethods">取消</el-button>
    </el-row>
    <el-row>
      <h5 class="line-title">接口信息</h5>  
      <el-row>
        <el-form-item label="所属服务："  prop="serviceName">
          <el-input placeholder="请输入服务名称" disabled v-model="documentInfo.serviceName" ></el-input>    
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="请求方法："  prop="httpmethod">
            <el-select placeholder="请选择请求方法" v-model="documentInfo.httpmethod" >
              <el-option label="POST" value="POST"></el-option>
              <el-option label="GET" value="GET"></el-option>
            </el-select>    
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="请求路径："  prop="globalurl">
            <el-input placeholder="请输入请求路径" v-model="documentInfo.globalurl" ></el-input>    
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="接口描述："  prop="interfacetext">
          <el-input placeholder="请输入接口描述" :autosize="{ minRows: 2, maxRows: 10}" type="textarea"  v-model="documentInfo.interfacetext" ></el-input>    
        </el-form-item>
      </el-row>
    </el-row>
    <el-row>
      <h5 class="line-title">请求说明</h5>
      <el-row>
        <el-form-item label="请求参数："  prop="requestdata">
          <el-table 
            :data="documentInfo.requestdata"  
            border style="width: 100%" 
            v-loading="loading"
            ref="requestTable"
            @select="checkedRequestLines">
            <!-- paraname（参数名）	type（参数类型）	value（值:用不上）	explain_（参数描述）	
            needorno（是否必填）	linktype（请求参数/返回参数）	range_（取值范围） -->
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column prop="paraname" label="参数" min-width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.paraname"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" min-width="150">
              <template slot-scope="scope">
                <el-select placeholder="请选择参数类型" v-model="scope.row.type" > 
                  <el-option v-for="(item,index) in typeArray" :key="index" :label="item" :value="item"></el-option> 
                </el-select>   
              </template>
            </el-table-column>
            <el-table-column prop="explain_" label="描述" min-width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.explain_"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="needorno" label="是否必填" min-width="150">
              <template slot-scope="scope">
                <el-select placeholder="请选择是否必填" v-model="scope.row.needorno" > 
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>   
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-row>
            <el-button type="text" @click="addData('request')"> 添加</el-button>
            <el-button type="text" @click="deleteData('request')"> 删除选中行</el-button>
          </el-row>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="请求示例："  prop="bodyexample">
          <el-input placeholder="请输入请求示例" :autosize="{ minRows: 2, maxRows: 10}" type="textarea"  v-model="documentInfo.bodyexample" ></el-input>    
        </el-form-item>
      </el-row>
    </el-row>
    <el-row>
      <h5 class="line-title"><span>返回说明</span></h5>
      <el-row>
        <el-form-item label="返回参数："  prop="backdata">

          <el-table 
            :data="documentInfo.backdata"  
            border 
            style="width: 100%" 
            v-loading="loading"
            ref="backTable"
            @select="checkedBackLines"
            >
            <!-- paraname（参数名）	type（参数类型）	value（值:用不上）	explain_（参数描述）	
            needorno（是否必填）	linktype（请求参数/返回参数）	range_（取值范围） -->
            
            <el-table-column type="selection" width="35"></el-table-column>
            <el-table-column prop="paraname" label="参数" min-width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.paraname" placeholder="请输入参数名"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" min-width="150">
              <template slot-scope="scope">
                <el-select placeholder="请选择参数类型" v-model="scope.row.type" > 
                  <el-option v-for="(item,index) in typeArray" :key="index" :label="item" :value="item"></el-option> 
                </el-select>   
              </template>
            </el-table-column>
            <el-table-column prop="explain_" label="描述" min-width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.explain_" placeholder="请输入参数描述"></el-input>
              </template>
            </el-table-column>
          </el-table>  
          <br />
          <el-row>
              <el-button type="text" @click="addData('back')"> 添加</el-button>
              <el-button type="text" @click="deleteData('back')"> 删除选中行</el-button>
          </el-row>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="返回示例："  prop="backexample">
          <el-input placeholder="请输入请求示例"  :autosize="{ minRows: 2, maxRows: 10}" type="textarea"  v-model="documentInfo.backexample" ></el-input>    
        </el-form-item>
      </el-row>
    </el-row>
    <el-row class="text_center">
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button type="primary" @click="rebackMethods">取消</el-button>
    </el-row>
  </el-form>
  
</template>
<script>
import { getTechDocument, addTechDocument, updateTechDocument } from '@/api/document'
export default {
  props:["serviceInfo"],
  watch:{
    serviceInfo (val){
      console.log("监听servicerInfo")
      console.log(val)
      this.init(val)
    }
  },
  data() {
    return {
      tableData:[],
      typeArray:["Byte","Short","Char","Long","Int","Float","Double","String","Date","Int"],
      loading:false,
      techDocumentExistence:false,
      deleteRequestList:[],
      deleteBackList:[],
      documentInfo:{
        serviceId:'',
        serviceName:'',
        requestdata:[],
        backdata:[]
      },
      documentRules:{
        httpmethod:[
          { required: true, message: '请选择请求方法', trigger: 'change' }
        ],
        globalurl:[
          { required: true, message: '请输入请求方式', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    // 初始化数据
    init(val){
      this.documentInfo.serviceId = val.serviceId
      this.documentInfo.serviceName = val.serviceName
      this.techDocumentExistence =  val.techDocumentExistence
      console.log(this.documentInfo)
      if(this.techDocumentExistence){
        // 已存在文档
        this.loading = true
        getTechDocument({serviceId:val.serviceId}).then( res=>{
          this.loading = false
          this.addTableIndexMethod(res.requestdata)
          this.addTableIndexMethod(res.backdata)
          this.documentInfo = res
        })
      }
      
      // var data = {
      //   serviceId:'',
      //   serviceName:'',
      //   requestdata:[
      //     {
      //       paraname:"name",
      //       type:"String",
      //       explain_:"姓名",
      //       needorno:"是",
      //       linktype:"request"
      //     },
      //     {
      //       paraname:"name",
      //       type:"String",
      //       explain_:"姓名",
      //       needorno:"是",
      //       linktype:"request"
      //     }
      //   ],
      //   backdata:[
      //     {
      //       paraname:"name",
      //       type:"String",
      //       explain_:"姓名",
      //       needorno:"是",
      //       linktype:"back"
      //     }
      //   ]
      // }
      // this.addTableIndexMethod(data.requestdata)
      // this.addTableIndexMethod(data.backdata)
      // this.documentInfo = data
    },
    // 添加一行请求参数/返回参数
    addData(type){
      var appendData
      if(type == "request"){
        appendData = {
          paraname:"",
          type:"",
          explain_:"",
          needorno:"",
          linktype:"request"
        }
      
        this.documentInfo.requestdata.push(appendData)
        this.addTableIndexMethod(this.documentInfo.requestdata)
      }
      if(type == "back"){
         appendData = {
          paraname:"",
          type:"",
          explain_:"",
          linktype:"back"
        }
        this.documentInfo.backdata.push(appendData)
        this.addTableIndexMethod(this.documentInfo.backdata)
      }
      console.log(this.documentInfo)
    },
    // 添加一行请求参数/返回参数
    deleteData(type){

      if(type == "request"){    
        this.deleteRequestList.forEach( element =>{
          this.documentInfo.requestdata.forEach( (element1, index) => {
            if( element.tableIndex == element1.tableIndex){
              this.documentInfo.requestdata.splice(index--,1)
            }
          })
        })
        // 清空选中效果
        this.deleteRequestList = []
        this.$refs.requestTable.clearSelection()
      }
      if(type == "back"){
        this.deleteBackList.forEach( element =>{
          this.documentInfo.backdata.forEach( (element1, index) => {
            if( element.tableIndex == element1.tableIndex){
              this.documentInfo.backdata.splice(index--,1)
            }
          })
        })
        // 清空选中效果
        this.deleteBackList = []
        this.$refs.backTable.clearSelection()
      }
      

    
    },
    // 获取选中的返回参数的数据
    checkedBackLines(val){
      console.log("当前返回选中的有：")
      console.log(val)
      this.deleteBackList = val
    },
    // 获取选中的请求参数的数据
    checkedRequestLines(val){
      console.log("当前请求选中的有：")
      console.log(val)
      this.deleteRequestList = val
    },
     // 给请求参数表格和返回参数表格 数据 添加index 唯一标识  用于删除
    addTableIndexMethod(data){
      console.log("添加index")
      data.forEach((element,index) => {
        console.log(element)
        element.tableIndex = index ++ 
      })
    },
    // 保存技术文档
    submitForm(){
      this.$refs['documentForm'].validate((valid) => {
        if (valid) {
          console.log(this.documentInfo)
          if(this.techDocumentExistence){
            updateTechDocument(this.documentInfo).then( res =>{
              console.log(res)
            })
            
          }else{
            addTechDocument(this.documentInfo).then( res =>{
              console.log(res)
            })
          }
        }
      })
    },
    // 返回上一级
    rebackMethods(){
      this.$emit("fromDocumentMenthod")
    }
  },
  mounted (){
      console.log("______________加载服务文档页面___________________")
      console.log(this.serviceInfo)
      this.init(this.serviceInfo)
  }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.documentForm{
  padding: 0 20px;
  h5.line-title{
    position: relative; 
    padding-left: 10%;    
    &:before{
      content: '';
      position: absolute;
      height: 1px;
      left: 0;
      right: 91%;
      top: 50%;
      background-color: #000;
    }   
    &:after{
      content: '';
      position: absolute;
      height: 1px;
      left: 17%;
      right: 0;
      top: 50%;
      background-color: #000;
    }   
  }
  
}
 
  
</style>

