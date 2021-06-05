(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ff73526"],{"44ab":function(e,t,o){"use strict";o("9056")},9056:function(e,t,o){},b357:function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"readIdCard"},[o("h2",[e._v("WebSocket")]),o("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("span",[e._v("直接测试")])]),o("div",{staticClass:"text item"},[o("p",{staticStyle:{"text-align":"center"}},[e._v("使用本控制台测试时，请先配置WebSocket")]),o("el-divider"),o("el-row",{attrs:{gutter:25}},[o("el-col",{attrs:{xs:24,sm:24,md:13,lg:13,xl:13}},[o("el-form",{ref:"form",attrs:{"label-position":"top",model:e.form,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"服务状态"}},[o("el-tag",{attrs:{type:e.form.state.type}},[e._v(e._s(e.form.state.msg))])],1),e.form.log?o("el-form-item",{attrs:{label:"日志"}},[o("div",{staticClass:"showLog"},[o("el-input",{attrs:{type:"textarea",rows:15,size:"medium"},model:{value:e.form.log,callback:function(t){e.$set(e.form,"log",t)},expression:"form.log"}})],1)]):e._e()],1)],1),o("el-col",{attrs:{xs:24,sm:24,md:11,lg:11,xl:11}},[o("el-form",{ref:"form",attrs:{"label-position":"left",model:e.form,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"协议类型"}},[o("el-select",{attrs:{placeholder:"请选择协议类型"},model:{value:e.WS_type,callback:function(t){e.WS_type=t},expression:"WS_type"}},[o("el-option",{attrs:{label:"ws",value:"ws://",disabled:"https:"===e.protocolStr}}),o("el-option",{attrs:{label:"wss",value:"wss://"}})],1),"https:"===e.protocolStr?o("el-tag",{attrs:{type:"danger"}},[e._v("https下仅能使用wss://连接")]):e._e()],1),o("el-form-item",{attrs:{label:"服务端口"}},[o("el-input",{model:{value:e.form.port,callback:function(t){e.$set(e.form,"port",t)},expression:"form.port"}})],1),o("el-form-item",{attrs:{label:"服务地址"}},[o("el-input",{model:{value:e.form.domain,callback:function(t){e.$set(e.form,"domain",t)},expression:"form.domain"}})],1),o("el-form-item",{attrs:{label:"使用变量"}},[o("el-switch",{model:{value:e.form.useVar,callback:function(t){e.$set(e.form,"useVar",t)},expression:"form.useVar"}})],1),o("div",{directives:[{name:"show",rawName:"v-show",value:e.form.useVar,expression:"form.useVar"}]},[o("el-form-item",{attrs:{label:"变量"}},[o("el-input",{staticClass:"input-with-select",attrs:{type:"textarea",placeholder:"请输入 js对象格式 的变量",rows:"5"},on:{change:e.onVarChange},model:{value:e.form.var,callback:function(t){e.$set(e.form,"var",t)},expression:"form.var"}})],1),o("el-form-item",{staticStyle:{"margin-top":"-20px"},attrs:{label:"查看说明"}},[o("el-switch",{model:{value:e.showDemoVar,callback:function(t){e.showDemoVar=t},expression:"showDemoVar"}})],1),o("div",{directives:[{name:"show",rawName:"v-show",value:e.showDemoVar,expression:"showDemoVar"}],staticStyle:{"margin-top":"-20px","margin-bottom":"30px"}},[o("layui-code",{attrs:{title:"变量格式示例",code:e.demoVar,encode:!0,lang:"Object + Tpl"}})],1)],1),o("el-form-item",{attrs:{label:"路径参数"}},[o("el-input",{on:{change:e.onFormQueryChange},model:{value:e.form.query,callback:function(t){e.$set(e.form,"query",t)},expression:"form.query"}})],1),o("el-form-item",{attrs:{label:"消息内容"}},[o("el-input",{staticClass:"input-with-select",attrs:{type:"textarea",placeholder:"请输入消息内容\n\n输入内容后【发送】按钮将会出现",rows:"5"},model:{value:e.form.msg,callback:function(t){e.$set(e.form,"msg",t)},expression:"form.msg"}})],1),o("el-divider",{attrs:{"content-position":"center"}},[e._v("命令模拟")]),e._l(e.commands,(function(t,r){return o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"Send"!==t.command||!!e.form.msg,expression:"item.command === 'Send' ? (!!form.msg) : true"}],key:r,attrs:{label:t.title}},[o("el-button",{attrs:{type:"Send"===t.command?"primary":""},on:{click:function(o){return e.execStringCommand(t.command)}}},[e._v(e._s(t.command)+" ")])],1)}))],2)],1)],1)],1)])],1)},s=[],a=o("e436"),n=o("d8ca"),l=(o("4d63"),o("ac1f"),o("25f0"),o("5319"),o("53ca")),c={open:"{{",close:"}}"},i={exp:function(e){return new RegExp(e,"g")},query:function(e,t,o){var r=["#([\\s\\S])+?","([^{#}])*?"][e||0];return m((t||"")+c.open+r+c.close+(o||""))},escape:function(e){return String(e||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},error:function(e,t){var o="Laytpl Error：";return"object"===("undefined"===typeof console?"undefined":Object(l["a"])(console))&&console.error(o+e+"\n"+(t||"")),o+e}},m=i.exp,p=function(e){this.tpl=e};p.pt=p.prototype,window.errors=0,p.pt.parse=function(e,t){var o=this,r=e,s=m("^"+c.open+"#",""),a=m(c.close+"$","");e=e.replace(/\s+|\r|\t|\n/g," ").replace(m(c.open+"#"),c.open+"# ").replace(m(c.close+"}"),"} "+c.close).replace(/\\/g,"\\\\").replace(m(c.open+"!(.+?)!"+c.close),(function(e){return e=e.replace(m("^"+c.open+"!"),"").replace(m("!"+c.close),"").replace(m(c.open+"|"+c.close),(function(e){return e.replace(/(.)/g,"\\$1")})),e})).replace(/(?="|')/g,"\\").replace(i.query(),(function(e){return e=e.replace(s,"").replace(a,""),'";'+e.replace(/\\/g,"")+';view+="'})).replace(i.query(1),(function(e){var t='"+(';return e.replace(/\s/g,"")===c.open+c.close?"":(e=e.replace(m(c.open+"|"+c.close),""),/^=/.test(e)&&(e=e.replace(/^=/,""),t='"+_escape_('),t+e.replace(/\\/g,"")+')+"')})),e='"use strict";var view = "'+e+'";return view;';try{return o.cache=e=new Function("d, _escape_",e),e(t,i.escape)}catch(n){return delete o.cache,i.error(n,r)}},p.pt.render=function(e,t){var o,r=this;return e?(o=r.cache?r.cache(e,i.escape):r.parse(r.tpl,e),t?void t(o):o):i.error("no data")};var u=function(e){return"string"!==typeof e?i.error("Template not found"):new p(e)};u.config=function(e){for(var t in e=e||{},e)c[t]=e[t]},u.v="1.2.0";var d=u,f={name:"Test",components:{LayuiCode:a["a"]},data(){return{form:{domain:"192.168.56.4",port:"9410",query:"/",path:"/",state:{type:"info",msg:"未连接"},useVar:!1,var:"",log:"",msg:""},variable:{},showDemoVar:!1,demoVar:"// tpl函数内的字符串将由模版引擎输出，模版引擎规则参考layui.laytpl\n//d.timestamp 为秒级时间戳，每10秒自动更新一次\n\n{\n    imei: 12332112123321,\n    sign: tpl(\"{{# return php.md5('secret=dasjdiosaiodoas&timestamp='+d.timestamp+'&key=12332112123321'); }}\")\n}\n",wsUrl:"",WS_type:"ws://",protocolStr:"https:",onWS:{onopen:{},onclose:{},onmessage:{},onerror:{}},commands:[{title:"发送消息",command:"Send"},{title:"连接服务",command:"ConnectServer"},{title:"关闭连接",command:"CloseConnection"},{title:"连接状态",command:"ConnectionStatus"},{title:"清除日志",command:"ClearLog"}],socket:null,loading:!1}},created(){let e=this.onChangeQuery(this.$route);this.protocolStr=document.location.protocol,this.make_wsUrl(e),this.onWS={onopen:e=>this.setLog("#msg: 服务器连接成功"),onclose:e=>this.setLog("#断开连接:"+e.wasClean),onmessage:e=>this.setLog("#服务器消息:"+e.data),onerror:e=>(this.form.state={type:"danger",msg:"Socket Error"},this.setLog("#disconnected:"+(e.message||"服务未启用或服务地址错误")))}},mounted(){window.vm=this,window.php=n["a"],window.tpl=this.tpl,setInterval(()=>{this.makeVariable()},1e4)},methods:{setLog(...e){if("string"===typeof e[0]){let t="";t+=n["a"].date("Y-m-d H:i:s")+"\n",t+=e[0]+"\n\n",this.form.log=t+this.form.log}else console.log(...e)},execStringCommand(e){switch(e){case"ConnectServer":return this.loading=this.$loading({lock:!0,text:"服务连接中。。。",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.connectServer();case"Send":this.socket.send(this.form.msg);break;case"CloseConnection":return this.socket&&this.socket.close(),this.form.state={type:"warning",msg:"Socket 服务已关闭"};case"ConnectionStatus":let e=this.getSocketStatus();switch(!0){case"0"===e:this.form.state={type:"info",msg:"未连接"};break;case"1"===e||"2"===e:this.form.state={type:"success",msg:"Socket 服务连接成功"};break;case"3"===e||"4"===e:this.form.state={type:"warning",msg:"Socket 服务已关闭"};break;default:this.form.state={type:"danger",msg:"Socket Error"}}return!0;case"ClearLog":return this.form.log=""}},make_wsUrl(e=!1){e&&("https:"===this.protocolStr?this.WS_type="wss://":this.WS_type="ws://"),this.wsUrl+=this.WS_type+this.form.domain+":"+this.form.port+this.form.path},connectServer(){let e=this;this.wsUrl="";try{""===this.wsUrl&&this.make_wsUrl(),this.socket=new WebSocket(this.wsUrl)}catch(t){return this.loading.close(),this.form.state={type:"danger",msg:"Socket Error"},t.data?this.setLog("#new WebSocket error:"+t.data):(this.setLog("#new WebSocket error: 未启用WebSocket服务，或参数配置错误"),console.log(t)),void(this.socket=null)}this.socket.onopen=function(t){e.loading.close(),e.form.state={type:"success",msg:"Socket 服务连接成功"},"function"===typeof e.onWS.onopen&&e.onWS.onopen.call(e,t)},this.socket.onclose=function(t){e.loading.close(),e.form.state={type:"warning",msg:"Socket 服务已关闭"},"function"===typeof e.onWS.onclose&&e.onWS.onclose.call(e,t)},this.socket.onmessage=function(t){e.loading.close(),"function"===typeof e.onWS.onmessage&&e.onWS.onmessage.call(e,t)},this.socket.onerror=function(t){e.loading.close(),e.form.state={type:"danger",msg:"Socket Error"},"function"===typeof e.onWS.onerror&&e.onWS.onerror.call(e,t)}},getSocketStatus(){var e=this;if(null==e.socket)return e.setLog("未连接websocket服务"),"0";switch(e.socket.readyState){case e.socket.CONNECTING:return e.setLog("websocket服务连接中"),"1";case e.socket.OPEN:return e.setLog("websocket服务连接成功"),"2";case e.socket.CLOSING:return e.setLog("websocket服务关闭中"),"3";case e.socket.CLOSED:return e.setLog("websocket服务已关闭"),"4";default:return e.setLog("未知错误"),"-1"}},makeVariable(){this.variable.timestamp=n["a"].time()},onChangeQuery(e){const t=e.query.domain,o=e.query.port,r=e.query.wsType,s=e.query.query;return t&&(this.form.domain=t),o&&(this.form.port=o),r?(this.WS_type=r+"://",!1):(s&&(this.form.query=s),!0)},onVarChange(e){try{return e=new Function("return "+e)(),this.variable=e}catch(t){return this.$notify({title:"error",dangerouslyUseHTMLString:!0,message:"不正确的格式："+e,type:"warning"}),console.error("以下部分格式不正确：\n"+e)}},onFormQueryChange(e){n["a"].empty(e)||(this.form.path=this.tpl(e))},tpl(e){return d(e).render(this.variable)}},watch:{WS_type(){let e=this.getSocketStatus();"1"!==e&&"2"!==e||this.execStringCommand("CloseConnection"),this.make_wsUrl()},$route(e){this.onChangeQuery(e)}}},h=f,g=(o("44ab"),o("2877")),w=Object(g["a"])(h,r,s,!1,null,null,null);t["default"]=w.exports}}]);
//# sourceMappingURL=chunk-2ff73526.cc11008d.js.map