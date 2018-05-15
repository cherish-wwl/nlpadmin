<template>
    <el-dialog :title="dialogTitle" :visible.sync="isVisible" width="75%">
       <el-row>
          <el-form label-position="right" :inline="true" label-width="140px" :model="serverInfo"
          ref="ruleForm"  :rules="rules" >
            <el-form-item label="接入方式：" class="width50" prop="accessWay">
                <el-radio-group v-model="serverInfo.accessWay" @change="changeAccessWay">
                    <!-- 002 -->
                    <el-radio v-for="item in dictList" v-if="item.parentCode =='002'" 
                    :key="item.dictCode" :label="item.dictCode" >
                    {{ item.dictName }}
                    </el-radio>
                    <!-- <el-radio label="提供URL"></el-radio>
                    <el-radio label="部署在我方服务器"></el-radio> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item label="接入状态：" class="width50" prop="accessState">
              <el-select  placeholder="请选择" v-model="serverInfo.accessState">
                 <el-option v-for="item in dictList" v-if="item.parentCode =='003'" 
                :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类型：" class="width50" prop="accessType">
              <el-select  placeholder="请选择" v-model="serverInfo.accessType">
                 <el-option v-for="item in dictList" v-if="item.parentCode =='007'" 
                :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开发模式：" class="width50" prop="accessModel">
              <el-select  placeholder="请选择" v-model="serverInfo.accessModel">
                <el-option v-for="item in dictList" v-if="item.parentCode =='008'" 
                :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务器信息：" class="width100" prop="serverId">
                <el-table
                :data="tableData"
                highlight-current-row
                @current-change="handleCurrentChange"
                border
                height="250"
                style="width: 100%">
                    <el-table-column
                    type="index"
                    width="50">
                    </el-table-column>        
                    <el-table-column prop="innerIp"  label="innerIp"  width="180"> </el-table-column>
                    <el-table-column prop="innerPort"  label="innerPort"  width="180"> </el-table-column>
                    <el-table-column prop="limiteTime"  label="limiteTime"  width="180"> </el-table-column>
                    <el-table-column prop="natAccount"  label="natAccount"  width="180"> </el-table-column>
                    <el-table-column prop="outerIP"  label="outerIP"  width="180"> </el-table-column>
                    <el-table-column prop="outerPort"  label="outerPort"  width="180"> </el-table-column>
                    <el-table-column prop="strategyNo"  label="strategyNo"  width="180"> </el-table-column>
                    <el-table-column prop="REVERSE"  label="REVERSE"  width="180"> </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="部署目录：" class="width50" prop="deployPath">
              <el-input v-model="serverInfo.deployPath" placeholder="请输入部署目录" 
               :disabled="!(serverInfo.accessWay =='002002')"></el-input>
            </el-form-item>
            <el-form-item label="访问地址：" class="width50" prop="visitURL">
              <el-input v-model="serverInfo.visitURL"
              :disabled="serverInfo.accessWay =='002002'" placeholder="请输入访问地址" ></el-input>
            </el-form-item>
            <el-form-item  label="联系人：" class="width50" prop="contactPerson">
               <el-input v-model="serverInfo.contactPerson" placeholder="请选择联系人" ></el-input>
            </el-form-item>
            <el-form-item label="联系人电话：" class="width50" prop="contactTel">
               <el-input v-model="serverInfo.contactTel" placeholder="请输入联系人电话" ></el-input>
            </el-form-item>
            <el-form-item label="泰岳对接人：" class="width50" prop="accessPerson">
                <el-input v-model="serverInfo.accessPerson" placeholder="请输入泰岳对接人" ></el-input>
            </el-form-item>
           
          </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import { serviceEntryInfo, addServer, updateServiceEntryInfo} from '@/api/service.js'
    import { getServerList } from '@/api/server.js'
    import { dictList } from '@/api/common'
    export default {
        props:["dialogFormVisible"],
        data () {
            var checkServerId = (rule, value, callback) => {
                console.log("++++++++++++++++++当前选中的服务器信息++++++++++++++++++++++++++")
                console.log(this.currentRow)
                    if (this.currentRow == null ) {
                        callback(new Error('请选择服务器'));
                    } else {
                        callback();
                    }
              
            };
            return {
                isVisible:this.dialogFormVisible,
                dialogTitle:"编辑接入信息",
                dictList:[],
                serviceId:'',
                serverInfo:{
                    accessWay:'002001',//接入类型
                    accessType:'', 
                    accessState:'',
                    accessModel:'',
                    deployPath:'',
                    visitURL:'',
                    contactPerson:'',
                    contactTel:'',
                    accessPerson:'',
                    accessId:this.serviceId,//服务id
                    serverId:'' //服务器id
                },
                currentRow:null,
                defauleTableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                tableData:[],
                rules:this.urlRules,
                defaultRules: {
                    accessWay: [
                        { required: true, message: '请选择接入方式', trigger: 'change' },
                    ],
                    accessState:[
                        { required: true, message: '请选择接入状态', trigger: 'change' },
                    ],
                    serverId:[
                        { required: true, validator: checkServerId, trigger: 'change' },
                    ],
                    accessType:[
                        { required: true, message: '请选择项目类型', trigger: 'change' },
                    ], 
                    accessModel:[
                        { required: true, message: '请选择开发模式', trigger: 'change' },
                    ],
                    deployPath:[
                        { required: true, message: '请输入部署目录', trigger: 'blur' },
                    ],      
                    contactPerson:[
                        { required: true, message: '请选择联系人', trigger: 'change' },
                    ],
                    contactTel:[
                        { required: true, message: '请输入联系人电话', trigger: 'blur' },
                    ],
                    accessPerson:[
                        { required: true, message: '请输入泰岳对接人', trigger: 'blur' },
                    ],
                   
                },
                urlRules:{
                    accessWay: [
                        { required: true, message: '请选择接入方式', trigger: 'change' },
                    ],
                    accessState:[
                        { required: true, message: '请选择接入状态', trigger: 'change' },
                    ],
                    accessModel:[
                        { required: true, message: '请选择开发模式', trigger: 'change' },
                    ],
                    accessType:[
                        { required: true, message: '请选择项目类型', trigger: 'change' },
                    ], 
                    visitURL:[
                        { required: true, message: '请输入访问地址', trigger: 'blur' },
                    ],
                    contactPerson:[
                        { required: true, message: '请选择联系人', trigger: 'change' },
                    ],
                    contactTel:[
                        { required: true, message: '请输入联系人电话', trigger: 'blur' },
                    ],
                    accessPerson:[
                        { required: true, message: '请输入泰岳对接人', trigger: 'blur' },
                    ],
                }
            }
        },
        watch:{
            dialogFormVisible (val){
                console.log("监听dialogFormVisible："+val)
                this.isVisible = val
                if(val) {
                    // 获取服务接入信息
                    serviceEntryInfo({serviceId:this.$store.state.service.serviceId}).then(response =>{
                        if(response.data != null){
                            this.serverInfo = response.data
                        }
                        
                    })
                    // 获取服务器列表
                    getServerList().then(response =>{
                        this.defauleTableData = response.data
                    })
                }
            },
            isVisible(val) {
                this.$emit("dialogMethod",val)
            }
        },
        methods:{
            changeAccessWay (val) {        
                if(val == "002002"){
                    // 需要部署服务
                    this.rules = this.defaultRules 
                    this.tableData = this.defauleTableData
                }else{
                    this.rules = this.urlRules
                    this.tableData = []
                }
                // 表单重置
                this.$refs['ruleForm'].resetFields()
                this.serverInfo.accessWay = val
            
            },
            closeDialog(val){
                this.isVisible = false
            },
            handleCurrentChange(val) {
                // 当前选中表格的行数据
                console.log("+++++++++++++++++++当前选中表格的行数据+++++++++++++++++++++++")
                console.log(val)
                this.currentRow = val
                this.serverInfo.serverId = val.id
            },
            submitForm (formName){
                // 提交接入信息
                console.log("+++++++++++++++++++保存接入信息+++++++++++++++++++++")
                console.log(this.$store.state.service.serviceId)
                console.log(this.$store.state.service.isEditMode)
                
                this.serverInfo.accessId = this.$store.state.service.serviceId
                console.log(this.serverInfo)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        if(this.$store.state.service.isEditMode){
                            updateServiceEntryInfo(this.serverInfo).then(response =>{
                                this.$message({
                                    message: '保存接入信息成功！',
                                    type: 'success'
                                });
                                this.closeDialog()
                                this.$emit("returnBack")
                            })
                        }else{
                            addServer(this.serverInfo).then(response =>{
                                this.$message({
                                    message: '保存接入信息成功！',
                                    type: 'success'
                                });
                                this.closeDialog()
                                this.$emit("returnBack")
                            })
                        }
                       
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
        },
        mounted (){
            // 默认验证规则
            this.rules = this.urlRules
            console.log(this.dialogFormVisible)
            // 获取字典表所有数据
            dictList().then(response => {
                this.dictList = response.data
            })
            
          
        }
    }
</script>

