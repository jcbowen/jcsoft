<template>
    <div class="TestScript">
        <h2>脚本测试</h2>
        <h3>本页面将引入包中的各个脚本，暴露到window全局变量中，可在控制器中进行测试</h3>
        <p>已暴露变量如下：</p>
        <pre>
            VM.$jiuchet
        </pre>
    </div>
</template>

<script>

export default {
    name: 'Test',
    components: {},
    data() {
        return {
            msg: '666'
        }
    },
    created() {
    },
    mounted() {
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
