<template>
    <div class="TestScript">
        <h2>二代身份证读卡器演示</h2>
        <p><strong>硬件设备：</strong>诺塔斯 NTS-L7-2IN1
            二合一读卡器<br/><strong>exe软件见引用资源：</strong>LocalWsServer20200706.zip<br/><strong>电脑系统：</strong>win7/10</p>
        <p>
            <br/><strong>说明：</strong><br/>先将硬件设备插入电脑，然后打开LocalWsServer软件，在软件配置中配置账号密码，并勾选自动读取，接着保存参数即可。<br/>测试账号：20002<br/>测试密码：123456<br/>正式账号在<a
            href="http://www.shenfenshibie.com/" target="_blank" rel="noopener">http://www.shenfenshibie.com/</a>&nbsp;申请，并联系设备商审核
        </p>
        <p>本页面将把lotussmart，暴露到window变量中，调用方法示例：</p>
        <pre class="language-javascript"><code>lotussmart.sfz.runReadIDCard({
    onmessage: (cardInfo)=&gt;{
        console.log(cardInfo)
    }
})</code></pre>
    </div>
</template>

<script>
import {lotussmart} from "../../../packages/lotussmart";

export default {
    name: 'Test',
    components: {},
    data() {
        return {
            msg: '666'
        }
    },
    created() {
        this.$jiuchet.link();
    },
    mounted() {
        this.$lotussmart = lotussmart;

        window.VM = this;
    },
    methods: {},
}
</script>

<style>
ul {
    border-bottom: 1px solid #c2c2c2;
}

li {
    margin-left: 50px;
}
</style>
