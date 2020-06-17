webpackJsonp([15],{"8GhE":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s("zL8q");var a,r=s("t4zo"),l=s.n(r),o=s("uXZL"),i=s.n(o),n=(a=0,function(e,t){clearTimeout(a),a=setTimeout(e,t)}),u={inject:["reload"],data:function(){return{allListData:[],adminData:[],userEmailData:[],selectedOptions:[],dialogTableVisible:!1,dialogFormVisible:!1,dialogFormVisibleAdd:!1,searchValue:"",form:{userId:"",useruserName:"",userPass:"",userPhone:"",userEmail:"",status:""},count:"",page_size:6,currentPage:1,status:1,rules:{userIdAdd:[{required:!0,message:"请输入工号",trigger:"blur"},{min:5,max:5,message:"请输入完整工号",trigger:"blur"}],userNameAdd:[{required:!0,message:"请输入姓名",trigger:"blur"}],userPassAdd:[{required:!0,message:"请输入密码",trigger:"blur"}],userPhoneAdd:[{required:!0,message:"请输入手机号",trigger:"blur"}],userEmailAdd:[{type:"email",required:!0,message:"请输入邮箱",trigger:"blur"}]}}},created:function(){this.getList(),this.allList()},watch:{searchValue:function(){var e=this;n(function(){e.getList()},300)}},methods:{allList:function(){var e=this;this.$http.post("/api/user/alladminList").then(function(t){e.allListData=t.data})},outExe:function(){var e=this;this.$confirm("是否导出管理信息表?","提示",{confirmButtonText:"确定导出",cancelButtonText:"取消",type:"warning"}).then(function(){e.exportExcel()}).catch(function(){})},exportExcel:function(){this.pagesize="30",this.currentPage="1",this.$nextTick(function(){var e=i.a.utils.table_to_book(document.querySelector("#listTable")),t=i.a.write(e,{bookType:"xlsx",bookSST:!0,type:"array"});try{l.a.saveAs(new Blob([t],{type:"application/octet-stream"}),"学生信息表.xlsx")}catch(e){"undefined"!=typeof console&&console.log(e,t)}return this.pagesize="10",t})},getList:function(){var e=this,t=this.searchValue;this.$http.post("/api/user/adminList",{userId:t,begin:0,end:6},{}).then(function(t){e.adminData=t.data}),this.$http.post("/api/user/adminCount",{userId:t}).then(function(t){e.count=t.data})},statusChange:function(e,t){"超级管理员"===t.userType&&(this.$message({message:"请勿对超级管理员进行权限操作!",type:"warning"}),t.status="1",this.reload());var s=t.userId,a=t.status;this.$http.post("/api/user/statusUpdate",{userId:s,status:a}).then(function(e){console.log(e)})},handleChange:function(e,t){this.form.userId=t.userId,this.form.userName=t.userName,this.form.userPass=t.userPass,this.form.userPhone=t.userPhone,this.form.userEmail=t.userEmail,"1"==t.status?this.form.userType="超级管理员":this.form.userType="普通管理员"},InfoUpdate:function(){var e=this,t=this.form.userId,s=this.form.userName,a=this.form.userPass,r=this.form.userPhone,l=this.form.userEmail,o=this.form.userType;this.$http.post("/api/user/adminUpdate",{userId:t,userName:s,userPass:a,userPhone:r,userEmail:l,userType:o},{}).then(function(t){console.log(t),t?(e.$message({message:"修改成功",type:"info"}),e.reload()):e.$message({message:"修改失败",type:"warning"})})},InfoAdd:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var s=t.form.userIdAdd,a=t.form.userNameAdd,r=t.form.userPassAdd,l=t.form.userPhoneAdd,o=t.form.userEmailAdd,i=t.form.userTypeAdd;t.$http.post("/api/user/adminAdd",{userId:s,userName:a,userPass:r,userPhone:l,userEmail:o,userType:i,status:1}).then(function(e){e.status?(t.$message({message:"增加成功",type:"success"}),t.reload()):t.$message({message:"增加失败",type:"warning"})}),t.dialogFormVisibleAdd=!1}})},handleDelete:function(e,t){var s=this;this.$confirm("删除将不可恢复，是否确定删除"+t.userName+"的信息？","删除提醒",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.$http.post("/api/user/adminDel",{userId:t.userId}).then(function(e){e.status?(s.$message({message:"删除"+t.userName+"信息成功",type:"success"}),s.reload()):s.$message({message:"删除"+t.userName+"信息失败",type:"warning"})})}).catch(function(){})},handleCurrentChange:function(e){var t=this,s=this.$refs.search.value;this.$http.post("/api/user/adminList",{userId:s,begin:6*e-6,end:6},{}).then(function(e){t.adminData=e.data})}}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"block"},[s("el-header",{staticClass:"admin_stration"},[s("el-form",{attrs:{model:e.form,inline:""}},[s("ElFormItem",{attrs:{label:"输入学生学号："}},[s("el-input",{ref:"search",attrs:{placeholder:"请输入学生学号","suffix-icon":"el-icon-search"},model:{value:e.searchValue,callback:function(t){e.searchValue="string"==typeof t?t.trim():t},expression:"searchValue"}})],1),e._v(" "),s("el-button",{staticClass:"adminAdd",attrs:{type:"info",icon:"el-icon-circle-plus",round:"",plain:""},on:{click:function(t){e.dialogFormVisibleAdd=!0}}},[e._v("增加信息")]),e._v(" "),s("el-button",{staticStyle:{"margin-left":"480px"},attrs:{icon:"el-icon-download",round:"",plain:"",type:"success"},on:{click:function(t){e.outExe()}}},[e._v("导出")])],1)],1),e._v(" "),s("el-table",{staticClass:"listTable",staticStyle:{width:"100%"},attrs:{data:e.adminData}},[s("el-table-column",{attrs:{prop:"userId",label:"工号",align:"center",width:"100px",sortable:""}}),e._v(" "),s("el-table-column",{attrs:{prop:"userName",label:"姓名",align:"center",width:"100px"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userPass",label:"密码",align:"center",width:"150px"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userPhone",label:"联系方式",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userEmail",label:"电子邮箱",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userType",label:"账号类型",align:"center",width:"110px"}}),e._v(" "),s("el-table-column",{attrs:{prop:"status",label:"权限",align:"center",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-switch",{attrs:{"active-text":"启用","inactive-text":"禁用","active-value":1,"inactive-value":0},on:{change:function(s){e.statusChange(t.$index,t.row)}},model:{value:t.row.status,callback:function(s){e.$set(t.row,"status",s)},expression:"scope.row.status"}})]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作",align:"center",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini",round:""},on:{click:function(s){e.dialogFormVisible=!0,e.handleChange(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),s("el-button",{attrs:{size:"mini",type:"danger",round:""},on:{click:function(s){e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),s("div",{staticClass:"page"},[s("el-pagination",{attrs:{"hide-on-single-page":!0,"current-page":e.currentPage,layout:"total, prev, pager, next, jumper",total:e.count,"page-size":e.page_size},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),s("el-dialog",{attrs:{title:"修改信息",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[s("el-form",{attrs:{model:e.form,inline:""}},[s("el-form-item",{attrs:{label:"用户工号",prop:"userId"}},[s("el-input",{ref:"userId",attrs:{autocomplete:"off",disabled:""},model:{value:e.form.userId,callback:function(t){e.$set(e.form,"userId",t)},expression:"form.userId"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"用户姓名",prop:"useruserName"}},[s("el-input",{ref:"userName",attrs:{autocomplete:"off"},model:{value:e.form.userName,callback:function(t){e.$set(e.form,"userName",t)},expression:"form.userName"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"用户密码",prop:"userPass"}},[s("el-input",{ref:"userPass",attrs:{autocomplete:"off"},model:{value:e.form.userPass,callback:function(t){e.$set(e.form,"userPass",t)},expression:"form.userPass"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"联系方式",prop:"userPhone"}},[s("el-input",{ref:"phone",attrs:{autocomplete:"off"},model:{value:e.form.userPhone,callback:function(t){e.$set(e.form,"userPhone",t)},expression:"form.userPhone"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"电子邮箱",prop:"userEmail"}},[s("el-input",{ref:"status",attrs:{autocomplete:"off"},model:{value:e.form.userEmail,callback:function(t){e.$set(e.form,"userEmail",t)},expression:"form.userEmail"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"账号类型",prop:"userType"}},[s("el-select",{model:{value:e.form.userType,callback:function(t){e.$set(e.form,"userType",t)},expression:"form.userType"}},[s("el-option",{attrs:{label:"超级管理员",value:"超级管理员"}}),e._v(" "),s("el-option",{attrs:{label:"普通管理员",value:"普通管理员"}})],1)],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1,e.InfoUpdate()}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-dialog",{attrs:{title:"增加信息",visible:e.dialogFormVisibleAdd},on:{"update:visible":function(t){e.dialogFormVisibleAdd=t}}},[s("el-form",{ref:"formAdd",attrs:{model:e.form,inline:"",rules:e.rules}},[s("el-form-item",{attrs:{label:"用户工号",prop:"userIdAdd"}},[s("el-input",{model:{value:e.form.userIdAdd,callback:function(t){e.$set(e.form,"userIdAdd",t)},expression:"form.userIdAdd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"用户姓名",prop:"userNameAdd"}},[s("el-input",{model:{value:e.form.userNameAdd,callback:function(t){e.$set(e.form,"userNameAdd",t)},expression:"form.userNameAdd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"用户密码",prop:"userPassAdd"}},[s("el-input",{model:{value:e.form.userPassAdd,callback:function(t){e.$set(e.form,"userPassAdd",t)},expression:"form.userPassAdd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"联系方式",prop:"userPhoneAdd"}},[s("el-input",{model:{value:e.form.userPhoneAdd,callback:function(t){e.$set(e.form,"userPhoneAdd",t)},expression:"form.userPhoneAdd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"电子邮箱",prop:"userEmailAdd"}},[s("el-input",{model:{value:e.form.userEmailAdd,callback:function(t){e.$set(e.form,"userEmailAdd",t)},expression:"form.userEmailAdd"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"账号类型",prop:"userTypeAdd"}},[s("el-select",{model:{value:e.form.userTypeAdd,callback:function(t){e.$set(e.form,"userTypeAdd",t)},expression:"form.userTypeAdd"}},[s("el-option",{attrs:{label:"超级管理员",value:"超级管理员"}}),e._v(" "),s("el-option",{attrs:{label:"普通管理员",value:"普通管理员"}})],1)],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogFormVisibleAdd=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){e.InfoAdd("formAdd")}}},[e._v("确 定")])],1)],1),e._v(" "),s("el-table",{staticClass:"listTable",staticStyle:{width:"100%"},attrs:{data:e.allListData,id:"listTable"}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userId",label:"工号",align:"center",width:"100px",sortable:""}}),e._v(" "),s("el-table-column",{attrs:{prop:"userName",label:"姓名",align:"center",width:"70px"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userPass",label:"密码",align:"center",width:"50px"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userPhone",label:"联系方式",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userEmail",label:"电子邮箱",align:"center"}}),e._v(" "),s("el-table-column",{attrs:{prop:"userType",label:"账号类型",align:"center",width:"110px"}}),e._v(" "),s("el-table-column",{attrs:{prop:"reason",label:"备注",align:"center",width:"120px"}})],1)],1)},staticRenderFns:[]};var m=s("VU/8")(u,d,!1,function(e){s("q7qW")},null,null);t.default=m.exports},q7qW:function(e,t){}});
//# sourceMappingURL=15.f032baa3fbaf42eaf89c.js.map