(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-81dc0bf2"],{"0fd9":function(t,e,n){"use strict";n("4b85");var a=n("2b0e"),l=n("d9f7"),r=n("80d2");const o=["sm","md","lg","xl"],i=["start","end","center"];function s(t,e){return o.reduce((n,a)=>(n[t+Object(r["u"])(a)]=e(),n),{})}const c=t=>[...i,"baseline","stretch"].includes(t),d=s("align",()=>({type:String,default:null,validator:c})),u=t=>[...i,"space-between","space-around"].includes(t),f=s("justify",()=>({type:String,default:null,validator:u})),g=t=>[...i,"space-between","space-around","stretch"].includes(t),p=s("alignContent",()=>({type:String,default:null,validator:g})),v={align:Object.keys(d),justify:Object.keys(f),alignContent:Object.keys(p)},b={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,n){let a=b[t];if(null!=n){if(e){const n=e.replace(t,"");a+="-"+n}return a+="-"+n,a.toLowerCase()}}const w=new Map;e["a"]=a["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...f,alignContent:{type:String,default:null,validator:g},...p},render(t,{props:e,data:n,children:a}){let r="";for(const l in e)r+=String(e[l]);let o=w.get(r);if(!o){let t;for(t in o=[],v)v[t].forEach(n=>{const a=e[n],l=y(t,n,a);l&&o.push(l)});o.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),w.set(r,o)}return t(e.tag,Object(l["a"])(n,{staticClass:"row",class:o}),a)}})},"62ad":function(t,e,n){"use strict";n("4b85");var a=n("2b0e"),l=n("d9f7"),r=n("80d2");const o=["sm","md","lg","xl"],i=(()=>o.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),s=(()=>o.reduce((t,e)=>(t["offset"+Object(r["u"])(e)]={type:[String,Number],default:null},t),{}))(),c=(()=>o.reduce((t,e)=>(t["order"+Object(r["u"])(e)]={type:[String,Number],default:null},t),{}))(),d={col:Object.keys(i),offset:Object.keys(s),order:Object.keys(c)};function u(t,e,n){let a=t;if(null!=n&&!1!==n){if(e){const n=e.replace(t,"");a+="-"+n}return"col"!==t||""!==n&&!0!==n?(a+="-"+n,a.toLowerCase()):a.toLowerCase()}}const f=new Map;e["a"]=a["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...i,offset:{type:[String,Number],default:null},...s,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:n,children:a,parent:r}){let o="";for(const l in e)o+=String(e[l]);let i=f.get(o);if(!i){let t;for(t in i=[],d)d[t].forEach(n=>{const a=e[n],l=u(t,n,a);l&&i.push(l)});const n=i.some(t=>t.startsWith("col-"));i.push({col:!n||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),f.set(o,i)}return t(e.tag,Object(l["a"])(n,{class:i}),a)}})},c8a1:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"other-notice"},[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[n("v-card",{staticClass:"pa-2",attrs:{elevation:"3",flat:"",outlined:"",tile:""}},[n("v-card-title",[t._v("默认 Loading")]),n("v-card-subtitle",[t._v("仅遮罩app范围")]),n("v-card-text",[n("v-container",[n("v-row",{attrs:{dense:""}},[t._l(2,(function(e){return n("v-col",{key:e},[n("v-btn",{attrs:{color:"primary",disabled:t.loading,loading:t.loading},on:{click:function(n){return t.openLoading(e-1)}}},[t._v(" "+t._s(1===e?"默认效果":"效果"+(e-1))+" ")])],1)})),n("v-spacer"),n("v-spacer"),n("v-spacer")],2)],1)],1)],1)],1),n("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[n("v-card",{staticClass:"pa-2",attrs:{elevation:"3",flat:"",outlined:"",tile:""}},[n("v-card-title",[t._v("dialog Loading")]),n("v-card-subtitle",[t._v("遮罩全屏")]),n("v-card-text",[n("v-container",[n("v-row",{attrs:{dense:""}},[t._l(2,(function(e){return n("v-col",{key:e},[n("v-btn",{attrs:{color:"primary",disabled:t.loading,loading:t.loading},on:{click:function(n){return t.openLoading2(e-1)}}},[t._v(" "+t._s(1===e?"默认效果":"效果"+(e-1))+" ")])],1)})),n("v-spacer"),n("v-spacer"),n("v-spacer")],2)],1)],1)],1)],1)],1)],1)],1)},l=[],r=n("635f"),o={data(){return{loader:null,loading:!1}},created(){window.VM=this},methods:{openLoading(t,e){return e={text:e},r["default"].load(t,e)},openLoading2(t,e){return e={text:e,type:"dialog"},r["default"].load(t,e)}}},i=o,s=n("2877"),c=n("6544"),d=n.n(c),u=n("8336"),f=n("b0af"),g=n("99d9"),p=n("62ad"),v=n("a523"),b=n("0fd9"),y=n("2fa4"),w=Object(s["a"])(i,a,l,!1,null,null,null);e["default"]=w.exports;d()(w,{VBtn:u["a"],VCard:f["a"],VCardSubtitle:g["b"],VCardText:g["c"],VCardTitle:g["d"],VCol:p["a"],VContainer:v["a"],VRow:b["a"],VSpacer:y["a"]})}}]);
//# sourceMappingURL=chunk-81dc0bf2.a6195d45.js.map