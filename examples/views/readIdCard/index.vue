<template>
    <div class="readIdCard">
        <h2>二代身份证读卡器演示</h2>

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>基础描述</span>
            </div>
            <div class="text item">
                <p><strong>硬件设备：</strong>诺塔斯 NTS-L7-2IN1 二合一读卡器</p>
                <p><strong>exe软件见引用资源：</strong>LocalWsServer20200706.zip</p>
                <p><strong>电脑系统：</strong>win7/10</p>
                <p style="margin-top: 2rem"><strong>说明：</strong></p>
                <p style="text-indent: 2em;">先将硬件设备插入电脑，然后打开LocalWsServer软件，在软件配置中配置账号密码，并勾选自动读取，接着保存参数即可。</p>
                <p style="text-indent: 2em;">测试账号：20002</p>
                <p style="text-indent: 2em;">测试密码：123456</p>
                <p style="text-indent: 2em;">
                    正式账号在<a href="http://www.shenfenshibie.com/" target="_blank"
                            rel="noopener">http://www.shenfenshibie.com/</a>&nbsp;申请，并联系设备商审核
                </p>
            </div>
        </el-card>


        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>本页面将把lotussmart，暴露到window变量中，调用方法示例：</span>
            </div>
            <div class="text item">
                <layui-code
                    :code="'// 该方法仅适用于自动读卡\n' +
                     'lotussmart.sfz.runReadIDCard({\n'+
'    onmessage: (cardInfo)=&gt;{\n'+
'        console.log(cardInfo)\n'+
'    }\n'+
'})'"
                    :title="'自动读取身份证信息'"
                />
            </div>
        </el-card>
        <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
                <span>直接测试</span>
            </div>
            <div class="text item">
                <p style="text-align: center">使用本控制台测试时，请先打开LocalWsServer工具。并按照基础描述配置后再进行测试</p>
                <el-divider></el-divider>
                <el-row :gutter="25">
                    <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
                        <el-form label-position="top" ref="form" :model="form" label-width="100px">
                            <el-form-item label="服务状态">
                                <el-tag :type="form.state.type">{{ form.state.msg }}</el-tag>
                            </el-form-item>
                            <el-form-item label="照片">
                                <el-button>默认按钮</el-button>
                            </el-form-item>
                            <el-form-item v-if="form.log" label="日志">
                                <div style="background-color: #393D49; color: #fff;padding: 0 1rem">
                                    <pre>{{ form.log }}</pre>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
                        <el-form label-position="left" ref="form" :model="form" label-width="100px">
                            <el-form-item label="服务IP">
                                <el-input v-model="form.ip"></el-input>
                            </el-form-item>
                            <el-form-item label="服务端口">
                                <el-input v-model="form.port"></el-input>
                            </el-form-item>
                            <el-divider content-position="center">命令模拟</el-divider>

                            <el-form-item v-for="(item, ind) in commands" :key="ind"
                                          :label="item.title"
                            >
                                <el-button @click="execStringCommand(item.command)">{{ item.command }}</el-button>
                            </el-form-item>

                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </el-card>

    </div>
</template>

<script>
import {lotussmart} from "../../../packages/lotussmart";
import LayuiCode from "../../../packages/layui/modules/code";
import php from '../../../packages/utils/php'

export default {
    name: 'Test',
    components: {LayuiCode},
    data() {
        return {
            form: {
                ip: '127.0.0.1',
                port: '31213',
                state: {
                    type: 'info',
                    msg: '未连接'
                },
                log: ''
            },
            commands: [
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
                    title: 'MCU序列号',
                    command: 'GetMcuSerailNo'
                },
                {
                    title: '蜂鸣',
                    command: 'Beep'
                },
                {
                    title: '读二代证',
                    command: 'ReadId'
                },
                {
                    title: '读二代证缓冲',
                    command: 'ReadIdBuffer'
                },
                {
                    title: '读照片',
                    command: 'ReadIdJpeg'
                },
                {
                    title: '清除读取缓冲',
                    command: 'ClearIdBuffer'
                },
                {
                    title: '清除日志',
                    command: 'ClearLog'
                },
            ],
            loading: false
        }
    },
    created() {
    },
    mounted() {
        window.lotussmart = lotussmart;
    },
    methods: {
        execStringCommand(strCommand) {
            let ltsSfz = lotussmart.sfz.set({
                strIp: this.form.ip,
                strPort: this.form.port,
                setLog: (...res) => {
                    if (typeof res[0] === 'string') {
                        let log = '';
                        if (this.form.log !== '') log += '\n\n';
                        log += php.date('Y-m-d H:i:s') + '\n';
                        log += res[0];
                        this.form.log = this.form.log + log;
                    }
                },
                onopen: () => {
                    this.form.state = {
                        type: 'success',
                        msg: 'Socket 服务连接成功'
                    };
                    this.loading.close()
                },
                onclose: () => {
                    this.form.state = {
                        type: 'warning',
                        msg: 'Socket 服务已关闭'
                    };
                    this.loading.close()
                },
                onerror: () => {
                    this.form.state = {
                        type: 'danger',
                        msg: 'Socket Error'
                    };
                    this.loading.close()
                },
            })

            switch (strCommand) {
                case 'ConnectServer':
                    this.loading = this.$loading({
                        lock: true,
                        text: '服务连接中。。。',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    return ltsSfz.connectServer();
                case 'ClearLog':
                    return this.form.log = '';
                default:
                    return ltsSfz.execStringCommand(strCommand);
            }

        }
    },
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

    pre {
        line-height: 1rem;
        padding: 10px;
    }

}
</style>
