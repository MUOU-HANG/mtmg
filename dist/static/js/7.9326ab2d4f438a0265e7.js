webpackJsonp([7],{ZRYO:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("zL8q");var n,l=(n=0,function(e,t){clearTimeout(n),n=setTimeout(e,t)}),i={inject:["reload"],name:"Mcomment",data:function(){return{year:"",maMarkData:[],markDetails:[],issueListData:[],count:"",page_size:6,currentPage:1,searchValue:"",dialogTableVisible:!1}},created:function(){this.getYear(),this.getMarkList()},watch:{searchValue:function(){var e=this;l(function(){e.getMarkList()},300)}},methods:{getYear:function(){var e=(new Date).getFullYear();this.year=e},getMarkList:function(){var e=this,t=this.searchValue;this.$http.post("/api/user/maMarkList",{number:t,begin:0,end:5},{}).then(function(a){a?(e.maMarkData=a.data,e.$http.post("/api/user/maMarkCount",{number:t}).then(function(t){e.count=t.data})):e.$confirm("暂未有评价信息，请军训结束后再查看","信息为空",{confirmButtonText:"返回主页",cancelButtonText:"好，我明白了",type:"warning"}).then(function(){e.$router.push("/index")})})},handleCurrentChange:function(e){var t=this,a=this.$refs.search.value;this.$http.post("/api/user/maMarkList",{number:a,begin:5*e-5,end:5*e},{}).then(function(e){t.maMarkData=e.data})},handleDetails:function(e,t){var a=this;this.$http.post("/api/user/issueAnswer_ma",{number:t.number}).then(function(e){""!=e.data?(a.markDetails=e.data,a.dialogTableVisible=!0,a.$http.post("/api/user/issueList_ma").then(function(e){a.issueListData=e.data})):a.$message({message:"暂未有评价，请军训结束后再查看",type:"warning"}),a.markDetails=e.data})},handleDel:function(e,t){var a=this;this.$confirm("是否删除"+t.name+"的评价信息？","删除提醒",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$http.post("/api/user/maMarkDel",{number:t.number}).then(function(e){e.status?(a.$message({message:"删除辅导员"+t.number+"成功",type:"success"}),a.reload()):a.$message({message:"删除辅导员"+t.number+"失败，请联系维护人员！",type:"warning"})})}).catch(function(){})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"block"},[a("h1",{staticClass:"title"},[e._v(e._s(e.year)+"年带训教官满意度汇总表")]),e._v(" "),a("el-header",{staticClass:"mark_stration"},[a("el-form",{attrs:{inline:""}},[a("ElFormItem",{attrs:{label:"输入辅导员工号："}},[a("el-input",{ref:"search",attrs:{placeholder:"输入辅导员工号","suffix-icon":"el-icon-search"},model:{value:e.searchValue,callback:function(t){e.searchValue="string"==typeof t?t.trim():t},expression:"searchValue"}})],1)],1)],1),e._v(" "),a("el-container",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.maMarkData}},[a("el-table-column",{attrs:{prop:"number",label:"代号",width:"120",align:"center",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"教官",align:"center",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"clName",label:"所带班级",align:"center",width:"150"}}),e._v(" "),a("el-table-column",{attrs:{label:"满意度汇总（以百分比形式）",align:"center"}},[a("el-table-column",{attrs:{prop:"satisfied",label:"十分满意",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"good",label:"一般满意",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"common",label:"一般",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"worse",label:"不满意",align:"center"}})],1),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){e.handleDetails(t.$index,t.row)}}},[e._v("详细")]),e._v(" "),a("el-button",{attrs:{size:"mini",round:"",type:"danger"},on:{click:function(a){e.handleDel(t.$index,t.row)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",{staticClass:"page"},[a("el-pagination",{attrs:{"hide-on-single-page":!0,"current-page":e.currentPage,layout:"total, prev, pager, next, jumper",total:e.count,"page-size":e.page_size},on:{"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{staticClass:"dialog",attrs:{title:"评价详情",visible:e.dialogTableVisible,center:"","show-close":"","lock-scroll":""},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("div",{staticClass:"tableBox"},[a("el-table",{staticClass:"dialogTable1",staticStyle:{width:"40%"},attrs:{data:e.issueListData}},[a("el-table-column",{attrs:{label:"问卷内容",align:"center"}},[a("el-table-column",{attrs:{prop:"id",label:"序号",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"issue",label:"评价项",align:"center"}})],1)],1),e._v(" "),a("el-table",{staticClass:"dialogTable2",staticStyle:{width:"55%"},attrs:{data:e.markDetails}},[a("el-table-column",{attrs:{label:"满意度汇总（以百分比形式）",align:"center"}},[a("el-table-column",{attrs:{prop:"satisfiedMark",label:"十分满意",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodMark",label:"一般满意",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"commonMark",label:"一般",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"worseMark",label:"不满意",align:"center"}})],1)],1)],1),e._v(" "),a("el-button",{staticClass:"backBtn",attrs:{type:"danger"},on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("返回")])],1)],1)},staticRenderFns:[]};var s=a("VU/8")(i,r,!1,function(e){a("oZzL")},null,null);t.default=s.exports},oZzL:function(e,t){}});
//# sourceMappingURL=7.9326ab2d4f438a0265e7.js.map