(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66ce5ca1"],{"0fd9":function(t,e,n){"use strict";n("4b85");var l=n("2b0e"),a=n("d9f7"),r=n("80d2");const s=["sm","md","lg","xl"],i=["start","end","center"];function o(t,e){return s.reduce((n,l)=>(n[t+Object(r["u"])(l)]=e(),n),{})}const c=t=>[...i,"baseline","stretch"].includes(t),d=o("align",()=>({type:String,default:null,validator:c})),u=t=>[...i,"space-between","space-around"].includes(t),f=o("justify",()=>({type:String,default:null,validator:u})),p=t=>[...i,"space-between","space-around","stretch"].includes(t),v=o("alignContent",()=>({type:String,default:null,validator:p})),g={align:Object.keys(d),justify:Object.keys(f),alignContent:Object.keys(v)},y={align:"align",justify:"justify",alignContent:"align-content"};function b(t,e,n){let l=y[t];if(null!=n){if(e){const n=e.replace(t,"");l+="-"+n}return l+="-"+n,l.toLowerCase()}}const m=new Map;e["a"]=l["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...f,alignContent:{type:String,default:null,validator:p},...v},render(t,{props:e,data:n,children:l}){let r="";for(const a in e)r+=String(e[a]);let s=m.get(r);if(!s){let t;for(t in s=[],g)g[t].forEach(n=>{const l=e[n],a=b(t,n,l);a&&s.push(a)});s.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),m.set(r,s)}return t(e.tag,Object(a["a"])(n,{staticClass:"row",class:s}),l)}})},"62ad":function(t,e,n){"use strict";n("4b85");var l=n("2b0e"),a=n("d9f7"),r=n("80d2");const s=["sm","md","lg","xl"],i=(()=>s.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),o=(()=>s.reduce((t,e)=>(t["offset"+Object(r["u"])(e)]={type:[String,Number],default:null},t),{}))(),c=(()=>s.reduce((t,e)=>(t["order"+Object(r["u"])(e)]={type:[String,Number],default:null},t),{}))(),d={col:Object.keys(i),offset:Object.keys(o),order:Object.keys(c)};function u(t,e,n){let l=t;if(null!=n&&!1!==n){if(e){const n=e.replace(t,"");l+="-"+n}return"col"!==t||""!==n&&!0!==n?(l+="-"+n,l.toLowerCase()):l.toLowerCase()}}const f=new Map;e["a"]=l["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...i,offset:{type:[String,Number],default:null},...o,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:n,children:l,parent:r}){let s="";for(const a in e)s+=String(e[a]);let i=f.get(s);if(!i){let t;for(t in i=[],d)d[t].forEach(n=>{const l=e[n],a=u(t,n,l);a&&i.push(a)});const n=i.some(t=>t.startsWith("col-"));i.push({col:!n||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),f.set(s,i)}return t(e.tag,Object(a["a"])(n,{class:i}),l)}})},c87a:function(t,e,n){"use strict";n.r(e);var l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"other-notice"},[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[n("v-card",{staticClass:"pa-2",attrs:{elevation:"3",flat:"",outlined:"",tile:""}},[n("v-card-title",[t._v("Alert 警告")]),n("v-card-text",[n("v-alert",{attrs:{dense:"",dismissible:"",outlined:"",text:"",type:"success"}},[t._v(" 成功提示的文案 ")]),n("v-alert",{attrs:{dense:"",dismissible:"",outlined:"",text:"",type:"info"}},[t._v(" 消息提示的文案 ")]),n("v-alert",{attrs:{dense:"",dismissible:"",outlined:"",text:"",type:"warning"}},[t._v(" 警告提示的文案 ")]),n("v-alert",{attrs:{dense:"",dismissible:"",outlined:"",text:"",type:"error"}},[t._v(" 错误提示的文案 ")])],1)],1)],1),n("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[n("v-card",{staticClass:"pa-2",attrs:{elevation:"3",flat:"",outlined:"",tile:""}},[n("v-card-title",[t._v("Message 消息提示")]),n("v-card-text",[n("v-container",[n("v-row",{attrs:{dense:""}},[t._l(t.items,(function(e,l){return n("v-col",{key:l},[n("v-btn",{attrs:{color:e.type,disabled:t.loading,loading:t.loading},on:{click:function(n){return t.callMsg(e)}}},[t._v(" "+t._s(e.title)+" ")])],1)})),n("v-spacer"),n("v-spacer"),n("v-spacer")],2)],1)],1)],1)],1),n("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[n("v-card",{staticClass:"pa-2",attrs:{elevation:"3",flat:"",outlined:"",tile:""}},[n("v-card-title",[t._v("Alert 普通信息框")]),n("v-card-text",[n("v-container",[n("v-row",{attrs:{dense:""}},[t._l(t.alertItems,(function(e,l){return n("v-col",{key:l},[n("v-btn",{attrs:{color:e.type,disabled:t.loading,loading:t.loading},on:{click:function(n){return t.callAlert(e)}}},[t._v(" "+t._s(e.title)+" ")])],1)})),n("v-spacer"),n("v-spacer"),n("v-spacer")],2)],1)],1)],1)],1)],1)],1)],1)},a=[],r=n("635f"),s={data(){return{loader:null,loading:!1,items:[{type:void 0,title:"默认"},{type:"info",title:"消息"},{type:"success",title:"成功"},{type:"warning",title:"警告"},{type:"error",title:"错误"}],alertItems:[{type:"primary",title:"默认",content:"这是一条消息"},{type:"primary",title:"修改标题",content:"标题可以任意设置",opt:{title:"自定义标题"},yes:null},{type:"primary",title:"延迟关闭",content:"可以通过确认回调，进行延迟关闭",opt:{},yes:(t,e)=>(r["default"].message("将在3秒后关闭"),setTimeout(()=>{e.close(t)},3e3),!1)}]}},methods:{callMsg(t){r["default"].message(t.title,t.type)},callAlert(t){r["default"].alert(t.content,t.opt,t.yes)}}},i=s,o=n("2877"),c=n("6544"),d=n.n(c),u=n("0798"),f=n("8336"),p=n("b0af"),v=n("99d9"),g=n("62ad"),y=n("a523"),b=n("0fd9"),m=n("2fa4"),w=Object(o["a"])(i,l,a,!1,null,null,null);e["default"]=w.exports;d()(w,{VAlert:u["a"],VBtn:f["a"],VCard:p["a"],VCardText:v["c"],VCardTitle:v["d"],VCol:g["a"],VContainer:y["a"],VRow:b["a"],VSpacer:m["a"]})}}]);
//# sourceMappingURL=chunk-66ce5ca1.c9a24a64.js.map