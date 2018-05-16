<template>
   <div class="grid-content addServicePanel">
        <div>
          <a class="rebackLink" v-on:click="returnBack">服务列表</a> > 
          <a v-if="type == 0"> 添加服务</a>
          <a v-else >编辑服务</a>
        </div>
        <br />
        <el-row>
          <el-form label-position="right" :inline="true" label-width="140px" ref="ruleForm" :model="serviceInfo" :rules="rules">
            <el-form-item label="服务名称：" class="width50" prop="serviceName">
              <el-input placeholder="请输入服务名称" v-model="serviceInfo.serviceName" ></el-input>    
            </el-form-item>
            <el-form-item label="所属类型：" class="width50" prop="className">
              <el-input v-model="serviceInfo.className" disabled></el-input>
            </el-form-item>
            <el-form-item label="服务描述：" class="width100" prop="serviceDescr">
              <el-input v-model="serviceInfo.serviceDescr" :autosize="{ minRows: 2, maxRows: 6}" type="textarea" placeholder="请输入服务描述"></el-input>
            </el-form-item>
            <el-form-item label="输入参数：" class="width100" prop="in_arg">
              <el-input v-model="serviceInfo.in_arg" :autosize="{ minRows: 2, maxRows: 6}" type="textarea" placeholder="请输入输入参数"></el-input>
            </el-form-item>
            <el-form-item label="服务调用方式：" class="width50" prop="methodType">
                <el-select v-model="serviceInfo.methodType" placeholder="请选择">
                    <el-option v-for="item in dictList" v-if="item.parentCode =='001'" 
                    :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="服务调用路径：" class="width50" prop="url">
              <el-input v-model="serviceInfo.url" placeholder="请输入调用路径" ></el-input>
            </el-form-item>
            
            <el-form-item label="banner路径：" class="width50">
              <el-input v-model="serviceInfo.banner" placeholder="请输入服务调用路径" ></el-input>
            </el-form-item>
            <el-form-item label="图片：" class="width50">
              <el-input v-model="serviceInfo.serviceIcon" placeholder="请输入服务调用路径" ></el-input>
            </el-form-item>
            <el-form-item label="服务状态：" class="width50" prop="serviceState">
                <el-select v-model="serviceInfo.serviceState" placeholder="请选择">
                    <el-option v-for="item in dictList" v-if="item.parentCode =='003' && item.dictCode != '003000'" 
                    :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属学校：" class="width50" prop="academyId">
              <el-select v-model="serviceInfo.academyId" placeholder="请选择" @change="changeAcademy"> 
                <el-option v-for="item in academyList" :key="item.id" :value="item.id" :label="item.academyName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所有者：" class="width50" prop="professorId">
              <el-select v-model="serviceInfo.professorId" placeholder="请选择">
                <el-option v-for="item in academyProfessorList" :label="item.professorName" :key="item.id" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课题组／研究方向：" class="width50" prop="groupId">
              <el-select v-model="serviceInfo.groupId" placeholder="请选择">
                <el-option v-for="item in academyGroupList" :label="item.groupName" :key="item.groupId" :value="item.groupId"></el-option>
              </el-select>
            </el-form-item>
            <h5 class="customModeTitle text_center">自定义模式</h5>
            <div class="customMode" v-for="(relate, index) in serviceInfo.relates" :key="index" >
                <div class="left">
                <el-form-item label="类别" class="width50">
                    <el-select v-model="relate.relateType" placeholder="请选择">
                        <el-option v-for="item in dictList" v-if="item.parentCode =='006'" 
                    :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" class="width50"  >
                    <el-input v-model="relate.title" placeholder="请输入名称" ></el-input>
                </el-form-item>
                <el-form-item label="图标" class="width50"  >
                    <el-input v-model="relate.banner" placeholder="请输入图标" ></el-input>
                </el-form-item>
                <el-form-item label="描述" class="width50" >
                    <el-input v-model="relate.content" placeholder="请输入描述" ></el-input>
                </el-form-item>
                </div>
                <div class="right">
                <a  @click="removeRelate(relate)"><i class="el-icon-close"></i></a>
                </div>
            </div>
            <div class="text_center">
                <el-button size="mini" @click="addRelate" round>添加+</el-button>
            </div>
            <hr />
          </el-form>
        </el-row>
        <el-row>
          <el-button type="text" v-if="type == 1" v-on:click="addServerInfo">编辑接入信息</el-button>
        </el-row>
        <el-row class="text_center">
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button type="primary" plain v-on:click="returnBack">取消</el-button>
        </el-row>
    </div>
</template>
<script>
import { academyList, academyGroupList, academyProfessorList, addService ,getServiceInfo, updataServiceInfo} from '@/api/service.js'
import { dictList } from '@/api/common'
export default {
    props:[
        'currentNode',//当前分类信息
        "type"  //0:添加 1：编辑
        ],
    data () {
        return {
            serviceInfo:{
                class_id:this.currentNode.id,
                serviceName:'',//服务名称
                serviceDescr:'',
                serviceType:this.currentNode.id,//所属类别
                className:this.currentNode.name,
                url:'',
                in_arg:'',
                banner:'',
                serviceIcon:'',
                serviceState:'',
                // academyName:'',
                ServiceInvocationMode:'',
                academyId:'',
                // professorName:'',
                methodType:'',
                professorId:'',
                groupId:'',
                relates:[
                    {
                        relateType:'',
                        title:'',
                        banner:'',
                        content:''
                    }
                ]

            },
            initServiceInfo: {
                class_id:this.currentNode.id,
                serviceName:'',//服务名称
                serviceDescr:'',
                serviceType:this.currentNode.id,//所属类别
                className:this.currentNode.name,
                url:'',
                in_arg:'',
                banner:'',
                serviceIcon:'',
                serviceState:'',
                // academyName:'',
                academyId:'',
                // professorName:'',
                methodType:'',
                professorId:'',
                groupId:"",
                relates:[
                    {
                        relateType:'',
                        title:'',
                        banner:'',
                        content:''
                    }
                ]

            },
            serviceId:'',
            serviceTypeList:[], //所属类别下拉选
            attrType:'', //添加服务- 服务所属类型
            serviceDescr:'', //添加服务- 服务描述
            academyList:[],
            academyGroupList:[],
            academyProfessorList:[],
            dictList:[],
            rules: {
                serviceName: [
                    { required: true, message: '请输入服务名称', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                className:[
                    { required: true, message: '请选择所属类型', trigger: 'change' }
                ],
                methodType:[
                    { required: true, message: '请选择服务调用方式', trigger: 'change' }                     
                ],
                url: [
                    { required: true, message: '请选择服务调用路径', trigger: 'change' }
                ],
                in_arg: [
                    { required: true, message: '请输入输入参数', trigger: 'change' }
                ],
                serviceState:[
                    { required: true, message: '请输入服务状态', trigger: 'change' }
                ],
                academyId:[
                    { required: true, message: '请输入所属学校', trigger: 'change' }
                ],
                professorId:[
                    { required: true, message: '请输入所有者', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 删除自定义模板
        removeRelate(item) {
            var index = this.serviceInfo.relates.indexOf(item)
            if (index !== -1) {
            this.serviceInfo.relates.splice(index, 1)
            }
        },
        // 添加自定义模板
        addRelate() {
            this.serviceInfo.relates.push({
                relateType:'',
                title:'',
                banner:'',
                content:''
            })
        },
        // 返回服务列表
        returnBack(){
            this.$emit("returnBack")
        },
        addServerInfo(){
            console.log("==============添加/编辑接入信息================")
            this.$emit("dialogMethod",true)
        },
        // 保存服务信息
        submitForm (formName){
            console.log("+++++++++++++++++++保存服务信息+++++++++++++++++++++")
            console.log(this.currentNode)
            console.log(this.serviceInfo)
            console.log(this.$store.state.service.serviceId)
            
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    if(this.type == 1){
                        // this.serviceInfo.serviceId = this.$store.state.service.serviceId
                        this.serviceInfo.id = this.$store.state.service.serviceId
                        updataServiceInfo(this.serviceInfo).then(reponse => {
                            
                            console.log(this.$store.state)
                            // 刷新表格
                            this.$emit("reloadingTable")
                            this.$message({
                                message: '保存服务信息成功！',
                                type: 'success'
                            });
                            this.returnBack()
                            
                        })
                    }else{
                        addService(this.serviceInfo).then(reponse => {
                            this.serviceId = reponse.data.id
                            this.$store.dispatch('SetServiceId', this.serviceId)
                            console.log(this.$store.state)
                            // 刷新表格
                            this.$emit("reloadingTable")
                            
                            this.$confirm('服务创建成功，是否维护接入信息', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'info'
                            }).then(() => {
                            this.addServerInfo()
                            }).catch(() => {
                                // 返回服务列表
                                this.returnBack()
                            });
                           
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 改变所属学校 级联更改所有者和课题组／研究方向
        changeAcademy(val){
           // 课题组／研究方向
            academyGroupList({id:val}).then(response => {  
                this.serviceInfo.groupId = ''
                this.academyGroupList = response.data
            })
            // 所有者
            academyProfessorList({academyId:val}).then(response => {
                this.serviceInfo.professorId = ''
                this.academyProfessorList = response.data
            })
        }
    },
    mounted(){
        // 所属学校
        academyList().then(response => {
            this.academyList = response.data
        })
        // 获取字典表所有数据
        dictList().then(response => {
            this.dictList = response.data
        })
        console.log("为编辑状态  获取服务信息详情")
        console.log(this.type)
        if(this.type == 1){
            getServiceInfo({serviceId:this.$store.state.service.serviceId}).then(response =>{
                // 课题组／研究方向
                academyGroupList({id:response.data.academyId}).then(response => {  
                    this.academyGroupList = response.data
                })
                 // 所有者
                academyProfessorList({academyId:response.data.academyId}).then(response => {
                    this.academyProfessorList = response.data
                })
                if(!response.data.groupId){
                    response.data.groupId = ''
                }
                this.serviceInfo = response.data
                console.log(this.serviceInfo)
                this.$store.dispatch('SetHasServerEntry', response.data.hasServerEntry)
            })
        }else{
            this.serviceInfo =this.initServiceInfo
            this.$store.dispatch('SetHasServerEntry', false)
        }
    }
}
</script>
<style  scoped rel="stylesheet/scss" lang="scss">
.rebackLink:hover{
    text-decoration: underline;
    color: #6257eb;
}
.text_center{
    text-align: center;
}
.customMode {
    background-color: #dedef370;
    position: relative;
    padding: 20px 0 0;
    margin-bottom: 20px;
    .right {
        position: absolute;
        right: 0;
        top: 0;
    }
}

.customModeTitle{
    color: #555050;
    position: relative;
    &:before {
        left: 0;
    }

    &:after, &:before {
        content: '';
        position: absolute;
        top: 52%;
        background: #d9d9d9;
        width: 43%;
        height: 2px;
    }
    &:after {
        right: 0;
    }
}
  
</style>

