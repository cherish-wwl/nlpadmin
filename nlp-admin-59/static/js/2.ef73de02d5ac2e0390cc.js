webpackJsonp([2],{"+SKV":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("4YfN"),o=a.n(r),s=a("vLgD");var n=a("p512"),l=a("9rMa"),i={computed:o()({},Object(l.b)(["isEditMode","hasServerEntry","dictList"])),props:["dialogFormVisible"],data:function(){var e=this;return{isVisible:this.dialogFormVisible,dialogTitle:"编辑接入信息",serviceId:"",serverInfo:{accessWay:"002001",accessState:"",accessModel:"",deployPath:"",visitURL:"",contactPerson:"",contactTel:"",accessPerson:"",accessId:this.serviceId,serverId:""},initServerInfo:{accessWay:"002001",accessState:"",accessModel:"",deployPath:"",visitURL:"",contactPerson:"",contactTel:"",accessPerson:"",accessId:this.serviceId,serverId:""},currentRow:null,defauleTableData:[],tableData:[],rules:this.urlRules,defaultRules:{accessWay:[{required:!0,message:"请选择接入方式",trigger:"change"}],accessState:[{required:!0,message:"请选择接入状态",trigger:"change"}],serverId:[{required:!0,validator:function(t,a,r){console.log("++++++++++++++++++当前选中的服务器信息++++++++++++++++++++++++++"),console.log(e.currentRow),null==e.currentRow?r(new Error("请选择服务器")):r()},trigger:"change"}],accessModel:[{required:!0,message:"请选择开发模式",trigger:"change"}],deployPath:[{required:!0,message:"请输入部署目录",trigger:"blur"}],contactPerson:[{required:!0,message:"请选择联系人",trigger:"change"}],contactTel:[{required:!0,message:"请输入联系人电话",trigger:"blur"}],accessPerson:[{required:!0,message:"请输入泰岳对接人",trigger:"blur"}]},urlRules:{accessWay:[{required:!0,message:"请选择接入方式",trigger:"change"}],accessState:[{required:!0,message:"请选择接入状态",trigger:"change"}],accessModel:[{required:!0,message:"请选择开发模式",trigger:"change"}],visitURL:[{required:!0,message:"请输入访问地址",trigger:"blur"}],contactPerson:[{required:!0,message:"请选择联系人",trigger:"change"}],contactTel:[{required:!0,message:"请输入联系人电话",trigger:"blur"}],accessPerson:[{required:!0,message:"请输入泰岳对接人",trigger:"blur"}]}}},watch:{},methods:{changeAccessWay:function(e){var t=this;"002002"==e?(this.rules=this.defaultRules,this.tableData=this.defauleTableData,this.serverInfo.visitURL=""):(this.rules=this.urlRules,this.tableData=[],this.serverInfo.serverId="",this.serverInfo.deployPath=""),this.serverInfo.accessWay=e,this.serverInfo.accessType=this.$store.state.service.accessType,setTimeout(function(){t.$refs.ruleForm.clearValidate()},0)},closeDialog:function(e){this.isVisible=!1},handleCurrentChange:function(e){console.log("+++++++++++++++++++当前选中表格的行数据+++++++++++++++++++++++"),console.log(e),this.currentRow=e,this.serverInfo.serverId=e.id},submitForm:function(e){var t=this;console.log("+++++++++++++++++++保存接入信息+++++++++++++++++++++"),console.log(this.hasServerEntry),this.serverInfo.accessId=this.$store.state.service.serviceId,console.log(this.serverInfo),this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.$store.state.service.isEditMode&&t.hasServerEntry?updateServiceEntryInfo(t.serverInfo).then(function(e){t.$message({message:"保存接入信息成功！",type:"success"}),t.closeDialog(),t.$emit("returnBack")}):addServerInfo(t.serverInfo).then(function(e){t.$message({message:"保存接入信息成功！",type:"success"}),t.closeDialog(),t.$emit("returnBack")})})}},mounted:function(){}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",[a("el-form",{ref:"ruleForm",attrs:{"label-position":"right",inline:!0,"label-width":"140px",model:e.serverInfo,rules:e.rules}},[a("el-form-item",{staticClass:"width50",attrs:{label:"接入方式：",prop:"accessWay"}},[a("el-radio-group",{on:{change:e.changeAccessWay},model:{value:e.serverInfo.accessWay,callback:function(t){e.$set(e.serverInfo,"accessWay",t)},expression:"serverInfo.accessWay"}},e._l(e.dictList,function(t){return"002"==t.parentCode?a("el-radio",{key:t.dictCode,attrs:{label:t.dictCode}},[e._v("\n                "+e._s(t.dictName)+"\n                ")]):e._e()}))],1),e._v(" "),a("el-form-item",{staticClass:"width50",attrs:{label:"接入状态：",prop:"accessState"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.serverInfo.accessState,callback:function(t){e.$set(e.serverInfo,"accessState",t)},expression:"serverInfo.accessState"}},e._l(e.dictList,function(t){return"003"==t.parentCode?a("el-option",{key:t.dictCode,attrs:{label:t.dictName,value:t.dictCode}}):e._e()}))],1),e._v(" "),a("el-form-item",{staticClass:"width50",attrs:{label:"开发模式：",prop:"accessModel"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.serverInfo.accessModel,callback:function(t){e.$set(e.serverInfo,"accessModel",t)},expression:"serverInfo.accessModel"}},e._l(e.dictList,function(t){return"008"==t.parentCode?a("el-option",{key:t.dictCode,attrs:{label:t.dictName,value:t.dictCode}}):e._e()}))],1),e._v(" "),a("el-form-item",{staticClass:"width100",attrs:{label:"服务器信息：",prop:"serverId"}},[a("el-table",{ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"highlight-current-row":"",border:"",height:"250"},on:{"current-change":e.handleCurrentChange}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"innerIP",label:"innerIP",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"innerPort",label:"innerPort",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"limitTime",label:"limitTime",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"natAccount",label:"natAccount",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"outerIP",label:"outerIP",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"outerPort",label:"outerPort",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"strategyNo",label:"strategyNo",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"reverse",label:"reverse",width:"180"}})],1)],1),e._v(" "),a("el-form-item",{staticClass:"width50",attrs:{label:"部署目录：",prop:"deployPath"}},[a("el-input",{attrs:{placeholder:"请输入部署目录",disabled:!("002002"==e.serverInfo.accessWay)},model:{value:e.serverInfo.deployPath,callback:function(t){e.$set(e.serverInfo,"deployPath",t)},expression:"serverInfo.deployPath"}})],1),e._v(" "),a("el-form-item",{staticClass:"width50",attrs:{label:"访问地址：",prop:"visitURL"}},[a("el-input",{attrs:{disabled:"002002"==e.serverInfo.accessWay,placeholder:"请输入访问地址"},model:{value:e.serverInfo.visitURL,callback:function(t){e.$set(e.serverInfo,"visitURL",t)},expression:"serverInfo.visitURL"}})],1),e._v(" "),a("el-form-item",{staticClass:"width50",attrs:{label:"联系人：",prop:"contactPerson"}},[a("el-input",{attrs:{placeholder:"请选择联系人"},model:{value:e.serverInfo.contactPerson,callback:function(t){e.$set(e.serverInfo,"contactPerson",t)},expression:"serverInfo.contactPerson"}})],1),e._v(" "),a("el-form-item",{staticClass:"width50",attrs:{label:"联系人电话：",prop:"contactTel"}},[a("el-input",{attrs:{placeholder:"请输入联系人电话"},model:{value:e.serverInfo.contactTel,callback:function(t){e.$set(e.serverInfo,"contactTel",t)},expression:"serverInfo.contactTel"}})],1),e._v(" "),a("el-form-item",{staticClass:"width50",attrs:{label:"泰岳对接人：",prop:"accessPerson"}},[a("el-input",{attrs:{placeholder:"请输入泰岳对接人"},model:{value:e.serverInfo.accessPerson,callback:function(t){e.$set(e.serverInfo,"accessPerson",t)},expression:"serverInfo.accessPerson"}})],1)],1)],1)},staticRenderFns:[]};var d=a("/Xao")(i,c,!1,function(e){a("g+eZ")},null,null).exports,u={computed:o()({},Object(l.b)(["dictList"])),components:{EntryInfo:d},data:function(){return{hasEntryInfo:!1,showEntryInfo:!1,searchKey:null,loading:!1,tableData:null,currentPage:1,pageSize:5,totalNumber:0,mode:"add",dialogFormVisible:!1,form:{academyId:"",academyName:"",acceptTime:"",forwardType:"",solutionDesc:"",solutionIcon:"",solutionId:"",solutionName:"",solutionUrl:""},initForm:{academyId:"",academyName:"",acceptTime:"",forwardType:"",solutionDesc:"",solutionIcon:"",solutionId:"",solutionName:"",solutionUrl:""},formData:[{name:"标题",prop:"solutionName",rules:{required:!0,message:"标题不能为空",trigger:"blur"},labelWidth:"180px",isInput:!0,isTextarea:!1},{name:"描述",prop:"solutionDesc",labelWidth:"180px",isInput:!0,isTextarea:!1},{name:"图片",prop:"solutionIcon",labelWidth:"180px",isInput:!0,isTextarea:!1},{name:"机构名称",prop:"academyId",labelWidth:"180px",isInput:!1,isTextarea:!1,isSelect:!0,isDict:!1,isAcademy:!0},{name:"访问路径",prop:"solutionUrl",labelWidth:"180px",isInput:!0,isTextarea:!1},{name:"跳转方式",prop:"forwardType",labelWidth:"180px",isDict:!0,isAcademy:!1,parentCode:"011",isInput:!1,isTextarea:!1,isSelect:!0},{name:"接入时间",prop:"acceptTime",labelWidth:"180px",isInput:!0,isTextarea:!1}],academyList:""}},methods:{transferforwardType:function(e){if(!e.forwardType)return"";for(var t=0;t<this.dictList.length;t++)if(this.dictList[t].dictCode==e.forwardType)return this.dictList[t].dictName;return""},querySearch:function(){console.log("===================查询关键字======================"),console.log(this.searchKey),this.loadingTableData()},handleSizeChange:function(e){console.log("每页 "+e+" 条"),this.pageSize=e,this.currentPage=1,this.loadingTableData()},handleCurrentChange:function(e){console.log("当前页: "+e),console.log("当前页: "+this.currentPage),this.currentPage=e,this.loadingTableData()},deleteRowData:function(e){var t=this;console.log(e),this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a;(a={solutionId:e.solutionId},Object(s.a)({url:"/solution/delSolution",method:"post",params:a})).then(function(e){t.loadingTableData(),t.$message({type:"success",message:"删除成功!"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},editRowData:function(e,t){console.log(t),this.form=t,this.mode=e,this.dialogFormVisible=!0},addRowData:function(e){console.log("添加"),this.mode=e,this.form=this.initForm,this.dialogFormVisible=!0,this.hasEntryInfo=!1},loadingTableData:function(){var e,t=this;(e={pageNow:this.currentPage,pageSize:this.pageSize,keyword:this.searchKey},Object(s.a)({url:"/solution/list",method:"post",params:e})).then(function(e){t.tableData=e.data,t.totalNumber=e.total})},closeDialog:function(){this.dialogFormVisible=!1,this.$refs.ruleForm.resetFields()},submitForm:function(e){var t=this;console.log(this.form),this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var a;"add"==t.mode?(a=t.form,Object(s.a)({url:"/solution/addSolution",method:"post",data:a})).then(function(e){t.loadingTableData(),t.closeDialog(),t.$message({message:"保存成功！",type:"success"})}):function(e){return Object(s.a)({url:"/solution/updateSolution",method:"post",params:e})}(t.form).then(function(e){t.loadingTableData(),t.closeDialog(),t.$message({message:"保存成功！",type:"success"})})})}},mounted:function(){var e=this;this.loadingTableData(),Object(n.i)().then(function(t){e.academyList=t.data})}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"grid-content"},[a("br"),e._v(" "),a("el-input",{attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search"},on:{change:e.querySearch},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.querySearch(t)}},model:{value:e.searchKey,callback:function(t){e.searchKey=t},expression:"searchKey"}}),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.addRowData("add")}}},[e._v("添加")]),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{prop:"solutionId",label:"序号",type:"index",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"solutionName",label:"标题","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"solutionDesc",label:"描述","min-width":"280"}}),e._v(" "),a("el-table-column",{attrs:{prop:"solutionIcon",label:"图片","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"academyName",label:"机构名称","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"forwardType",label:"跳转方式","min-width":"150",formatter:e.transferforwardType}}),e._v(" "),a("el-table-column",{attrs:{prop:"acceptTime",label:"接入时间","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"solutionUrl",label:"访问路径","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"90",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteRowData(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.editRowData("edit",t.row)}}},[e._v("编辑")])]}}])})],1),e._v(" "),a("br"),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,15,30],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalNumber},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:"add"==e.mode?"添加":"机构",visible:e.dialogFormVisible,width:"75%"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.form,inline:!0,"label-width":"140px","label-position":"right"}},e._l(e.formData,function(t,r){return a("el-form-item",{key:r,staticClass:"width50",attrs:{label:t.name+":",prop:t.prop,rules:t.rules}},[t.isInput?a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form[t.prop],callback:function(a){e.$set(e.form,t.prop,a)},expression:"form[item.prop]"}}):e._e(),e._v(" "),t.isTextarea?a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:6},rows:2,"auto-complete":"off"},model:{value:e.form[t.prop],callback:function(a){e.$set(e.form,t.prop,a)},expression:"form[item.prop]"}}):e._e(),e._v(" "),t.isSelect?a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form[t.prop],callback:function(a){e.$set(e.form,t.prop,a)},expression:"form[item.prop]"}},[e._l(e.academyList,function(r){return t.isAcademy?a("el-option",{key:r.id,attrs:{label:r.academyName,value:r.id}}):e._e()}),e._v(" "),t.isDict?e._l(e.dictList,function(r){return r.parentCode==t.parentCode?a("el-option",{key:r.dictCode,attrs:{label:r.dictName,value:r.dictCode}}):e._e()}):e._e()],2):e._e()],1)})),e._v(" "),a("el-checkbox",{model:{value:e.showEntryInfo,callback:function(t){e.showEntryInfo=t},expression:"showEntryInfo"}},[e._v(e._s(1==e.hasEntryInfo?"编辑接入信息":"添加接入信息"))]),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),a("br"),e._v(" "),e.showEntryInfo?a("entry-info"):e._e(),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.closeDialog}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var m=a("/Xao")(u,p,!1,function(e){a("zO5Q")},"data-v-3f5247b2",null);t.default=m.exports},"08RK":function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"\n.el-pagination[data-v-3f5247b2] {\n  text-align: right;\n}\n.el-input[data-v-3f5247b2], .el-select[data-v-3f5247b2] {\n  width: 230px;\n}\n.width50[data-v-3f5247b2] {\n  width: 48%;\n}\n.width100[data-v-3f5247b2] {\n  width: 100%;\n}\n.width100 .el-form-item__content[data-v-3f5247b2] {\n    width: 77.5%;\n}\nlabel.el-checkbox[data-v-3f5247b2] {\n  margin-left: 72px;\n}\n",""])},UJuC:function(e,t,a){(e.exports=a("BkJT")(!1)).push([e.i,"",""])},"g+eZ":function(e,t,a){var r=a("UJuC");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("8bSs")("88bb025a",r,!0)},p512:function(e,t,a){"use strict";t.i=function(){return Object(r.a)({url:"/academy/list",method:"post"})},t.g=function(e){return Object(r.a)({url:"/academy/grouplist",method:"post",params:e})},t.h=function(e){return Object(r.a)({url:"/academy/professorlist",method:"post",params:e})},t.a=function(e){return Object(r.a)({url:"/academy/addAcademy",method:"post",params:e})},t.j=function(e){return Object(r.a)({url:"/academy/updateAcademy",method:"post",data:e})},t.d=function(e){return Object(r.a)({url:"/academy/delAcademy",method:"post",params:e})},t.b=function(e){return Object(r.a)({url:"/academy/addGroup",method:"post",params:e})},t.k=function(e){return Object(r.a)({url:"/academy/updateGroup",method:"post",data:e})},t.e=function(e){return Object(r.a)({url:"/academy/delGroup",method:"post",params:e})},t.c=function(e){return Object(r.a)({url:"/academy/addProfessor",method:"post",params:e})},t.l=function(e){return Object(r.a)({url:"/academy/updateProfessor",method:"post",data:e})},t.f=function(e){return Object(r.a)({url:"/academy/delProfessor",method:"post",params:e})};var r=a("vLgD")},zO5Q:function(e,t,a){var r=a("08RK");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("8bSs")("d318dec8",r,!0)}});