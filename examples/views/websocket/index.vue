<template>
    <div class="readIdCard">
        <h2>WebSocket</h2>
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>直接测试</span>
            </div>
            <div class="text item">
                <p style="text-align: center">使用本控制台测试时，请先配置WebSocket</p>
                <el-divider></el-divider>
                <el-row :gutter="25">
                    <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
                        <el-form label-position="top" ref="form" :model="form" label-width="100px">
                            <el-form-item label="服务状态">
                                <el-tag :type="form.state.type">{{ form.state.msg }}</el-tag>
                            </el-form-item>
                            <el-form-item v-if="form.log" label="日志">
                                <div class="showLog">
                                    <el-input
                                        type="textarea"
                                        v-model="form.log"
                                        :rows="15"
                                        :size="'medium'"
                                    />
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
                        <el-form label-position="left" ref="form" :model="form" label-width="100px">
                            <el-form-item label="协议类型">
                                <el-select v-model="WS_type" placeholder="请选择协议类型">
                                    <el-option label="ws" value="ws://"
                                               :disabled="protocolStr === 'https:'"></el-option>
                                    <el-option label="wss" value="wss://"></el-option>
                                </el-select>
                                <el-tag v-if="protocolStr === 'https:'" type="danger">https下仅能使用wss://连接</el-tag>
                            </el-form-item>
                            <el-form-item label="服务端口">
                                <el-input v-model="form.port"></el-input>
                            </el-form-item>
                            <el-form-item label="服务地址">
                                <el-input v-model="form.domain"></el-input>
                            </el-form-item>
                            <el-form-item label="使用变量">
                                <el-switch v-model="form.useVar"></el-switch>
                            </el-form-item>
                            <div v-show="form.useVar">
                                <el-form-item label="变量">
                                    <el-input type="textarea"
                                              placeholder="请输入 js对象格式 的变量"
                                              v-model="form.var"
                                              @change="onVarChange"
                                              rows="5"
                                              class="input-with-select">
                                    </el-input>
                                </el-form-item>
                                <el-form-item style="margin-top: -20px;" label="查看说明">
                                    <el-switch v-model="showDemoVar"></el-switch>
                                </el-form-item>
                                <div v-show="showDemoVar" style="margin-top: -20px;margin-bottom: 30px">
                                    <layui-code
                                        title="变量格式示例"
                                        :code="demoVar"
                                        :encode="true"
                                        lang="Object + Tpl"
                                    ></layui-code>
                                </div>
                            </div>
                            <el-form-item label="路径参数">
                                <el-input v-model="form.query" @change="onFormQueryChange"></el-input>
                            </el-form-item>
                            <el-form-item label="消息内容">
                                <el-input type="textarea"
                                          placeholder="请输入消息内容

输入内容后【发送】按钮将会出现"
                                          v-model="form.msg"
                                          rows="5"
                                          class="input-with-select">
                                </el-input>
                            </el-form-item>
                            <el-divider content-position="center">命令模拟</el-divider>

                            <el-form-item v-for="(item, ind) in commands" :key="ind"
                                          :label="item.title"
                                          v-show="item.command === 'Send' ? (!!form.msg) : true"
                            >
                                <el-button
                                    :type="item.command === 'Send'?'primary':''"
                                    @click="execStringCommand(item.command)"
                                >{{ item.command }}
                                </el-button>
                            </el-form-item>

                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </el-card>

    </div>
</template>

<script>
import LayuiCode from "../../../packages/layui/modules/code";
import php from '../../../packages/utils/php'
import laytpl from "../../../packages/utils/laytpl";

export default {
    name: 'Test',
    components: {LayuiCode},
    data() {
        return {
            form: {
                domain: '192.168.56.4',
                port: '9410',
                query: '/',
                path: '/',
                state: {
                    type: 'info',
                    msg: '未连接'
                },
                useVar: false,
                var: '',
                log: '',
                msg: ''
            },
            variable: {},
            showDemoVar: false,
            demoVar: `// tpl函数内的字符串将由模版引擎输出，模版引擎规则参考layui.laytpl
//d.timestamp 为秒级时间戳，每10秒自动更新一次

{
    imei: 12332112123321,
    sign: tpl("{{# return php.md5('secret=dasjdiosaiodoas&timestamp='+d.timestamp+'&key=12332112123321'); }}")
}
`,
            wsUrl: '',
            WS_type: 'ws://',
            protocolStr: 'https:',
            onWS: {
                onopen: {},
                onclose: {},
                onmessage: {},
                onerror: {}
            },
            commands: [
                {
                    title: '发送消息',
                    command: 'Send'
                },
                {
                    title: '连接服务',
                    command: 'ConnectServer'
                },
                {
                    title: '关闭连接',
                    command: 'CloseConnection'
                },
                {
                    title: '连接状态',
                    command: 'ConnectionStatus'
                },
                {
                    title: '清除日志',
                    command: 'ClearLog'
                },
            ],
            socket: null,
            loading: false
        }
    },
    created() {
        // 根据地址栏中的参数，修改表单中的默认信息
        let auto = this.onChangeQuery(this.$route)

        this.protocolStr = document.location.protocol;
        this.make_wsUrl(auto);

        this.onWS = {
            onopen: (event) => {
                return this.setLog('#msg: 服务器连接成功');
            },
            onclose: (event) => {
                return this.setLog('#断开连接:' + event.wasClean);
            },
            onmessage: (event) => {
                return this.setLog('#服务器消息:' + event.data);
            },
            onerror: (event) => {
                this.form.state = {
                    type: 'danger',
                    msg: 'Socket Error'
                };
                return this.setLog('#disconnected:' + (event.message || '服务未启用或服务地址错误'));
            }
        };
    },
    mounted() {
        window.vm = this
        window.php = php;
        window.tpl = this.tpl;
        // 10秒执行一次时间戳变量更新
        setInterval(() => {
            this.makeVariable();
        }, 10 * 1000);
    },
    methods: {
        setLog(...res) {
            if (typeof res[0] === 'string') {
                let log = '';
                log += php.date('Y-m-d H:i:s') + '\n';
                log += res[0] + '\n\n';
                this.form.log = log + this.form.log;
            } else {
                console.log(...res);
            }
        },
        execStringCommand(strCommand) {
            switch (strCommand) {
                case 'ConnectServer':
                    this.loading = this.$loading({
                        lock: true,
                        text: '服务连接中。。。',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    return this.connectServer();
                case 'Send':
                    this.socket.send(this.form.msg);
                    break;
                case 'CloseConnection':
                    if (this.socket) this.socket.close();
                    return this.form.state = {
                        type: 'warning',
                        msg: 'Socket 服务已关闭'
                    };
                case 'ConnectionStatus':
                    let status = this.getSocketStatus();
                    switch (true) {
                        case status === '0':
                            this.form.state = {
                                type: 'info',
                                msg: '未连接'
                            };
                            break;
                        case (status === '1' || status === '2'):
                            this.form.state = {
                                type: 'success',
                                msg: 'Socket 服务连接成功'
                            };
                            break;
                        case (status === '3' || status === '4'):
                            this.form.state = {
                                type: 'warning',
                                msg: 'Socket 服务已关闭'
                            };
                            break;
                        default:
                            this.form.state = {
                                type: 'danger',
                                msg: 'Socket Error'
                            };
                    }
                    return true;
                case 'ClearLog':
                    return this.form.log = '';
            }
        },
        make_wsUrl(auto = false) {
            if (auto) {
                if (this.protocolStr === "https:") {
                    this.WS_type = 'wss://';
                } else {
                    this.WS_type = 'ws://';
                }
            }
            this.wsUrl += this.WS_type + this.form.domain + ':' + this.form.port + this.form.path;
        },
        connectServer() {
            let that = this;
            this.wsUrl = '';
            try {
                if (this.wsUrl === '') this.make_wsUrl();
                this.socket = new WebSocket(this.wsUrl);
            } catch (evt) {
                this.loading.close()
                this.form.state = {
                    type: 'danger',
                    msg: 'Socket Error'
                };
                if (!evt.data) {
                    this.setLog('#new WebSocket error: 未启用WebSocket服务，或参数配置错误');
                    console.log(evt)
                } else {
                    this.setLog('#new WebSocket error:' + evt.data);
                }
                this.socket = null;
                return;
            }
            this.socket.onopen = function (event) {
                that.loading.close()
                that.form.state = {
                    type: 'success',
                    msg: 'Socket 服务连接成功'
                };
                typeof that.onWS.onopen === 'function' && that.onWS.onopen.call(that, event);
            };
            this.socket.onclose = function (event) {
                that.loading.close()
                that.form.state = {
                    type: 'warning',
                    msg: 'Socket 服务已关闭'
                };
                typeof that.onWS.onclose === 'function' && that.onWS.onclose.call(that, event);
            };
            this.socket.onmessage = function (event) {
                that.loading.close()
                typeof that.onWS.onmessage === 'function' && that.onWS.onmessage.call(that, event);
            };
            this.socket.onerror = function (event) {
                that.loading.close()
                that.form.state = {
                    type: 'danger',
                    msg: 'Socket Error'
                };
                typeof that.onWS.onerror === 'function' && that.onWS.onerror.call(that, event);
            };
        },
        getSocketStatus() {
            var that = this;
            if (null == that.socket) {
                that.setLog('未连接websocket服务');
                return '0';
            }
            switch (that.socket.readyState) {
                case that.socket.CONNECTING:
                    that.setLog("websocket服务连接中");
                    return '1';

                case that.socket.OPEN:
                    that.setLog("websocket服务连接成功");
                    return '2';

                case that.socket.CLOSING:
                    that.setLog("websocket服务关闭中");
                    return '3';

                case that.socket.CLOSED:
                    that.setLog('websocket服务已关闭');
                    return '4';
                default:
                    that.setLog("未知错误");
                    return '-1';
            }
        },
        makeVariable() {
            this.variable.timestamp = php.time()
        },
        onChangeQuery(route) {
            const queryDomain = route.query.domain
                , queryPort = route.query.port
                , queryWsType = route.query.wsType
                , queryQuery = route.query.query;

            if (queryDomain) {
                this.form.domain = queryDomain
            }
            if (queryPort) {
                this.form.port = queryPort
            }
            if (queryWsType) {
                this.WS_type = queryWsType + '://'
                return false;
            }
            if (queryQuery) {
                this.form.query = queryQuery
            }
            return true;
            // false 代表不再自动根据https选择ws还是wss
        },
        onVarChange(value) {
            try {
                value = new Function('return ' + value)();
                return this.variable = value;
            } catch (e) {
                this.$notify({
                    title: 'error',
                    dangerouslyUseHTMLString: true,
                    message: '不正确的格式：' + value,
                    type: 'warning'
                });
                return console.error('以下部分格式不正确：\n' + value);
            }
        },
        onFormQueryChange(pathTpl) {
            if (!php.empty(pathTpl)) this.form.path = this.tpl(pathTpl);
        },
        tpl(string) {
            return laytpl(string).render(this.variable);
        }
    },
    watch: {
        WS_type() {
            let socketStatus = this.getSocketStatus();
            if (socketStatus === '1' || socketStatus === '2') this.execStringCommand('CloseConnection');
            this.make_wsUrl();
        },
        $route(route) {
            this.onChangeQuery(route)
        }
    }
}
</script>

<style lang="scss">
.text {
    font-size: 15px;
}

.item {
    margin-bottom: 30px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}


.readIdCard {
    .el-card:first-child {
        margin-top: 0;
    }

    .el-card {
        margin-top: 28px;
    }

    .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        color: #909399;
        font-size: 14px;
    }
}
</style>
