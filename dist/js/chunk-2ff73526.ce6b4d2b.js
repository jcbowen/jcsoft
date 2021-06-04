(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ff73526"],{"44ab":function(t,e,o){"use strict";o("9056")},9056:function(t,e,o){},b357:function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"readIdCard"},[o("h2",[t._v("WebSocket")]),o("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("span",[t._v("直接测试")])]),o("div",{staticClass:"text item"},[o("p",{staticStyle:{"text-align":"center"}},[t._v("使用本控制台测试时，请先配置WebSocket")]),o("el-divider"),o("el-row",{attrs:{gutter:25}},[o("el-col",{attrs:{xs:24,sm:24,md:13,lg:13,xl:13}},[o("el-form",{ref:"form",attrs:{"label-position":"top",model:t.form,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"服务状态"}},[o("el-tag",{attrs:{type:t.form.state.type}},[t._v(t._s(t.form.state.msg))])],1),t.form.log?o("el-form-item",{attrs:{label:"日志"}},[o("div",{staticClass:"showLog"},[o("el-input",{attrs:{type:"textarea",rows:15,size:"medium"},model:{value:t.form.log,callback:function(e){t.$set(t.form,"log",e)},expression:"form.log"}})],1)]):t._e()],1)],1),o("el-col",{attrs:{xs:24,sm:24,md:11,lg:11,xl:11}},[o("el-form",{ref:"form",attrs:{"label-position":"left",model:t.form,"label-width":"100px"}},[o("el-form-item",{attrs:{label:"协议类型"}},[o("el-select",{attrs:{placeholder:"请选择协议类型"},model:{value:t.WS_type,callback:function(e){t.WS_type=e},expression:"WS_type"}},[o("el-option",{attrs:{label:"ws",value:"ws://",disabled:"https:"===t.protocolStr}}),o("el-option",{attrs:{label:"wss",value:"wss://"}})],1),"https:"===t.protocolStr?o("el-tag",{attrs:{type:"danger"}},[t._v("https下仅能使用wss://连接")]):t._e()],1),o("el-form-item",{attrs:{label:"服务端口"}},[o("el-input",{model:{value:t.form.port,callback:function(e){t.$set(t.form,"port",e)},expression:"form.port"}})],1),o("el-form-item",{attrs:{label:"服务地址"}},[o("el-input",{model:{value:t.form.domain,callback:function(e){t.$set(t.form,"domain",e)},expression:"form.domain"}})],1),o("el-form-item",{attrs:{label:"服务路径"}},[o("el-input",{model:{value:t.form.path,callback:function(e){t.$set(t.form,"path",e)},expression:"form.path"}})],1),o("el-form-item",{attrs:{label:"消息内容"}},[o("el-input",{staticClass:"input-with-select",attrs:{type:"textarea",placeholder:"请输入消息内容\n\n输入内容后【发送】按钮将会出现",rows:"5"},model:{value:t.form.msg,callback:function(e){t.$set(t.form,"msg",e)},expression:"form.msg"}})],1),o("el-divider",{attrs:{"content-position":"center"}},[t._v("命令模拟")]),t._l(t.commands,(function(e,s){return o("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"Send"!==e.command||!!t.form.msg,expression:"item.command === 'Send' ? (form.msg?true:false) : true"}],key:s,attrs:{label:e.title}},[o("el-button",{attrs:{type:"Send"===e.command?"primary":""},on:{click:function(o){return t.execStringCommand(e.command)}}},[t._v(t._s(e.command)+" ")])],1)}))],2)],1)],1)],1)])],1)},r=[],n=o("e436"),a=o("d8ca"),l={name:"Test",components:{LayuiCode:n["a"]},data(){return{form:{domain:"192.168.56.4",port:"9410",path:"/",state:{type:"info",msg:"未连接"},log:"",msg:""},wsUrl:"",WS_type:"ws://",protocolStr:"https:",onWS:{onopen:{},onclose:{},onmessage:{},onerror:{}},commands:[{title:"发送消息",command:"Send"},{title:"连接服务",command:"ConnectServer"},{title:"关闭连接",command:"CloseConnection"},{title:"连接状态",command:"ConnectionStatus"},{title:"清除日志",command:"ClearLog"}],socket:null,loading:!1}},created(){this.onChangeQuery(this.$route),this.protocolStr=document.location.protocol,this.make_wsUrl(!0),this.onWS={onopen:t=>this.setLog("#msg: 服务器连接成功"),onclose:t=>this.setLog("#断开连接:"+t.wasClean),onmessage:t=>this.setLog("#服务器消息:"+t.data),onerror:t=>(this.form.state={type:"danger",msg:"Socket Error"},this.setLog("#disconnected:"+(t.message||"服务未启用或服务地址错误")))},window.WS=this},methods:{setLog(...t){if("string"===typeof t[0]){let e="";e+=a["a"].date("Y-m-d H:i:s")+"\n",e+=t[0]+"\n\n",this.form.log=e+this.form.log}else console.log(...t)},execStringCommand(t){switch(t){case"ConnectServer":return this.loading=this.$loading({lock:!0,text:"服务连接中。。。",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.connectServer();case"Send":this.socket.send(this.form.msg);break;case"CloseConnection":return this.socket&&this.socket.close(),this.form.state={type:"warning",msg:"Socket 服务已关闭"};case"ConnectionStatus":let t=this.getSocketStatus();switch(!0){case"0"===t:this.form.state={type:"info",msg:"未连接"};break;case"1"===t||"2"===t:this.form.state={type:"success",msg:"Socket 服务连接成功"};break;case"3"===t||"4"===t:this.form.state={type:"warning",msg:"Socket 服务已关闭"};break;default:this.form.state={type:"danger",msg:"Socket Error"}}return!0;case"ClearLog":return this.form.log=""}},make_wsUrl(t=!1){t&&("https:"===this.protocolStr?this.WS_type="wss://":this.WS_type="ws://"),this.wsUrl+=this.WS_type+this.form.domain+":"+this.form.port+this.form.path},connectServer(){let t=this;this.wsUrl="";try{""===this.wsUrl&&this.make_wsUrl(),this.socket=new WebSocket(this.wsUrl)}catch(e){return this.loading.close(),this.form.state={type:"danger",msg:"Socket Error"},e.data?this.setLog("#new WebSocket error:"+e.data):(this.setLog("#new WebSocket error: 未启用WebSocket服务，或参数配置错误"),console.log(e)),void(this.socket=null)}this.socket.onopen=function(e){t.loading.close(),t.form.state={type:"success",msg:"Socket 服务连接成功"},"function"===typeof t.onWS.onopen&&t.onWS.onopen.call(t,e)},this.socket.onclose=function(e){t.loading.close(),t.form.state={type:"warning",msg:"Socket 服务已关闭"},"function"===typeof t.onWS.onclose&&t.onWS.onclose.call(t,e)},this.socket.onmessage=function(e){t.loading.close(),"function"===typeof t.onWS.onmessage&&t.onWS.onmessage.call(t,e)},this.socket.onerror=function(e){t.loading.close(),t.form.state={type:"danger",msg:"Socket Error"},"function"===typeof t.onWS.onerror&&t.onWS.onerror.call(t,e)}},getSocketStatus(){var t=this;if(null==t.socket)return t.setLog("未连接websocket服务"),"0";switch(t.socket.readyState){case t.socket.CONNECTING:return t.setLog("websocket服务连接中"),"1";case t.socket.OPEN:return t.setLog("websocket服务连接成功"),"2";case t.socket.CLOSING:return t.setLog("websocket服务关闭中"),"3";case t.socket.CLOSED:return t.setLog("websocket服务已关闭"),"4";default:return t.setLog("未知错误"),"-1"}},onChangeQuery(t){const e=t.query.domain,o=t.query.port;e&&(this.form.domain=e),o&&(this.form.port=o)}},watch:{WS_type(){let t=this.getSocketStatus();"1"!==t&&"2"!==t||this.execStringCommand("CloseConnection"),this.make_wsUrl()},$route(t){this.onChangeQuery(t)}}},i=l,c=(o("44ab"),o("2877")),m=Object(c["a"])(i,s,r,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2ff73526.ce6b4d2b.js.map